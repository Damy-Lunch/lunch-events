export const PROFILE_EVENTS = {
  VERIFIED: 'profile.verified',
} as const;

export interface ProfileVerifiedEvent {
  eventType: 'profile.verified';
  timestamp: string;
  payload: {
    userId: string;
    verifiedAt: string;
  };
}
