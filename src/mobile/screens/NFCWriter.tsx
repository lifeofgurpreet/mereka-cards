import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useNativeNFC } from '../hooks/useNativeNFC';
import { Button } from '../components/Button';
import { useBiometrics } from '../hooks/useBiometrics';

export function NFCWriter({ route, navigation }) {
  const { cardUrl } = route.params;
  const { isSupported, isEnabled, isWriting, error, writeToTag } = useNativeNFC();
  const { authenticate } = useBiometrics();
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'writing' | 'success' | 'error'>('idle');

  const handleWrite = async () => {
    try {
      setStatus('authenticating');
      const authenticated = await authenticate();
      
      if (!authenticated) {
        Alert.alert('Authentication Failed', 'Please try again');
        setStatus('idle');
        return;
      }

      setStatus('writing');
      await writeToTag(cardUrl);
      setStatus('success');
      Alert.alert('Success', 'Card data written successfully');
      navigation.goBack();
    } catch (err) {
      setStatus('error');
      Alert.alert('Error', error || 'Failed to write to NFC tag');
    }
  };

  if (!isSupported) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-lg mb-4">NFC is not supported on this device</Text>
        <Button
          label="Go Back"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    );
  }

  if (!isEnabled) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-lg mb-4">Please enable NFC in your device settings</Text>
        <Button
          label="Go Back"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      {status === 'idle' && (
        <>
          <Text className="text-lg text-center mb-8">
            Hold your NFC card close to write your digital business card data
          </Text>
          <Button
            label="Start Writing"
            onPress={handleWrite}
            variant="primary"
          />
        </>
      )}

      {(status === 'authenticating' || status === 'writing') && (
        <View className="items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="mt-4 text-gray-600">
            {status === 'authenticating' ? 'Authenticating...' : 'Writing to NFC card...'}
          </Text>
        </View>
      )}

      {status === 'error' && (
        <>
          <Text className="text-red-600 text-lg mb-4">{error}</Text>
          <Button
            label="Try Again"
            onPress={handleWrite}
            variant="primary"
          />
        </>
      )}
    </View>
  );
}