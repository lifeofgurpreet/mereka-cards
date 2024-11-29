import React from 'react';
import { View, ScrollView } from '@nativescript/core/ui/core/view';
import { Button } from '@nativescript/core/ui/button';
import { Label } from '@nativescript/core/ui/label';
import { useProfileStore } from '../../store/profileStore';
import { CardPreview } from './CardPreview';

export function Dashboard({ navigation }) {
  const { profile } = useProfileStore();

  return (
    <ScrollView className="bg-gray-100">
      <View className="p-4">
        <CardPreview profile={profile} />
        
        <View className="mt-6 space-y-4">
          <Button
            className="bg-indigo-600 text-white p-4 rounded-lg"
            text="Write to NFC Card"
            onTap={() => navigation.navigate('NFCWriter')}
          />
          
          <View className="grid grid-cols-2 gap-4">
            <Button
              className="bg-white p-4 rounded-lg shadow"
              text="Analytics"
              onTap={() => navigation.navigate('Analytics')}
            />
            <Button
              className="bg-white p-4 rounded-lg shadow"
              text="Team"
              onTap={() => navigation.navigate('Team')}
            />
          </View>
        </View>

        <View className="mt-6 bg-white rounded-lg shadow p-4">
          <Label
            className="text-lg font-bold"
            text="Recent Activity"
          />
          {/* Activity list will go here */}
        </View>
      </View>
    </ScrollView>
  );
}