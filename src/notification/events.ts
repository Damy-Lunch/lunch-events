/**
 * Event interfaces for notification-service
 * Publishers must conform to these interfaces when emitting events
 */

/**
 * Match created event - emitted by matching-service
 */
export interface MatchCreatedEvent {
  eventType: 'match.created';
  matchId: string;
  user1Id: string;
  user1Name: string;
  user2Id: string;
  user2Name: string;
  createdAt: string;
}

/**
 * Invite received event - emitted by matching-service
 */
export interface InviteReceivedEvent {
  eventType: 'invite.received';
  inviteId: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  groupId?: string;
  groupName?: string;
  createdAt: string;
}

/**
 * Invite approved event - emitted by matching-service
 */
export interface InviteApprovedEvent {
  eventType: 'invite.approved';
  inviteId: string;
  recipientId: string;
  groupId: string;
  groupName: string;
  createdAt: string;
}

/**
 * Member joined conversation event - emitted by matching-service
 */
export interface MemberJoinedEvent {
  eventType: 'conversation.member.joined';
  conversationId: string;
  memberId: string;
  memberName: string;
  recipientIds: string[];
  createdAt: string;
}

/**
 * Message created event - emitted by chat-service
 */
export interface MessageCreatedEvent {
  eventType: 'message.created';
  conversationId: string;
  messageId: string;
  senderId: string;
  senderName: string;
  messagePreview: string;
  recipientIds: string[];
  createdAt: string;
}

/** Union type of all notification events */
export type NotificationEvent =
  | MatchCreatedEvent
  | InviteReceivedEvent
  | InviteApprovedEvent
  | MemberJoinedEvent
  | MessageCreatedEvent;
