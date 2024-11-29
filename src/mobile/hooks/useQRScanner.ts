import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export function useQRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to camera to scan QR codes.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.error('Error requesting camera permission:', err);
      return false;
    }
  };

  const startScanning = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        throw new Error('Camera permission denied');
      }
      setIsScanning(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start scanner');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return {
    isScanning,
    error,
    startScanning,
    stopScanning,
    QRCodeScanner,
  };
}