import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, Organization } from '../types';

interface TeamState {
  organization: Organization | null;
  members: User[];
  loading: boolean;
  error: string | null;
  fetchOrganization: () => Promise<void>;
  fetchMembers: () => Promise<void>;
  addMember: (email: string, role: 'admin' | 'member') => Promise<void>;
  removeMember: (userId: string) => Promise<void>;
  updateMemberRole: (userId: string, role: 'admin' | 'member') => Promise<void>;
  createOrganization: (name: string, domain?: string) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  organization: null,
  members: [],
  loading: false,
  error: null,

  createOrganization: async (name: string, domain?: string) => {
    try {
      set({ loading: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // Create organization
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert([{ 
          name, 
          domain,
          settings: {
            allowMemberInvites: true,
            requireAdminApproval: true,
            brandingEnabled: true,
            analyticsEnabled: true
          }
        }])
        .select()
        .single();

      if (orgError) {
        console.error('Error creating organization:', orgError);
        throw new Error(orgError.message);
      }

      if (!org) {
        throw new Error('Failed to create organization');
      }

      // Add current user as admin
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email,
          role: 'admin',
          organization_id: org.id
        }]);

      if (userError) {
        console.error('Error adding user:', userError);
        throw new Error(userError.message);
      }

      set({ organization: org });
      await get().fetchMembers();
    } catch (error) {
      console.error('Error in createOrganization:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to create organization' });
    } finally {
      set({ loading: false });
    }
  },

  fetchOrganization: async () => {
    try {
      set({ loading: true, error: null });
      
      // Get current user's organization
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('organization_id')
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Error fetching user:', userError);
        throw userError;
      }

      if (userData?.organization_id) {
        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', userData.organization_id)
          .single();

        if (orgError) {
          console.error('Error fetching organization:', orgError);
          throw orgError;
        }

        set({ organization: org });
      }
    } catch (error) {
      console.error('Error in fetchOrganization:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch organization' });
    } finally {
      set({ loading: false });
    }
  },

  fetchMembers: async () => {
    try {
      set({ loading: true, error: null });
      const org = get().organization;
      
      if (!org) {
        throw new Error('No organization selected');
      }

      const { data: members, error } = await supabase
        .from('users')
        .select('*')
        .eq('organization_id', org.id);

      if (error) {
        console.error('Error fetching members:', error);
        throw error;
      }

      set({ members: members || [] });
    } catch (error) {
      console.error('Error in fetchMembers:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch members' });
    } finally {
      set({ loading: false });
    }
  },

  addMember: async (email: string, role: 'admin' | 'member') => {
    try {
      set({ loading: true, error: null });
      const org = get().organization;
      
      if (!org) {
        throw new Error('No organization selected');
      }

      const { error } = await supabase
        .from('team_invites')
        .insert([{
          email,
          role,
          organization_id: org.id
        }]);

      if (error) {
        console.error('Error adding member:', error);
        throw error;
      }

      await get().fetchMembers();
    } catch (error) {
      console.error('Error in addMember:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to add member' });
    } finally {
      set({ loading: false });
    }
  },

  removeMember: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Error removing member:', error);
        throw error;
      }

      await get().fetchMembers();
    } catch (error) {
      console.error('Error in removeMember:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to remove member' });
    } finally {
      set({ loading: false });
    }
  },

  updateMemberRole: async (userId: string, role: 'admin' | 'member') => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId);

      if (error) {
        console.error('Error updating member role:', error);
        throw error;
      }

      await get().fetchMembers();
    } catch (error) {
      console.error('Error in updateMemberRole:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to update member role' });
    } finally {
      set({ loading: false });
    }
  },
}));