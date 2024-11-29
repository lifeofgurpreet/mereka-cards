import { useCallback } from 'react';
import { useTeamStore } from '../store';
import type { UserRole } from '../types';

export function useTeam() {
  const {
    organization,
    members,
    loading,
    error,
    addMember,
    removeMember,
    updateMemberRole,
  } = useTeamStore();

  const inviteMember = useCallback(async (email: string, role: UserRole) => {
    if (!organization) return;
    await addMember(email, role);
  }, [organization, addMember]);

  const removeMemberFromTeam = useCallback(async (userId: string) => {
    if (!organization) return;
    await removeMember(userId);
  }, [organization, removeMember]);

  const updateRole = useCallback(async (userId: string, role: UserRole) => {
    if (!organization) return;
    await updateMemberRole(userId, role);
  }, [organization, updateMemberRole]);

  return {
    organization,
    members,
    loading,
    error,
    inviteMember,
    removeMemberFromTeam,
    updateRole,
  };
}