import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Settings } from '../types';
import { supabase } from '../lib/supabase';

interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (data: Partial<Settings>) => Promise<void>;
  fetchSettings: () => Promise<void>;
  resetSettings: () => void;
}

const initialState = {
  settings: null,
  isLoading: false,
  error: null,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateSettings: async (data) => {
        try {
          set({ isLoading: true });
          const { error } = await supabase
            .from('settings')
            .update(data)
            .eq('id', get().settings?.id);

          if (error) throw error;
          set((state) => ({
            settings: state.settings ? { ...state.settings, ...data } : null,
          }));
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchSettings: async () => {
        try {
          set({ isLoading: true });
          const { data: settings, error } = await supabase
            .from('settings')
            .select('*')
            .single();

          if (error) throw error;
          set({ settings });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSettings: () => {
        set(initialState);
      },
    }),
    {
      name: 'settings-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...initialState,
            ...persistedState,
          };
        }
        return persistedState as SettingsState;
      },
    }
  )
);