export interface User {
  id: string;
  email: string;
  role: 'investor' | 'founder' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Investor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  accreditationStatus: boolean;
  preferences: InvestorPreferences;
}

export interface InvestorPreferences {
  sectors: string[];
  stages: ('seed' | 'series_a' | 'series_b' | 'growth')[];
  minTicket: number;
  maxTicket: number;
  locations: string[];
}

export interface Founder {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  linkedinUrl?: string;
}
