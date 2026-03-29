export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  imageUrl: string | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  avatarUrl: string | null;
  joinedAt: string;
  isActive: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  publishedAt: string;
  isActive: boolean;
}
