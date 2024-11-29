import { useState, useCallback } from 'react';

interface NFCHookResult {
  isSupported: boolean;
  isWriting: boolean;
  success: boolean;
  error: string | null;
  writeToNFC: (url: string) => Promise<void>;
  reset: () => void;
}

export function useNFC(): NFCHookResult {
  const [isWriting, setIsWriting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSupported = typeof window !== 'undefined' && 'NDEFReader' in window;

  const reset = useCallback(() => {
    setIsWriting(false);
    setSuccess(false);
    setError(null);
  }, []);

  const writeToNFC = useCallback(async (url: string) => {
    if (!isSupported) {
      setError('NFC is not supported on this device');
      return;
    }

    try {
      setIsWriting(true);
      setError(null);
      setSuccess(false);

      const ndef = new (window as any).NDEFReader();
      
      // First request permission to use NFC
      await ndef.scan();
      
      // Create a well-formed URL record that works on both Android and iOS
      const encoder = new TextEncoder();
      const urlBytes = encoder.encode(url);
      
      await ndef.write({
        records: [
          {
            recordType: "url",
            data: urlBytes,
            // iOS requires these additional fields
            id: new Uint8Array([1]),
            mediaType: "text/plain",
            encoding: "utf-8",
            lang: "en"
          },
          // Fallback text record for older devices
          {
            recordType: "text",
            data: url,
            encoding: "utf-8",
            lang: "en"
          }
        ]
      });

      setSuccess(true);
    } catch (error) {
      console.error('NFC Write Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to write to NFC');
      setSuccess(false);
    } finally {
      setIsWriting(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    isWriting,
    success,
    error,
    writeToNFC,
    reset
  };
}