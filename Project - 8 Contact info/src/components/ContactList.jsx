import React, { useMemo } from 'react';
import { Phone, Mail, Star, ArrowUpDown, UserX, Plus } from 'lucide-react';
import { getInitials, getAvatarColor, getCleanPhone } from '../utils/validation';

export default function ContactList({
  contacts,
  selectedContactId,
  onSelectContact,
  searchQuery,
  selectedGroup,
  sortOrder,
  setSortOrder,
  onOpenAddModal,
  onInitiateCall,
  onInitiateEmail
}) {
  // Filter and sort contacts
  const filteredContacts = useMemo(() => {
    return contacts
      .filter((contact) => {
        // Group filter
        if (selectedGroup === 'favorites' && !contact.isFavorite) return false;
        if (selectedGroup !== 'all' && selectedGroup !== 'favorites' && contact.group !== selectedGroup) return false;

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = contact.name.toLowerCase().includes(q);
          const matchEmail = contact.email.toLowerCase().includes(q);
          const matchPhone = contact.phone.includes(q);
          const matchCompany = contact.company && contact.company.toLowerCase().includes(q);
          return matchName || matchEmail || matchPhone || matchCompany;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'a-z') return a.name.localeCompare(b.name);
        if (sortOrder === 'z-a') return b.name.localeCompare(a.name);
        if (sortOrder === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  }, [contacts, searchQuery, selectedGroup, sortOrder]);

  // Group contacts by first character (for A-Z view)
  const groupedContacts = useMemo(() => {
    if (sortOrder === 'recent') {
      return { 'Recent Contacts': filteredContacts };
    }
    const groups = {};
    filteredContacts.forEach((contact) => {
      const firstChar = contact.name ? contact.name[0].toUpperCase() : '#';
      const key = /[A-Z]/.test(firstChar) ? firstChar : '#';
      if (!groups[key]) groups[key] = [];
      groups[key].push(contact);
    });
    return groups;
  }, [filteredContacts, sortOrder]);

  return (
    <aside className="contact-list-sidebar">
      {/* Sidebar Header with count & sort control */}
      <div className="sidebar-header">
        <div className="sidebar-title-row">
          <h2>Contacts ({filteredContacts.length})</h2>
          <div className="sort-menu">
            <button
              className="btn-text-icon"
              onClick={() => {
                if (sortOrder === 'a-z') setSortOrder('z-a');
                else if (sortOrder === 'z-a') setSortOrder('recent');
                else setSortOrder('a-z');
              }}
              title="Change Sort Order"
            >
              <ArrowUpDown size={14} />
              <span>{sortOrder === 'a-z' ? 'A-Z' : sortOrder === 'z-a' ? 'Z-A' : 'Recent'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact List View */}
      <div className="contact-items-scroll">
        {filteredContacts.length === 0 ? (
          <div className="empty-contacts-state">
            <div className="empty-icon-wrap">
              <UserX size={36} />
            </div>
            <h3>No contacts found</h3>
            <p>Try adjusting your search query or group filter.</p>
            <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
              <Plus size={16} /> Add Contact
            </button>
          </div>
        ) : (
          Object.keys(groupedContacts).map((groupKey) => (
            <div key={groupKey} className="contact-group">
              <div className="group-divider-header">{groupKey}</div>
              <div className="group-items-list">
                {groupedContacts[groupKey].map((contact) => {
                  const isSelected = selectedContactId === contact.id;
                  const initials = getInitials(contact.name);
                  const avatarBg = getAvatarColor(contact.name);

                  return (
                    <div
                      key={contact.id}
                      className={`contact-card-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => onSelectContact(contact)}
                    >
                      {/* Avatar */}
                      <div className="avatar-wrapper">
                        {contact.avatar ? (
                          <img src={contact.avatar} alt={contact.name} className="avatar-img" />
                        ) : (
                          <div className="avatar-initials" style={{ background: avatarBg }}>
                            {initials}
                          </div>
                        )}
                        {contact.isFavorite && (
                          <span className="favorite-badge-dot" title="Favorite">
                            <Star size={10} fill="currentColor" />
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="contact-info-main">
                        <div className="contact-name-row">
                          <span className="contact-name">{contact.name}</span>
                          {contact.group && (
                            <span className={`group-tag tag-${contact.group.toLowerCase()}`}>
                              {contact.group}
                            </span>
                          )}
                        </div>
                        <div className="contact-subtext">
                          {contact.company || contact.phone}
                        </div>
                      </div>

                      {/* Quick 1-Tap Call & Email Action Buttons */}
                      <div className="contact-quick-actions" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`tel:${getCleanPhone(contact.phone)}`}
                          className="quick-action-btn action-call"
                          title={`Call ${contact.name}`}
                          onClick={(e) => onInitiateCall(e, contact)}
                          aria-label={`Call ${contact.name}`}
                        >
                          <Phone size={15} />
                        </a>
                        <a
                          href={`mailto:${contact.email}`}
                          className="quick-action-btn action-email"
                          title={`Direct Email Draft to ${contact.name}`}
                          onClick={(e) => onInitiateEmail(e, contact)}
                          aria-label={`Email Draft to ${contact.name}`}
                        >
                          <Mail size={15} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
