import React, { useState } from 'react';
import { Smartphone, X } from 'lucide-react';
import type { VCard } from '../types';
import { useNFC } from '../hooks/useNFC';

interface NFCWriterProps {
  vcard: VCard;
  onClose: () => void;
}

export const NFCWriter: React.FC<NFCWriterProps> = ({ vcard, onClose }) => {
  const { isSupported, isWriting, error, writeToNFC } = useNFC();
  const [writeError, setWriteError] = useState<string | null>(null);

  const handleWrite = async () => {
    try {
      // Generate the correct URL for the card
      const cardUrl = `${window.location.origin}/card/${vcard.id}`;
      await writeToNFC(cardUrl);
      // Wait a bit before closing to show success state
      setTimeout(onClose, 2000);
    } catch (err) {
      setWriteError(err instanceof Error ? err.message : 'Failed to write to NFC');
    }
  };

  if (!isSupported) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Write to NFC Card</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center">
            <div className="h-12 w-12 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <p className="mt-2 text-red-600">NFC is not supported on this device</p>
            <button
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Write to NFC Card</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center">
          <Smartphone className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
          
          {!isWriting && !error && !writeError && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Hold your NFC card close to your device to write your digital business card data.
              </p>
              <button
                onClick={handleWrite}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Start Writing
              </button>
            </div>
          )}

          {isWriting && (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-12 w-12 mx-auto rounded-full bg-indigo-100 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <p className="text-gray-600">Writing to NFC card...</p>
            </div>
          )}

          {(error || writeError) && (
            <div className="space-y-4">
              <div className="h-12 w-12 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-red-600">{error || writeError}</p>
              <button
                onClick={handleWrite}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};