export type LeadStatus = 'new' | 'contacted' | 'converted';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: 'website' | 'contact_form' | 'referral';
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
}
