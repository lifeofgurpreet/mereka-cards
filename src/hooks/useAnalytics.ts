import { useCallback } from 'react';
import { useAnalyticsStore } from '../store';

export function useAnalytics() {
  const { trackEvent } = useAnalyticsStore();

  const trackCardView = useCallback((cardId: string) => {
    trackEvent('card_view', { cardId });
  }, [trackEvent]);

  const trackCardSave = useCallback((cardId: string) => {
    trackEvent('card_save', { cardId });
  }, [trackEvent]);

  const trackLinkClick = useCallback((cardId: string, linkType: string) => {
    trackEvent('link_click', { cardId, linkType });
  }, [trackEvent]);

  return {
    trackCardView,
    trackCardSave,
    trackLinkClick,
  };
}