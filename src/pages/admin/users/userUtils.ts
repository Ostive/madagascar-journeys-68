import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./types";

export const fetchProfiles = async () => {
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  if (profilesError) throw profilesError;

  // Fetch users one at a time to avoid token issues
  const profilesWithEmail = [];
  for (const profile of profilesData) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(profile.id);
      if (userError) {
        console.error('Error fetching user:', userError);
        profilesWithEmail.push({ ...profile, email: 'Email not available' });
      } else {
        profilesWithEmail.push({ ...profile, email: user?.email });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      profilesWithEmail.push({ ...profile, email: 'Email not available' });
    }
  }

  return profilesWithEmail;
};

export const updateUserRole = async (userId: string, currentRole: string) => {
  const newRole = currentRole === 'admin' ? 'user' : 'admin';
  
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) throw error;
  
  return newRole;
};