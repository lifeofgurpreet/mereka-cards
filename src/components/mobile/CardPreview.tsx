import React from 'react';
import { View } from '@nativescript/core/ui/core/view';
import { Image } from '@nativescript/core/ui/image';
import { Label } from '@nativescript/core/ui/label';
import type { Profile } from '../../types';

interface CardPreviewProps {
  profile: Profile;
}

export function CardPreview({ profile }: CardPreviewProps) {
  if (!profile) return null;

  return (
    <View className="bg-white rounded-lg shadow-lg overflow-hidden">
      <View 
        className="h-32 w-full"
        style={{ backgroundColor: profile.theme.primary }}
      />
      
      <View className="p-4">
        <Image
          src={profile.avatar || 'res://placeholder_avatar'}
          className="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white"
        />
        
        <View className="mt-2 text-center">
          <Label
            className="text-xl font-bold"
            text={profile.name}
          />
          <Label
            className="text-gray-600"
            text={profile.title}
          />
          <Label
            className="text-gray-500"
            text={profile.company}
          />
        </View>

        {profile.bio && (
          <Label
            className="mt-4 text-gray-600 text-center"
            text={profile.bio}
            textWrap={true}
          />
        )}

        <View className="mt-6 space-y-4">
          {profile.contact?.phone && (
            <View className="flex-row items-center justify-center space-x-2">
              <Label
                className="text-gray-700"
                text={profile.contact.phone}
              />
            </View>
          )}

          {profile.contact?.email && (
            <View className="flex-row items-center justify-center space-x-2">
              <Label
                className="text-gray-700"
                text={profile.contact.email}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}