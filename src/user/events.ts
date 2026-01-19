export const USER_EVENTS = {
  REGISTERED: 'user.registered',
  UPDATED: 'user.updated',
  DELETED: 'user.deleted',
} as const;

export interface UserRegisteredEvent {
  userId: string;
  email: string;
  fullName?: string;
  avatar?: string;
  phoneNumber?: string;
  isVerified: boolean;
  registeredAt: Date;
  registrationMethod: 'email' | 'oauth';
  oauthProvider?: string;
}

export interface UserUpdatedEvent {
  userId: string;
  changes: {
    email?: string;
    phoneNumber?: string;
    isVerified?: boolean;
  };
  updatedAt: Date;
}

export interface UserDeletedEvent {
  userId: string;
  deletedAt: Date;
}
