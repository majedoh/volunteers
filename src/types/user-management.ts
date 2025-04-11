// src/types/user-management.ts

// User status types
export type UserStatus = 'pending' | 'active' | 'inactive' | 'blocked';
export type UserRole = 'user' | 'admin' | 'super_admin';

// User interface for management
export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: UserStatus;
  role: UserRole;
  joinedAt: string;
  lastActive?: string;
  completedOpportunities?: number;
  totalHours?: number;
  nationalIdVerified?: boolean;
  notes?: string;
  documents?: {
    nationalId?: string;
    selfie?: string;
  };
}

// Action response
export interface ActionResponse {
  success: boolean;
  message: string;
  user?: ManagedUser;
}

// Query parameters for fetching users
export interface UserQueryParams {
  status?: UserStatus;
  role?: UserRole;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

// Mock users data
export const getMockUsers = (params: UserQueryParams): ManagedUser[] => {
  // All mock users
  const allUsers: ManagedUser[] = [
    // Pending users
    {
      id: 'p1',
      name: 'Ahmed Mohammed',
      email: 'ahmed@example.com',
      phone: '+966 50 123 4567',
      status: 'pending',
      role: 'user',
      joinedAt: '2025-04-01T10:15:30Z',
      nationalIdVerified: false,
      documents: {
        nationalId: 'https://placehold.co/400x250/3f6212/FFFFFF/png?text=National+ID',
        selfie: 'https://ui-avatars.com/api/?name=Ahmed+M&size=300&background=0D8ABC&color=fff',
      },
    },
    {
      id: 'p2',
      name: 'Fatima Ali',
      email: 'fatima@example.com',
      phone: '+966 55 987 6543',
      status: 'pending',
      role: 'user',
      joinedAt: '2025-04-02T14:22:10Z',
      nationalIdVerified: false,
      documents: {
        nationalId: 'https://placehold.co/400x250/365314/FFFFFF/png?text=National+ID',
        selfie: 'https://ui-avatars.com/api/?name=Fatima+A&size=300&background=D77EB9&color=fff',
      },
    },
    {
      id: 'p3',
      name: 'Omar Abdullah',
      email: 'omar@example.com',
      phone: '+966 50 555 7890',
      status: 'pending',
      role: 'user',
      joinedAt: '2025-04-03T09:45:00Z',
      nationalIdVerified: false,
      documents: {
        nationalId: 'https://placehold.co/400x250/166534/FFFFFF/png?text=National+ID',
        selfie: 'https://ui-avatars.com/api/?name=Omar+A&size=300&background=8B5CF6&color=fff',
      },
    },
    
    // Active users
    {
      id: 'a1',
      name: 'Mohammed Saleh',
      email: 'msaleh@example.com',
      phone: '+966 50 111 2222',
      status: 'active',
      role: 'user',
      joinedAt: '2025-03-15T08:30:00Z',
      lastActive: '2025-04-09T16:45:22Z',
      completedOpportunities: 3,
      totalHours: 24,
      nationalIdVerified: true,
    },
    {
      id: 'a2',
      name: 'Aisha Rahman',
      email: 'aisha@example.com',
      phone: '+966 55 333 4444',
      status: 'active',
      role: 'user',
      joinedAt: '2025-03-10T11:20:15Z',
      lastActive: '2025-04-10T09:15:30Z',
      completedOpportunities: 5,
      totalHours: 36,
      nationalIdVerified: true,
    },
    {
      id: 'a3',
      name: 'Khalid Ibrahim',
      email: 'khalid@example.com',
      phone: '+966 50 777 8888',
      status: 'active',
      role: 'user',
      joinedAt: '2025-03-05T13:10:45Z',
      lastActive: '2025-04-08T14:30:00Z',
      completedOpportunities: 2,
      totalHours: 16,
      nationalIdVerified: true,
    },
    
    // Admin users
    {
      id: 'admin1',
      name: 'Saud Al-Qahtani',
      email: 'saud@haramainvolunteers.org',
      phone: '+966 50 999 8888',
      status: 'active',
      role: 'admin',
      joinedAt: '2025-01-10T09:00:00Z',
      lastActive: '2025-04-10T17:30:00Z',
      nationalIdVerified: true,
    },
    {
      id: 'admin2',
      name: 'Noura Al-Faisal',
      email: 'noura@haramainvolunteers.org',
      phone: '+966 55 444 3333',
      status: 'active',
      role: 'admin',
      joinedAt: '2025-01-15T10:15:30Z',
      lastActive: '2025-04-09T16:20:00Z',
      nationalIdVerified: true,
    },
    {
      id: 'super1',
      name: 'Abdullah Al-Sheikh',
      email: 'abdullah@haramainvolunteers.org',
      phone: '+966 50 123 0000',
      status: 'active',
      role: 'super_admin',
      joinedAt: '2025-01-01T08:00:00Z',
      lastActive: '2025-04-10T18:45:10Z',
      nationalIdVerified: true,
    },
  ];
  
  // Filter by status if provided
  let filteredUsers = allUsers;
  if (params.status) {
    filteredUsers = filteredUsers.filter(user => user.status === params.status);
  }
  
  // Filter by role if provided
  if (params.role) {
    filteredUsers = filteredUsers.filter(user => user.role === params.role);
  }
  
  // Search by name or email if provided
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      user => 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) ||
        (user.phone && user.phone.includes(params.search || ''))
    );
  }
  
  // Sort users
  if (params.sortBy) {
    filteredUsers.sort((a, b) => {
      const aValue = a[params.sortBy as keyof ManagedUser];
      const bValue = b[params.sortBy as keyof ManagedUser];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      // Convert to string for comparison
      const aString = String(aValue);
      const bString = String(bValue);
      
      if (params.sortOrder === 'desc') {
        return bString.localeCompare(aString);
      }
      return aString.localeCompare(bString);
    });
  }
  
  // Paginate if needed
  if (params.page !== undefined && params.pageSize !== undefined) {
    const start = params.page * params.pageSize;
    const end = start + params.pageSize;
    filteredUsers = filteredUsers.slice(start, end);
  }
  
  return filteredUsers;
};

// Mock function to get user by ID
export const getMockUserById = (id: string): ManagedUser | undefined => {
  return getMockUsers({}).find(user => user.id === id);
};

// Mock function to simulate user action (admit, revoke, promote, etc.)
export const simulateUserAction = async (
  userId: string, 
  action: 'admit' | 'revoke' | 'promote' | 'block' | 'delete',
  data?: any
): Promise<ActionResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get the user
  const user = getMockUserById(userId);
  if (!user) {
    return {
      success: false,
      message: 'User not found'
    };
  }
  
  // Clone the user to avoid mutating the original
  const updatedUser = { ...user };
  
  // Apply the action
  switch (action) {
    case 'admit':
      updatedUser.status = 'active';
      updatedUser.nationalIdVerified = true;
      updatedUser.lastActive = new Date().toISOString();
      break;
    case 'revoke':
      updatedUser.status = 'inactive';
      break;
    case 'promote':
      updatedUser.role = 'admin';
      break;
    case 'block':
      updatedUser.status = 'blocked';
      break;
    case 'delete':
      // No operation needed for mock
      break;
    default:
      return {
        success: false,
        message: 'Invalid action'
      };
  }
  
  // Return success
  return {
    success: true,
    message: `User ${action === 'admit' ? 'admitted' : action === 'revoke' ? 'revoked' : action === 'promote' ? 'promoted' : action === 'block' ? 'blocked' : 'deleted'} successfully`,
    user: updatedUser
  };
};