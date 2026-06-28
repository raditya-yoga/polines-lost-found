export interface Item {
  id: string;
  title: string;
  category: string;
  type: 'lost' | 'found';
  date: string;
  location: string;
  description: string;
  images: string[];
  status: 'unclaimed' | 'claiming' | 'claimed' | 'draft';
  finderName: string;
  safeOfficeLocation?: string;
  mapImage?: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: 'user' | 'finder' | 'system';
  text: string;
  timestamp: string;
  image?: string;
  mapLocation?: {
    name: string;
    coordinates: string;
    image: string;
  };
}

export interface Chat {
  id: string;
  itemId: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  unread: boolean;
  messages: Message[];
}

export interface User {
  nim: string;
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}
