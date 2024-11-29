import { Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

export function usePlatformBiometrics() {
  const authenticate = async (): Promise<boolean> => {
    try {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true // Allows PIN/Pattern on Android
      });

      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        console.log('Biometrics not available');
        return false;
      }

      const promptMessage = Platform.select({
        ios: 'Confirm your identity',
        android: 'Please authenticate to continue',
      });

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Cancel',
      });

      return success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  };

  return {
    authenticate,
  };
}