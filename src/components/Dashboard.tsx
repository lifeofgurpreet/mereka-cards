import React, { useState, useEffect } from 'react';
import { VCardPreview } from './VCardPreview';
import { EditCard } from './EditCard';
import { ShareCard } from './ShareCard';
import { Edit2, Share2, BarChart2, Download } from 'lucide-react';
import { useProfileStore } from '../store/profileStore';
import type { VCard } from '../types';

export const Dashboard: React.FC = () => {
  const { profile } = useProfileStore();
  const [vcard, setVcard] = useState<VCard>({
    id: '1',
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    bio: '',
    avatar: '',
    social: {
      linkedin: '',
      twitter: '',
      github: ''
    },
    theme: {
      primary: '#4F46E5',
      secondary: '#818CF8'
    }
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Sync vcard with profile data
  useEffect(() => {
    if (profile) {
      setVcard(prev => ({
        ...prev,
        name: profile.name || prev.name,
        title: profile.title || prev.title,
        company: profile.company || prev.company,
        bio: profile.bio || prev.bio,
        avatar: profile.avatar || prev.avatar,
        email: profile.contact?.email || prev.email,
        phone: profile.contact?.phone || prev.phone,
        website: profile.contact?.website || prev.website,
        social: {
          ...prev.social,
          ...profile.social
        }
      }));
    }
  }, [profile]);

  const handleSaveCard = (updatedCard: VCard) => {
    setVcard(updatedCard);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - vCard Preview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Digital Business Card</h2>
            <VCardPreview vcard={vcard} />
          </div>

          {/* Right Column - Actions and Stats */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center justify-center space-x-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit2 className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Edit Card</span>
                </button>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center justify-center space-x-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Share</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <BarChart2 className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Analytics</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Export</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Card Viewed</p>
                      <p className="text-xs text-gray-500">{i} hour{i !== 1 ? 's' : ''} ago</p>
                    </div>
                    <span className="text-sm text-gray-500">San Francisco, CA</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <p className="text-sm text-gray-500">Contacts Saved</p>
                <p className="text-2xl font-bold text-gray-900">856</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <p className="text-sm text-gray-500">Link Clicks</p>
                <p className="text-2xl font-bold text-gray-900">432</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && (
        <EditCard
          vcard={vcard}
          onSave={handleSaveCard}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      
      {isShareModalOpen && (
        <ShareCard
          vcard={vcard}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
};