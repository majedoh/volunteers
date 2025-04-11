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