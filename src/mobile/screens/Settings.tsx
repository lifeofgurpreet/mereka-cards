import React, { useState } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { useBiometrics } from '../hooks/useBiometrics';
import { useSecureStorage } from '../hooks/useSecureStorage';
import { Button } from '../components/Button';

export function Settings() {
  const { settings, updateSettings } = useSettingsStore();
  const { authenticate } = useBiometrics();
  const { saveSecurely } = useSecureStorage();
  const [biometricsEnabled, setBiometricsEnabled] = useState(settings?.security?.biometricsEnabled || false);

  const handleBiometricsToggle = async () => {
    try {
      if (!biometricsEnabled) {
        const authenticated = await authenticate();
        if (authenticated) {
          await saveSecurely('biometrics_enabled', 'true');
          setBiometricsEnabled(true);
          await updateSettings({
            security: {
              ...settings?.security,
              biometricsEnabled: true,
            },
          });
          Alert.alert('Success', 'Biometric authentication enabled');
        }
      } else {
        await saveSecurely('biometrics_enabled', 'false');
        setBiometricsEnabled(false);
        await updateSettings({
          security: {
            ...settings?.security,
            biometricsEnabled: false,
          },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update biometric settings');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="bg-white rounded-lg shadow-sm">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">Security</Text>
          </View>

          <View className="p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Biometric Authentication</Text>
                <Text className="text-sm text-gray-500">
                  Use Face ID or Touch ID to secure your app
                </Text>
              </View>
              <Switch
                value={biometricsEnabled}
                onValueChange={handleBiometricsToggle}
                trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
                thumbColor={biometricsEnabled ? '#4F46E5' : '#F9FAFB'}
              />
            </View>
          </View>
        </View>

        <View className="mt-4 bg-white rounded-lg shadow-sm">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">Notifications</Text>
          </View>

          <View className="p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Push Notifications</Text>
                <Text className="text-sm text-gray-500">
                  Get notified when someone views your card
                </Text>
              </View>
              <Switch
                value={settings?.notifications?.push}
                onValueChange={(value) =>
                  updateSettings({
                    notifications: {
                      ...settings?.notifications,
                      push: value,
                    },
                  })
                }
                trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
                thumbColor={settings?.notifications?.push ? '#4F46E5' : '#F9FAFB'}
              />
            </View>
          </View>
        </View>

        <View className="mt-8">
          <Button
            label="Clear App Data"
            onPress={() => {
              Alert.alert(
                'Clear App Data',
                'Are you sure you want to clear all app data? This action cannot be undone.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: () => {
                      // Implement clear data functionality
                    },
                  },
                ]
              );
            }}
            variant="secondary"
          />
        </View>
      </View>
    </View>
  );
}