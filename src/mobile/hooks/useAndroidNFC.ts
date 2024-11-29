import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

export function useAndroidNFC() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      const eventEmitter = new NativeEventEmitter(NativeModules.NfcManager);
      const subscription = eventEmitter.addListener('NfcManagerDiscoverTag', (tag) => {
        console.log('NFC Tag Discovered:', tag);
      });

      return () => {
        subscription.remove();
      };
    }
  }, []);

  const writeNdefMessage = async (url: string): Promise<void> => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
      
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        await NfcManager.setAlertMessageIOS('Successfully wrote NFC tag!');
      }
    } catch (error) {
      console.error('Error writing NDEF message:', error);
      throw error;
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return {
    writeNdefMessage,
  };
}