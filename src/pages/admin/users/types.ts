export type UserRole = 'user' | 'admin';

export interface UserMetadata {
  [key: string]: any;
}

export interface Profile {
  // From profiles table
  id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;

  // From auth.users table
  email?: string;
  phone?: string;
  avatarUrl?: string;
  
  // Additional metadata from auth.users
  metadata?: UserMetadata;
}

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  raw_user_meta_data?: UserMetadata;
  avatar_url?: string;
}

export interface CreateProfileParams {
  id: string;
  role?: UserRole;
  metadata?: UserMetadata;
}

export interface UpdateProfileParams {
  role?: UserRole;
  metadata?: Partial<UserMetadata>;
}