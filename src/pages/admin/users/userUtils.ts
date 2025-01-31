import { supabase } from "@/integrations/supabase/client";
import { Profile, UserRole } from "./types";

export const fetchProfiles = async (): Promise<Profile[]> => {
  // Fetch profiles with additional columns
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('*, email');

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    throw profilesError;
  }

  // If no profiles, return empty array
  if (!profilesData || profilesData.length === 0) {
    return [];
  }

  // Combine profiles with user data
  const profilesWithDetails = profilesData.map(profile => ({
    ...profile,
    email: profile.email || 'Email not available',
    phone: 'Phone not available',
    avatarUrl: profile.avatar_url || '/default-avatar.png',
    role: profile.role as UserRole
  }));

  return profilesWithDetails;
};

export const updateUserRole = async (userId: string, currentRole: string): Promise<UserRole> => {
  const newRole = (currentRole === 'admin' ? 'user' : 'admin') as UserRole;
  
  const { error } = await supabase
    .from('profiles')
    .update({ 
      role: newRole,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
  
  return newRole;
};
