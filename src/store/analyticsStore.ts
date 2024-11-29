import { create } from 'zustand';
import type { Analytics } from '../types';
import { supabase } from '../lib/supabase';

interface AnalyticsState {
  analytics: Analytics | null;
  isLoading: boolean;
  error: string | null;
  fetchAnalytics: () => Promise<void>;
  trackEvent: (event: string, metadata?: Record<string, any>) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  analytics: null,
  isLoading: false,
  error: null,

  fetchAnalytics: async () => {
    try {
      set({ isLoading: true });
      const { data: analytics, error } = await supabase
        .from('analytics')
        .select('*')
        .single();

      if (error) throw error;
      set({ analytics });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  trackEvent: async (event, metadata = {}) => {
    try {
      const { error } = await supabase.from('events').insert([
        {
          event,
          metadata,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  },
}));