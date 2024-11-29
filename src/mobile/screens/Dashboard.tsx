import React from 'react';
import { ScrollView, View } from 'react-native';
import { useProfileStore } from '../../store/profileStore';
import { CardPreview } from '../components/CardPreview';
import { Button } from '../components/Button';

export function Dashboard({ navigation }) {
  const { profile } = useProfileStore();

  return (
    <ScrollView className="bg-gray-100 flex-1">
      <View className="p-4">
        <CardPreview profile={profile} />
        
        <View className="mt-6 space-y-4">
          <Button
            label="Write to NFC Card"
            onPress={() => navigation.navigate('NFCWriter')}
            variant="primary"
          />
          
          <View className="flex-row space-x-4">
            <Button
              label="Analytics"
              onPress={() => navigation.navigate('Analytics')}
              variant="secondary"
              className="flex-1"
            />
            <Button
              label="Team"
              onPress={() => navigation.navigate('Team')}
              variant="secondary"
              className="flex-1"
            />
          </View>
        </View>

        <View className="mt-6 bg-white rounded-lg shadow p-4">
          <Text className="text-lg font-bold">Recent Activity</Text>
          {/* Activity list will be implemented here */}
        </View>
      </View>
    </ScrollView>
  );
}