import React from 'react';
import { Navigation } from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}