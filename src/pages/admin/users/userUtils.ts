import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./types";

export const fetchProfiles = async () => {
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  if (profilesError) throw profilesError;

  const profilesWithEmail = await Promise.all(
    profilesData.map(async (profile) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser(profile.id);
      if (userError) {
        console.error('Error fetching user:', userError);
        return { ...profile, email: 'Email not available' };
      }
      return { ...profile, email: user?.email };
    })
  );

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