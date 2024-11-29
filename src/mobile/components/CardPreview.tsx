import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import type { Profile } from '../../types';

interface CardPreviewProps {
  profile: Profile;
}

export function CardPreview({ profile }: CardPreviewProps) {
  if (!profile) return null;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
    },
    header: {
      height: 128,
      backgroundColor: profile.theme.primary,
    },
    content: {
      padding: 16,
      alignItems: 'center',
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      marginTop: -48,
      borderWidth: 4,
      borderColor: '#FFFFFF',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#111827',
      marginTop: 8,
    },
    title: {
      fontSize: 16,
      color: '#6B7280',
    },
    company: {
      fontSize: 14,
      color: '#9CA3AF',
    },
    bio: {
      fontSize: 14,
      color: '#6B7280',
      textAlign: 'center',
      marginTop: 16,
    },
    contactInfo: {
      marginTop: 24,
      alignItems: 'center',
    },
    contactText: {
      fontSize: 14,
      color: '#374151',
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.content}>
        <Image
          source={{ uri: profile.avatar || 'https://via.placeholder.com/96' }}
          style={styles.avatar}
        />
        
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.title}>{profile.title}</Text>
        <Text style={styles.company}>{profile.company}</Text>

        {profile.bio && (
          <Text style={styles.bio}>{profile.bio}</Text>
        )}

        <View style={styles.contactInfo}>
          {profile.contact?.phone && (
            <Text style={styles.contactText}>{profile.contact.phone}</Text>
          )}
          {profile.contact?.email && (
            <Text style={styles.contactText}>{profile.contact.email}</Text>
          )}
        </View>
      </View>
    </View>
  );
}