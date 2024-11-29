import React, { useState, useEffect } from 'react';
import { Save, Bell, Lock, Palette, CreditCard, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useProfileStore } from '../store';
import type { Profile } from '../types';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { profile, updateProfile, isLoading, error, isDirty } = useProfileStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: '',
    title: '',
    company: '',
    bio: '',
    contact: {
      email: '',
      phone: '',
      website: ''
    }
  });

  // Sync form data with profile when it changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        company: profile.company || '',
        bio: profile.bio || '',
        contact: {
          email: profile.contact?.email || '',
          phone: profile.contact?.phone || '',
          website: profile.contact?.website || ''
        }
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        ...formData,
        updatedAt: new Date().toISOString()
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name.startsWith('contact.')) {
        const field = name.split('.')[1];
        return {
          ...prev,
          contact: {
            ...prev.contact,
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success</h3>
                <div className="mt-2 text-sm text-green-700">
                  Your changes have been saved successfully.
                </div>
              </div>
            </div>
          </div>
        )}

        {isDirty && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Pending Changes</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  You have unsaved changes that will sync when you're back online.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <nav className="space-y-1">
            <SettingsTab
              icon={<User />}
              title="Profile"
              isActive={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
            <SettingsTab
              icon={<Bell />}
              title="Notifications"
              isActive={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            />
            <SettingsTab
              icon={<Lock />}
              title="Security"
              isActive={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
            />
            <SettingsTab
              icon={<Palette />}
              title="Appearance"
              isActive={activeTab === 'appearance'}
              onClick={() => setActiveTab('appearance')}
            />
            <SettingsTab
              icon={<CreditCard />}
              title="Billing"
              isActive={activeTab === 'billing'}
              onClick={() => setActiveTab('billing')}
            />
          </nav>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg">
              {activeTab === 'profile' && (
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="contact.email"
                        value={formData.contact?.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="contact.phone"
                        value={formData.contact?.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input
                        type="url"
                        name="contact.website"
                        value={formData.contact?.website}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SettingsTabProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ icon, title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
      isActive
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <span className={isActive ? 'text-indigo-600' : 'text-gray-400'}>{icon}</span>
    <span>{title}</span>
  </button>
);