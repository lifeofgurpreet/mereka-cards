import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '../types';
import { supabase, isOnline, offlineStorage } from '../lib/supabase';

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
  pendingChanges: Partial<Profile> | null;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  fetchProfile: () => Promise<void>;
  syncPendingChanges: () => Promise<void>;
  resetProfile: () => void;
  clearError: () => void;
}

const OFFLINE_PROFILE_KEY = 'offline_profile';

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,
      isDirty: false,
      pendingChanges: null,

      clearError: () => set({ error: null }),

      updateProfile: async (data) => {
        try {
          set({ isLoading: true, error: null });
          
          // Always update local state immediately
          const updatedProfile = {
            ...(get().profile || {}),
            ...data,
            updatedAt: new Date().toISOString()
          } as Profile;

          set({
            profile: updatedProfile,
            isDirty: !isOnline(),
            pendingChanges: isOnline() ? null : data
          });

          // Store in offline storage
          offlineStorage.set(OFFLINE_PROFILE_KEY, updatedProfile);

          if (!isOnline()) {
            set({ 
              error: null,
              isDirty: true,
              pendingChanges: data
            });
            return;
          }

          // Sync with Supabase
          const { error: upsertError } = await supabase
            .from('profiles')
            .upsert([updatedProfile], {
              onConflict: 'id',
              ignoreDuplicates: false
            });

          if (upsertError) throw upsertError;
          
          set({ 
            isDirty: false, 
            pendingChanges: null,
            error: null
          });
          
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update profile',
            isDirty: true
          });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchProfile: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Try to get from offline storage first
          const offlineProfile = offlineStorage.get(OFFLINE_PROFILE_KEY);
          if (offlineProfile) {
            set({ profile: offlineProfile });
          }

          if (!isOnline()) {
            set({ 
              error: null,
              isDirty: true
            });
            return;
          }

          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }
          
          if (profile) {
            set({ 
              profile,
              error: null,
              isDirty: false
            });
            offlineStorage.set(OFFLINE_PROFILE_KEY, profile);
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch profile' });
        } finally {
          set({ isLoading: false });
        }
      },

      syncPendingChanges: async () => {
        const state = get();
        if (state.isDirty && state.pendingChanges && isOnline()) {
          try {
            await state.updateProfile(state.pendingChanges);
          } catch (error) {
            console.error('Failed to sync pending changes:', error);
          }
        }
      },

      resetProfile: () => {
        set({
          profile: null,
          isLoading: false,
          error: null,
          isDirty: false,
          pendingChanges: null
        });
        offlineStorage.remove(OFFLINE_PROFILE_KEY);
      },
    }),
    {
      name: 'profile-storage',
      version: 1,
    }
  )
);