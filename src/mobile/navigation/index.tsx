import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from '../screens/Dashboard';
import { Settings } from '../screens/Settings';
import { TeamManagement } from '../screens/TeamManagement';
import { Analytics } from '../screens/Analytics';
import { NFCWriter } from '../screens/NFCWriter';

const Stack = createNativeStackNavigator();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard}
          options={{ title: 'My Cards' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen 
          name="Team" 
          component={TeamManagement}
          options={{ title: 'Team Management' }}
        />
        <Stack.Screen 
          name="Analytics" 
          component={Analytics}
          options={{ title: 'Analytics' }}
        />
        <Stack.Screen 
          name="NFCWriter" 
          component={NFCWriter}
          options={{ title: 'Write to NFC Card' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}