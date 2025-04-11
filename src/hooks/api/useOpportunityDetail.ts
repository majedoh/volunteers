// src/hooks/api/useOpportunityDetail.ts
import { useState, useEffect } from 'react';
import { OpportunityDetail } from '@/types/opportunity';

export function useOpportunityDetail(id: string) {
  const [opportunity, setOpportunity] = useState<OpportunityDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Mock data for a single opportunity - in a real app, this would be fetched from an API
          const mockData: OpportunityDetail = {
            id,
            title: id === '1' ? 'Translation Services at Grand Mosque' : 
                   id === '2' ? 'Visitor Guidance in Prophet\'s Mosque' : 
                   id === '3' ? 'Elderly Assistance Program' : 
                   'Volunteer Opportunity',
            description: 'Help visitors by providing translation services at the Grand Mosque during Ramadan.',
            longDescription: `
              This program aims to assist international visitors who don't speak Arabic or English by providing translation services in multiple languages. Volunteers will be stationed at key locations throughout the Grand Mosque to help with directions, explain rituals, and assist with any questions visitors may have.
              
              This opportunity offers a chance to make a meaningful impact on the experience of pilgrims, while also developing valuable communication skills and cultural understanding.
              
              Volunteers will work in shifts, with appropriate breaks and support from staff members. Training will be provided before the start of the program to ensure all volunteers are well-prepared.
            `,
            image: `/images/opportunity${(parseInt(id) % 3) + 1}.jpg`,
            location: ['1', '3', '4'].includes(id) ? 'Makkah' : ['2', '5'].includes(id) ? 'Madinah' : 'Jeddah',
            date: '2025-05-15',
            spots: 25,
            featured: ['1', '3', '5'].includes(id),
            category: ['1'].includes(id) ? 'Translation' : 
                      ['2'].includes(id) ? 'Guidance' : 
                      ['3'].includes(id) ? 'Assistance' : 
                      ['4', '6'].includes(id) ? 'Services' : 'Education',
            requirements: [
              'Fluency in Arabic and at least one other language',
              'Previous experience in translation or interpretation is preferred',
              'Strong communication skills',
              'Ability to stand for extended periods',
              'Minimum age of 18 years'
            ],
            skills: [
              'Translation',
              'Interpersonal Communication',
              'Cultural Sensitivity',
              'Problem Solving'
            ],
            timeCommitment: '4-6 hours per day, 3 days per week, for 2 weeks',
            contactPerson: 'Abdullah Al-Faisal',
            contactEmail: 'translation@haramainvolunteers.org',
            address: 'Grand Mosque, Makkah, Saudi Arabia',
            coordinates: {
              lat: 21.4225,
              lng: 39.8262
            },
            status: 'open',
            applicationDeadline: '2025-04-30'
          };
          
          setOpportunity(mockData);
          setLoading(false);
        }, 1200); // Simulate network delay
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  return { opportunity, loading, error };
}