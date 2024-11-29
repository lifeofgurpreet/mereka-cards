import { useState, useEffect } from 'react';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

export function useNativeNFC() {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkNFC() {
      try {
        const supported = await NfcManager.isSupported();
        setIsSupported(supported);
        
        if (supported) {
          await NfcManager.start();
          const enabled = await NfcManager.isEnabled();
          setIsEnabled(enabled);
        }
      } catch (err) {
        setError('Failed to initialize NFC');
        console.error(err);
      }
    }

    checkNFC();
    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  const writeToTag = async (url: string): Promise<void> => {
    try {
      setIsWriting(true);
      setError(null);

      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
      
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
      }
    } catch (err) {
      setError('Failed to write to NFC tag');
      console.error(err);
      throw err;
    } finally {
      setIsWriting(false);
      NfcManager.cancelTechnologyRequest();
    }
  };

  return {
    isSupported,
    isEnabled,
    isWriting,
    error,
    writeToTag,
  };
}