import { supabase } from './supabase';

export async function trackCardView(cardId: string) {
  try {
    const { data: location } = await fetch('https://ipapi.co/json/').then(res => res.json());
    
    const { data, error } = await supabase
      .from('card_analytics')
      .insert([
        {
          card_id: cardId,
          event_type: 'view',
          city: location.city,
          country: location.country_name,
          timestamp: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error tracking card view:', error);
  }
}

export async function trackCardSave(cardId: string) {
  try {
    const { data, error } = await supabase
      .from('card_analytics')
      .insert([
        {
          card_id: cardId,
          event_type: 'save',
          timestamp: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error tracking card save:', error);
  }
}

export async function trackLinkClick(cardId: string, linkType: string) {
  try {
    const { data, error } = await supabase
      .from('card_analytics')
      .insert([
        {
          card_id: cardId,
          event_type: 'click',
          link_type: linkType,
          timestamp: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error tracking link click:', error);
  }
}