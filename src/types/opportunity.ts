// src/types/opportunity.ts
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  spots: number;
  featured: boolean;
  category: string;
}

export interface OpportunityDetail extends Opportunity {
  longDescription: string;
  requirements: string[];
  skills: string[];
  timeCommitment: string;
  contactPerson?: string;
  contactEmail?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  status: 'open' | 'closed' | 'filled';
  applicationDeadline: string;
}