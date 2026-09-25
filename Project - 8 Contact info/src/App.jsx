import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import ContactFormModal from './components/ContactFormModal';
import CallPromptModal from './components/CallPromptModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import DialPad from './components/DialPad';
import CallHistory from './components/CallHistory';
import ActiveCallModal from './components/ActiveCallModal';

import { 
  getStoredContacts, 
  saveStoredContacts, 
  getStoredCallHistory,
  saveStoredCallHistory,
  clearStoredCallHistory,
  getStoredApiKey, 
  saveStoredApiKey,
  getStoredTheme,
  saveStoredTheme
} from './utils/storage';
import { fetchRandomContacts } from './utils/sampleData';

export default function App() {
  // Persistence states
  const [contacts, setContacts] = useState(() => getStoredContacts());
  const [callHistory, setCallHistory] = useState(() => getStoredCallHistory());
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [theme, setTheme] = useState(() => getStoredTheme());

  // Navigation View State ('contacts' | 'dialer' | 'history')
  const [activeView, setActiveView] = useState('contacts');

  // Contact selection & filter states
  const [selectedContactId, setSelectedContactId] = useState(() => {
    const initial = getStoredContacts();
    return initial.length > 0 ? initial[0].id : null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [sortOrder, setSortOrder] = useState('a-z');

  // Mobile detail view overlay state
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  // Form Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formInitialPhone, setFormInitialPhone] = useState('');

  // Call Prompt Modal State (Legacy launcher)
  const [promptModal, setPromptModal] = useState({
    isOpen: false,
    contact: null,
    actionType: 'call'
  });

  // Active Live Call Screen Modal
  const [activeCall, setActiveCall] = useState({
    isOpen: false,
    contact: null,
    phoneNumber: ''
  });

  // API Modal State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Sync theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveStoredTheme(theme);
  }, [theme]);

  // Sync contacts to localStorage whenever updated
  useEffect(() => {
    saveStoredContacts(contacts);
  }, [contacts]);

  // Sync call history to localStorage whenever updated
  useEffect(() => {
    saveStoredCallHistory(callHistory);
  }, [callHistory]);

  // Selected contact object reference
  const selectedContact = contacts.find((c) => c.id === selectedContactId) || null;

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Select Contact Handler
  const handleSelectContact = (contact) => {
    setSelectedContactId(contact.id);
    setMobileShowDetail(true);
  };

  // Back to list on mobile
  const handleBackToList = () => {
    setMobileShowDetail(false);
  };

  // Favorite toggle
  const handleToggleFavorite = (contactId) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  // Add & Edit Handlers
  const handleOpenAddModal = (initialPhone = '') => {
    setEditingContact(null);
    setFormInitialPhone(typeof initialPhone === 'string' ? initialPhone : '');
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (contact) => {
    setEditingContact(contact);
    setFormInitialPhone('');
    setIsFormModalOpen(true);
  };

  const handleSaveContact = (contactData) => {
    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contactData.id ? contactData : c))
      );
    } else {
      setContacts((prev) => [contactData, ...prev]);
      setSelectedContactId(contactData.id);
      setMobileShowDetail(true);
    }
  };

  // Delete Contact
  const handleDeleteContact = (contactId) => {
    setContacts((prev) => {
      const updated = prev.filter((c) => c.id !== contactId);
      if (selectedContactId === contactId) {
        setSelectedContactId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
    setMobileShowDetail(false);
  };

  // Trigger Live Call (opens ActiveCallModal)
  const handleStartCall = (contactOrNull, phoneNumberStr = '') => {
    let targetContact = contactOrNull;
    let targetPhone = phoneNumberStr;

    if (targetContact && !targetPhone) {
      targetPhone = targetContact.phone;
    } else if (!targetContact && targetPhone) {
      // Find matching contact by phone if available
      targetContact = contacts.find((c) => c.phone.replace(/[^0-9]/g, '') === targetPhone.replace(/[^0-9]/g, '')) || null;
    }

    setActiveCall({
      isOpen: true,
      contact: targetContact,
      phoneNumber: targetPhone
    });
  };

  // Handle call end and record into history log
  const handleCallEnded = (callSummary) => {
    const newEntry = {
      id: `h-${Date.now()}`,
      name: callSummary.name,
      phone: callSummary.phone,
      type: 'outgoing',
      timestamp: new Date().toISOString(),
      duration: callSummary.duration || '0:10',
      avatar: callSummary.avatar || '',
      contactId: callSummary.contactId || null
    };

    setCallHistory((prev) => [newEntry, ...prev]);
  };

  // Call History Delete Item
  const handleDeleteHistoryItem = (historyId) => {
    setCallHistory((prev) => prev.filter((h) => h.id !== historyId));
  };

  // Clear all call history
  const handleClearHistory = () => {
    clearStoredCallHistory();
    setCallHistory([]);
  };

  // Legacy Call trigger helper for contact list/detail items
  const handleInitiateCall = (e, contact) => {
    if (e && e.preventDefault) e.preventDefault();
    handleStartCall(contact, contact?.phone);
  };

  // Direct Web Mail Compose Draft
  const handleInitiateEmail = (e, contact) => {
    if (e) e.preventDefault();
    if (!contact || !contact.email) return;

    const gmailDraftUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;
    window.open(gmailDraftUrl, '_blank', 'noopener,noreferrer');
  };

  // Fetch Random Contacts via API
  const handleFetchRandomContacts = async (key = apiKey) => {
    try {
      const imported = await fetchRandomContacts(3, key);
      setContacts((prev) => [...imported, ...prev]);
      if (imported.length > 0) {
        setSelectedContactId(imported[0].id);
      }
    } catch (err) {
      console.error('Failed to import random contacts:', err);
      throw err;
    }
  };

  // Counts
  const favoritesCount = contacts.filter((c) => c.isFavorite).length;

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        onOpenAddModal={() => handleOpenAddModal('')}
        theme={theme}
        toggleTheme={toggleTheme}
        contactsCount={contacts.length}
        favoritesCount={favoritesCount}
        historyCount={callHistory.length}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Panel Content depending on Active View */}
      <main className="app-main-content">
        {activeView === 'contacts' && (
          <div className={`main-layout ${mobileShowDetail ? 'mobile-show-detail' : 'mobile-show-list'}`}>
            <ContactList
              contacts={contacts}
              selectedContactId={selectedContactId}
              onSelectContact={handleSelectContact}
              searchQuery={searchQuery}
              selectedGroup={selectedGroup}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onOpenAddModal={() => handleOpenAddModal('')}
              onInitiateCall={handleInitiateCall}
              onInitiateEmail={handleInitiateEmail}
            />

            <ContactDetail
              contact={selectedContact}
              onBack={handleBackToList}
              onToggleFavorite={handleToggleFavorite}
              onEditContact={handleOpenEditModal}
              onDeleteContact={handleDeleteContact}
              onInitiateCall={handleInitiateCall}
              onInitiateEmail={handleInitiateEmail}
            />
          </div>
        )}

        {activeView === 'dialer' && (
          <DialPad
            contacts={contacts}
            onInitiateCall={(contact, phone) => handleStartCall(contact, phone)}
            onOpenAddModalWithPhone={(phone) => handleOpenAddModal(phone)}
          />
        )}

        {activeView === 'history' && (
          <CallHistory
            callHistory={callHistory}
            onInitiateCall={(contact, phone) => handleStartCall(contact, phone)}
            onOpenAddModalWithPhone={(phone) => handleOpenAddModal(phone)}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Contact Form Modal (Add / Edit) */}
      <ContactFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveContact}
        initialData={editingContact ? editingContact : (formInitialPhone ? { phone: formInitialPhone } : null)}
      />

      {/* Legacy Call Prompt Modal */}
      <CallPromptModal
        isOpen={promptModal.isOpen}
        onClose={() => setPromptModal({ ...promptModal, isOpen: false })}
        contact={promptModal.contact}
        actionType={promptModal.actionType}
      />

      {/* Active Call Screen Modal (Matching Reference Screenshot) */}
      <ActiveCallModal
        isOpen={activeCall.isOpen}
        onClose={() => setActiveCall({ isOpen: false, contact: null, phoneNumber: '' })}
        contact={activeCall.contact}
        phoneNumber={activeCall.phoneNumber}
        onEndCall={handleCallEnded}
      />

      {/* API Key Settings Modal */}
      <ApiSettingsModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(key) => {
          setApiKey(key);
          saveStoredApiKey(key);
        }}
        onImportWithApiKey={(key) => handleFetchRandomContacts(key)}
      />
    </div>
  );
}
