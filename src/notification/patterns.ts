/**
 * Event patterns for notification-service
 * Use these constants when emitting events to ensure consistency
 */
export const NOTIFICATION_PATTERNS = {
  /** Emitted when a match is created between two users */
  MATCH_CREATED: 'match.created',
  
  /** Emitted when a user receives an invite */
  INVITE_RECEIVED: 'invite.received',
  
  /** Emitted when an invite is approved */
  INVITE_APPROVED: 'invite.approved',
  
  /** Emitted when a member joins a conversation */
  MEMBER_JOINED: 'conversation.member.joined',
  
  /** Emitted when a new message is created */
  MESSAGE_CREATED: 'message.created',
} as const;

export type NotificationPattern = typeof NOTIFICATION_PATTERNS[keyof typeof NOTIFICATION_PATTERNS];
