# @lunch-app/events

Shared event contracts for lunch-app microservices.

## Installation

```bash
# Using git dependency
npm install git+https://github.com/yourorg/lunch-events.git#v1.0.0
```

## Usage

### Publishing Events (matching-service, chat-service)

```typescript
import {
  NOTIFICATION_QUEUE,
  NOTIFICATION_PATTERNS,
  MatchCreatedEvent,
} from '@lunch-app/events';

// Configure RabbitMQ client to use NOTIFICATION_QUEUE
ClientsModule.register([{
  name: 'NOTIFICATION_CLIENT',
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: NOTIFICATION_QUEUE,
    queueOptions: { durable: true },
  },
}]);

// Emit events using correct patterns
const event: MatchCreatedEvent = {
  eventType: 'match.created',
  matchId: '123',
  user1Id: 'u1',
  user1Name: 'Alice',
  user2Id: 'u2',
  user2Name: 'Bob',
  createdAt: new Date().toISOString(),
};

this.notificationClient.emit(NOTIFICATION_PATTERNS.MATCH_CREATED, event);
```

### Consuming Events (notification-service)

```typescript
import {
  NOTIFICATION_PATTERNS,
  MatchCreatedEvent,
} from '@lunch-app/events';

@EventPattern(NOTIFICATION_PATTERNS.MATCH_CREATED)
async handleMatchCreated(@Payload() event: MatchCreatedEvent) {
  // Handle event
}
```

## Available Events

| Pattern                      | Interface            | Source           |
| ---------------------------- | -------------------- | ---------------- |
| `match.created`              | `MatchCreatedEvent`  | matching-service |
| `invite.received`            | `InviteReceivedEvent`| matching-service |
| `invite.approved`            | `InviteApprovedEvent`| matching-service |
| `conversation.member.joined` | `MemberJoinedEvent`  | matching-service |
| `message.created`            | `MessageCreatedEvent`| chat-service     |

## Versioning

- **Patch** (v1.0.x): Add optional fields, new events
- **Minor** (v1.x.0): Add required fields with defaults
- **Major** (vX.0.0): Breaking changes
