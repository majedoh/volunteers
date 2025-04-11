// src/hooks/api/useOpportunities.ts
import { useState, useEffect } from 'react';
import { Opportunity } from '@/types/opportunity';

interface UseOpportunitiesParams {
  search?: string;
  category?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

interface UseOpportunitiesResult {
  opportunities: Opportunity[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
}

export function useOpportunities({
  search = '',
  category = '',
  location = '',
  dateFrom = '',
  dateTo = '',
  page = 1,
  pageSize = 10,
}: UseOpportunitiesParams): UseOpportunitiesResult {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Mock data - in a real app, this would be fetched from an API
          const mockData: Opportunity[] = [
            {
              id: '1',
              title: 'Translation Services at Grand Mosque',
              description: 'Help visitors by providing translation services at the Grand Mosque during Ramadan.',
              image: '/images/opportunity1.jpg',
              location: 'Makkah',
              date: '2025-04-20',
              spots: 25,
              featured: true,
              category: 'Translation',
            },
            {
              id: '2',
              title: 'Visitor Guidance in Prophet\'s Mosque',
              description: 'Assist visitors with directions and information at the Prophet\'s Mosque.',
              image: '/images/opportunity2.jpg',
              location: 'Madinah',
              date: '2025-05-10',
              spots: 15,
              featured: false,
              category: 'Guidance',
            },
            {
              id: '3',
              title: 'Elderly Assistance Program',
              description: 'Provide support to elderly visitors during their visit to the Holy Mosques.',
              image: '/images/opportunity3.jpg',
              location: 'Makkah',
              date: '2025-04-25',
              spots: 30,
              featured: true,
              category: 'Assistance',
            },
            {
              id: '4',
              title: 'Water Distribution Team',
              description: 'Join the team distributing Zamzam water to visitors at designated areas.',
              image: '/images/opportunity1.jpg',
              location: 'Makkah',
              date: '2025-05-05',
              spots: 20,
              featured: false,
              category: 'Services',
            },
            {
              id: '5',
              title: 'Educational Tours Guide',
              description: 'Lead educational tours explaining the history and significance of the Holy Mosques.',
              image: '/images/opportunity2.jpg',
              location: 'Madinah',
              date: '2025-05-15',
              spots: 10,
              featured: true,
              category: 'Education',
            },
            {
              id: '6',
              title: 'Lost and Found Services',
              description: 'Help manage the lost and found department, assisting visitors in recovering their belongings.',
              image: '/images/opportunity3.jpg',
              location: 'Jeddah',
              date: '2025-04-30',
              spots: 12,
              featured: false,
              category: 'Services',
            }
          ];

          // Filter by search term
          let filteredData = mockData;
          
          if (search) {
            const searchLower = search.toLowerCase();
            filteredData = filteredData.filter(
              opp => opp.title.toLowerCase().includes(searchLower) || 
                     opp.description.toLowerCase().includes(searchLower)
            );
          }
          
          // Filter by category
          if (category) {
            filteredData = filteredData.filter(opp => opp.category === category);
          }
          
          // Filter by location
          if (location) {
            filteredData = filteredData.filter(opp => opp.location === location);
          }
          
          // Filter by date range
          if (dateFrom) {
            filteredData = filteredData.filter(opp => new Date(opp.date) >= new Date(dateFrom));
          }
          
          if (dateTo) {
            filteredData = filteredData.filter(opp => new Date(opp.date) <= new Date(dateTo));
          }
          
          // Calculate total pages
          const totalItems = filteredData.length;
          const calculatedTotalPages = Math.ceil(totalItems / pageSize);
          
          // Apply pagination
          const startIndex = (page - 1) * pageSize;
          const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
          
          setOpportunities(paginatedData);
          setTotalPages(calculatedTotalPages);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [search, category, location, dateFrom, dateTo, page, pageSize]);

  return { opportunities, loading, error, totalPages };
}