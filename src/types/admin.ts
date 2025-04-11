// src/types/admin.ts
import { User, Opportunity } from '@/types/opportunity';

// Dashboard summary data
export interface AdminSummaryData {
  pendingVolunteers: number;
  activeVolunteers: number;
  pendingOpportunities: number;
  activeOpportunities: number;
  completedOpportunities: number;
  totalVolunteerHours: number;
  recentApplications: VolunteerApplication[];
}

// Volunteer application
export interface VolunteerApplication {
  id: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone?: string;
  opportunityId: string;
  opportunityTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  updatedAt?: string;
}

// Volunteer data with additional admin fields
export interface AdminVolunteerData extends User {
  status: 'pending' | 'active' | 'inactive' | 'blocked';
  totalHours: number;
  completedOpportunities: number;
  activeOpportunities: number;
  joinedAt: string;
  lastActive: string;
}

// Opportunity data with additional admin fields
export interface AdminOpportunityData extends Opportunity {
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  applicantsCount: number;
  participantsCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Function to generate mock admin summary data
export function getMockAdminSummaryData(): AdminSummaryData {
  return {
    pendingVolunteers: 15,
    activeVolunteers: 243,
    pendingOpportunities: 4,
    activeOpportunities: 12,
    completedOpportunities: 87,
    totalVolunteerHours: 5238,
    recentApplications: [
      {
        id: '1',
        volunteerId: 'v1',
        volunteerName: 'Ahmed Mohammed',
        volunteerEmail: 'ahmed@example.com',
        volunteerPhone: '+966 50 123 4567',
        opportunityId: 'o1',
        opportunityTitle: 'Translation Services at Grand Mosque',
        status: 'pending',
        appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        id: '2',
        volunteerId: 'v2',
        volunteerName: 'Fatima Ali',
        volunteerEmail: 'fatima@example.com',
        opportunityId: 'o2',
        opportunityTitle: 'Visitor Guidance in Prophet\'s Mosque',
        status: 'pending',
        appliedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      },
      {
        id: '3',
        volunteerId: 'v3',
        volunteerName: 'Omar Abdullah',
        volunteerEmail: 'omar@example.com',
        volunteerPhone: '+966 55 987 6543',
        opportunityId: 'o3',
        opportunityTitle: 'Elderly Assistance Program',
        status: 'pending',
        appliedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      },
      {
        id: '4',
        volunteerId: 'v4',
        volunteerName: 'Aisha Rahman',
        volunteerEmail: 'aisha@example.com',
        opportunityId: 'o1',
        opportunityTitle: 'Translation Services at Grand Mosque',
        status: 'pending',
        appliedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      },
      {
        id: '5',
        volunteerId: 'v5',
        volunteerName: 'Mohammed Saleh',
        volunteerEmail: 'msaleh@example.com',
        opportunityId: 'o4',
        opportunityTitle: 'Water Distribution Team',
        status: 'pending',
        appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
      }
    ]
  };
}