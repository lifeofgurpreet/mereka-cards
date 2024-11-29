import * as Keychain from 'react-native-keychain';

export function useSecureStorage() {
  const saveSecurely = async (key: string, value: string): Promise<void> => {
    try {
      await Keychain.setGenericPassword(key, value);
    } catch (error) {
      console.error('Error saving to secure storage:', error);
      throw error;
    }
  };

  const getSecureValue = async (key: string): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const [storedKey, value] = credentials;
        return storedKey === key ? value : null;
      }
      return null;
    } catch (error) {
      console.error('Error reading from secure storage:', error);
      throw error;
    }
  };

  const removeSecureValue = async (key: string): Promise<void> => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.error('Error removing from secure storage:', error);
      throw error;
    }
  };

  return {
    saveSecurely,
    getSecureValue,
    removeSecureValue,
  };
}