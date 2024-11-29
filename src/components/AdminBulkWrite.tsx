import React, { useState } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import type { BulkWriteConfig } from '../types';

interface AdminBulkWriteProps {
  onClose: () => void;
}

export const AdminBulkWrite: React.FC<AdminBulkWriteProps> = ({ onClose }) => {
  const [config, setConfig] = useState<BulkWriteConfig>({
    cards: [],
    status: 'pending',
    progress: 0,
    total: 0
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csv = event.target?.result as string;
          const lines = csv.split('\n');
          const cards = lines.slice(1).map((line) => {
            const [name, id] = line.split(',');
            return {
              id: id.trim(),
              name: name.trim(),
              url: `https://vcardpro.app/card/${id.trim()}`
            };
          });
          setConfig({
            ...config,
            cards,
            total: cards.length
          });
        } catch (error) {
          console.error('Error parsing CSV:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const startBulkWrite = async () => {
    if (!('NDEFReader' in window)) {
      alert('NFC is not supported on this device');
      return;
    }

    setConfig({ ...config, status: 'writing' });
    const ndef = new (window as any).NDEFReader();

    for (let i = 0; i < config.cards.length; i++) {
      const card = config.cards[i];
      try {
        await ndef.write({
          records: [{
            recordType: "url",
            data: card.url,
          }]
        });
        setConfig(prev => ({
          ...prev,
          progress: i + 1
        }));
        // Wait for user confirmation before proceeding to next card
        await new Promise(resolve => {
          if (confirm(`Successfully wrote card for ${card.name}. Continue to next card?`)) {
            resolve(true);
          }
        });
      } catch (error) {
        console.error(`Error writing card for ${card.name}:`, error);
        if (!confirm('Error occurred. Continue to next card?')) {
          break;
        }
      }
    }

    setConfig(prev => ({
      ...prev,
      status: 'complete'
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Bulk NFC Card Writer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {config.status === 'pending' && (
            <>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-600">
                        Upload CSV file with card data
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">CSV format: name,card_id</p>
                </div>
              </div>

              {config.cards.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">
                    {config.cards.length} cards loaded
                  </h3>
                  <div className="max-h-60 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Card ID
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {config.cards.map((card) => (
                          <tr key={card.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {card.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {card.id}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={startBulkWrite}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Start Writing Cards
                  </button>
                </div>
              )}
            </>
          )}

          {config.status === 'writing' && (
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <div className="h-12 w-12 mx-auto rounded-full bg-indigo-100 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <p className="text-gray-600">
                Writing card {config.progress + 1} of {config.total}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${(config.progress / config.total) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {config.status === 'complete' && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
              <p className="text-gray-900 font-medium">
                Successfully wrote {config.progress} cards
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          )}

          {config.status === 'error' && (
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
              <p className="text-red-600">An error occurred during writing</p>
              <button
                onClick={() => setConfig({ ...config, status: 'pending' })}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
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