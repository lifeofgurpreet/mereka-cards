import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ label, onPress, variant = 'primary', className }: ButtonProps) {
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: '#4F46E5',
    },
    secondary: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    primaryText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    secondaryText: {
      color: '#374151',
      fontWeight: '600',
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