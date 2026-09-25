export const INITIAL_CONTACTS = [
  {
    id: 'c0',
    name: 'kaviya',
    phone: '9043427857',
    email: 'kaviya@gmail.com',
    company: 'Mobile Network',
    group: 'Friends',
    isFavorite: true,
    avatar: '',
    notes: 'Recent caller from mobile network dialer.',
    createdAt: '2026-09-10T09:00:00.000Z'
  },
  {
    id: 'c1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@tata.com',
    company: 'Tata Consultancy Services',
    group: 'Work',
    isFavorite: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    notes: 'Senior Systems Architect. Available weekdays 9 AM - 6 PM IST.',
    createdAt: '2026-01-15T10:30:00.000Z'
  },
  {
    id: 'c2',
    name: 'Priya Patel',
    phone: '+91 91234 56789',
    email: 'priya.patel@infosys.io',
    company: 'Infosys Design Studio',
    group: 'Work',
    isFavorite: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    notes: 'Lead UX Designer. Design sprint sync every Thursday.',
    createdAt: '2026-02-01T14:20:00.000Z'
  },
  {
    id: 'c3',
    name: 'Ananya Verma',
    phone: '+91 94567 89012',
    email: 'ananya.v@gmail.com',
    company: 'Wipro Digital',
    group: 'Family',
    isFavorite: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    notes: 'Cousin. Birthday on September 24th.',
    createdAt: '2026-03-10T09:15:00.000Z'
  },
  {
    id: 'c4',
    name: 'Sarah Connor',
    phone: '+1 (555) 234-5678',
    email: 'sarah.connor@cyberdyne.io',
    company: 'Cyberdyne Systems',
    group: 'Work',
    isFavorite: false,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    notes: 'Lead security researcher.',
    createdAt: '2026-04-05T16:45:00.000Z'
  },
  {
    id: 'c5',
    name: 'David Kim',
    phone: '+1 (555) 456-7890',
    email: 'dkim@metrolabs.dev',
    company: 'Metro Labs',
    group: 'Friends',
    isFavorite: true,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    notes: 'College roommate. Full stack React developer.',
    createdAt: '2026-05-12T11:00:00.000Z'
  }
];

export const INITIAL_CALL_HISTORY = [
  {
    id: 'h1',
    name: 'kaviya',
    phone: '9043427857',
    type: 'outgoing', // 'outgoing' | 'incoming' | 'missed'
    timestamp: '2026-09-10T09:55:00.000Z',
    duration: '0:12',
    avatar: '',
    contactId: 'c0'
  },
  {
    id: 'h2',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    type: 'incoming',
    timestamp: '2026-09-10T08:30:00.000Z',
    duration: '2:45',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    contactId: 'c1'
  },
  {
    id: 'h3',
    name: 'Unknown Caller',
    phone: '+91 98401 12345',
    type: 'missed',
    timestamp: '2026-09-09T18:15:00.000Z',
    duration: 'Missed',
    avatar: '',
    contactId: null
  },
  {
    id: 'h4',
    name: 'Priya Patel',
    phone: '+91 91234 56789',
    type: 'outgoing',
    timestamp: '2026-09-09T14:10:00.000Z',
    duration: '1:08',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    contactId: 'c2'
  }
];

export async function fetchRandomContacts(count = 3, apiKey = '') {
  try {
    const url = `https://randomuser.me/api/?results=${count}&nat=us,gb,in`;
    const headers = apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {};
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('Failed to fetch random user data');
    const data = await res.json();
    
    return data.results.map((user, index) => {
      const groups = ['Work', 'Family', 'Friends', 'Other'];
      const rawPhone = user.phone.replace(/[^0-9]/g, '');
      const formattedPhone = user.location.country === 'India'
        ? `+91 ${rawPhone.slice(0,5)} ${rawPhone.slice(5,10)}`
        : `+1 (${rawPhone.slice(0,3)}) ${rawPhone.slice(3,6)}-${rawPhone.slice(6,10)}`;
        
      return {
        id: `imported-${Date.now()}-${index}`,
        name: `${user.name.first} ${user.name.last}`,
        phone: formattedPhone,
        email: user.email,
        company: `${user.location.city} Tech`,
        group: groups[Math.floor(Math.random() * groups.length)],
        isFavorite: Math.random() > 0.6,
        avatar: user.picture.large,
        notes: `Imported via API. Location: ${user.location.city}, ${user.location.country}`,
        createdAt: new Date().toISOString()
      };
    });
  } catch (err) {
    console.error('Error fetching random contacts:', err);
    throw err;
  }
}
