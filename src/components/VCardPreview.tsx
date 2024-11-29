import React from 'react';
import { Phone, Mail, Globe, Linkedin, Twitter, Github } from 'lucide-react';
import type { VCard } from '../types';

interface VCardPreviewProps {
  vcard: VCard;
}

export const VCardPreview: React.FC<VCardPreviewProps> = ({ vcard }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div 
        className="h-32 w-full"
        style={{ backgroundColor: vcard.theme.primary }}
      />
      <div className="relative px-6 pt-16 pb-8">
        {/* Company Logo */}
        {vcard.companyLogo && (
          <div className="absolute -top-24 right-6">
            <img
              src={vcard.companyLogo}
              alt={vcard.company}
              className="w-16 h-16 object-contain bg-white rounded-lg shadow-md p-2"
            />
          </div>
        )}

        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <img
            src={vcard.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt={vcard.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{vcard.name}</h2>
          <p className="text-lg text-gray-600">{vcard.title}</p>
          <p className="text-md text-gray-500">{vcard.company}</p>
        </div>

        {vcard.bio && (
          <p className="mt-4 text-gray-600 text-center">{vcard.bio}</p>
        )}

        <div className="mt-6 space-y-4">
          <a href={`tel:${vcard.phone}`} className="flex items-center justify-center space-x-3 text-gray-700 hover:text-indigo-600">
            <Phone className="h-5 w-5" />
            <span>{vcard.phone}</span>
          </a>
          
          <a href={`mailto:${vcard.email}`} className="flex items-center justify-center space-x-3 text-gray-700 hover:text-indigo-600">
            <Mail className="h-5 w-5" />
            <span>{vcard.email}</span>
          </a>

          {vcard.website && (
            <a href={vcard.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 text-gray-700 hover:text-indigo-600">
              <Globe className="h-5 w-5" />
              <span>{new URL(vcard.website).hostname}</span>
            </a>
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          {vcard.social.linkedin && (
            <a href={vcard.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {vcard.social.twitter && (
            <a href={vcard.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
              <Twitter className="h-6 w-6" />
            </a>
          )}
          {vcard.social.github && (
            <a href={vcard.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
              <Github className="h-6 w-6" />
            </a>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
            Save Contact
          </button>
        </div>

        {/* Service Provider Branding */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-2 text-gray-400">
            <span className="text-sm">Powered by</span>
            <img
              src="https://cdn.prod.website-files.com/64eda991d8d82729ed0120e8/64eda991d8d82729ed0127f0_Mereka.io%20Logo_HBlack.png"
              alt="Mereka.io"
              className="h-4 opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};