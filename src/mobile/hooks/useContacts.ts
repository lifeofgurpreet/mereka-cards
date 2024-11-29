import { useState } from 'react';
import Contacts from 'react-native-contacts';
import { Platform, PermissionsAndroid } from 'react-native';
import type { VCard } from '../../types';

export function useContacts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to contacts to save business cards.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const permission = await Contacts.requestPermission();
        return permission === 'authorized';
      }
    } catch (err) {
      console.error('Error requesting contacts permission:', err);
      return false;
    }
  };

  const saveToContacts = async (vcard: VCard) => {
    try {
      setIsLoading(true);
      setError(null);

      const hasPermission = await requestPermission();
      if (!hasPermission) {
        throw new Error('Contacts permission denied');
      }

      const newContact = {
        givenName: vcard.name.split(' ')[0],
        familyName: vcard.name.split(' ').slice(1).join(' '),
        company: vcard.company,
        jobTitle: vcard.title,
        emailAddresses: [{
          label: 'work',
          email: vcard.email,
        }],
        phoneNumbers: [{
          label: 'work',
          number: vcard.phone,
        }],
        urlAddresses: vcard.website ? [{
          label: 'work',
          url: vcard.website,
        }] : [],
        note: vcard.bio,
      };

      await Contacts.addContact(newContact);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save contact');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    saveToContacts,
  };
}