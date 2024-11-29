import React, { useState } from 'react';
import { X, Copy, Share2, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NFCWriter } from './NFCWriter';
import type { VCard } from '../types';

interface ShareCardProps {
  vcard: VCard;
  onClose: () => void;
}

export const ShareCard: React.FC<ShareCardProps> = ({ vcard, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showNFCWriter, setShowNFCWriter] = useState(false);
  
  // Use the actual deployed URL
  const shareUrl = `${window.location.origin}/card/${vcard.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${vcard.name}'s Digital Card`,
          text: `Check out ${vcard.name}'s digital business card`,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Share Your Card</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white border rounded-lg">
                <QRCodeSVG
                  value={shareUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </div>
            </div>

            {/* Share Link */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Share Link
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  <Copy className={`h-5 w-5 ${copied ? 'text-green-600' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* Write to NFC Card */}
            <button
              onClick={() => setShowNFCWriter(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Smartphone className="h-5 w-5" />
              <span>Write to NFC Card</span>
            </button>

            {/* Share Options */}
            <div className="space-y-4">
              {navigator.share && (
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share via...</span>
                </button>
              )}

              <div className="grid grid-cols-3 gap-4">
                <ShareButton
                  name="Email"
                  icon="📧"
                  onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(`${vcard.name}'s Digital Card`)}&body=${encodeURIComponent(`Check out ${vcard.name}'s digital business card: ${shareUrl}`)}`}
                />
                <ShareButton
                  name="LinkedIn"
                  icon="💼"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                />
                <ShareButton
                  name="Twitter"
                  icon="🐦"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${vcard.name}'s digital business card`)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNFCWriter && (
        <NFCWriter
          vcard={vcard}
          shareUrl={shareUrl}
          onClose={() => setShowNFCWriter(false)}
        />
      )}
    </>
  );
};

interface ShareButtonProps {
  name: string;
  icon: string;
  onClick: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ name, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
  >
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-sm text-gray-600">{name}</span>
  </button>
);