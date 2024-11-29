import { useState } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';

export function useBiometrics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async (): Promise<boolean> => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        setError('Biometric authentication not available');
        return false;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm your identity',
        cancelButtonText: 'Cancel',
      });

      setIsAuthenticated(success);
      return success;
    } catch (err) {
      setError('Authentication failed');
      console.error(err);
      return false;
    }
  };

  return {
    isAuthenticated,
    error,
    authenticate,
  };
}