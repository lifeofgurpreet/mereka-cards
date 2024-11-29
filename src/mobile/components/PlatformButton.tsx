import React from 'react';
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';

interface PlatformButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function PlatformButton({ label, onPress, variant = 'primary', className }: PlatformButtonProps) {
  const styles = StyleSheet.create({
    button: {
      paddingVertical: Platform.select({ ios: 12, android: 10 }),
      paddingHorizontal: 16,
      borderRadius: Platform.select({ ios: 8, android: 4 }),
      alignItems: 'center',
      justifyContent: 'center',
      elevation: Platform.select({ ios: 0, android: 2 }),
    },
    primary: {
      backgroundColor: '#4F46E5',
    },
    secondary: {
      backgroundColor: '#FFFFFF',
      borderWidth: Platform.select({ ios: 1, android: 0 }),
      borderColor: '#E5E7EB',
    },
    primaryText: {
      color: '#FFFFFF',
      fontWeight: Platform.select({ ios: '600', android: '500' }),
      fontSize: Platform.select({ ios: 16, android: 14 }),
    },
    secondaryText: {
      color: '#374151',
      fontWeight: Platform.select({ ios: '600', android: '500' }),
      fontSize: Platform.select({ ios: 16, android: 14 }),
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
      ]}
      onPress={onPress}
      className={className}
    >
      <Text style={variant === 'primary' ? styles.primaryText : styles.secondaryText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}