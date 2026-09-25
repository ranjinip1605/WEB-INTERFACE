import { INITIAL_CONTACTS, INITIAL_CALL_HISTORY } from './sampleData';

const CONTACTS_KEY = 'contact_hub_contacts_v1';
const CALL_HISTORY_KEY = 'dial_call_history_v1';
const API_KEY_STORAGE = 'contact_hub_api_key';
const THEME_KEY = 'contact_hub_theme';

export function getStoredContacts() {
  try {
    const data = localStorage.getItem(CONTACTS_KEY);
    if (!data) {
      // Seed initial contacts
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(INITIAL_CONTACTS));
      return INITIAL_CONTACTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse contacts from localStorage:', err);
    return INITIAL_CONTACTS;
  }
}

export function saveStoredContacts(contacts) {
  try {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  } catch (err) {
    console.error('Failed to save contacts to localStorage:', err);
  }
}

export function getStoredCallHistory() {
  try {
    const data = localStorage.getItem(CALL_HISTORY_KEY);
    if (!data) {
      localStorage.setItem(CALL_HISTORY_KEY, JSON.stringify(INITIAL_CALL_HISTORY));
      return INITIAL_CALL_HISTORY;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse call history from localStorage:', err);
    return INITIAL_CALL_HISTORY;
  }
}

export function saveStoredCallHistory(history) {
  try {
    localStorage.setItem(CALL_HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save call history to localStorage:', err);
  }
}

export function clearStoredCallHistory() {
  try {
    localStorage.removeItem(CALL_HISTORY_KEY);
  } catch (err) {
    console.error('Failed to clear call history:', err);
  }
}

export function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || 'ch_live_9a87f6b5c4d3e2a1';
}

export function saveStoredApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

export function saveStoredTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
