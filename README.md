# @damy-lunch/events

Shared event contracts for Damy Lunch microservices.

## Installation

```bash
npm install @damy-lunch/events
```

**Note:** Requires `.npmrc` configuration for GitHub Packages:
```
@damy-lunch:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Usage

### Publishing Events (matching-service, chat-service)

```typescript
import {
  NOTIFICATION_QUEUE,
  NOTIFICATION_PATTERNS,
  MatchCreatedEvent,
} from '@damy-lunch/events';

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
} from '@damy-lunch/events';

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

## Publishing to GitHub Packages

```bash
# Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish
```

## Versioning

- **Patch** (v1.0.x): Add optional fields, new events
- **Minor** (v1.x.0): Add required fields with defaults
- **Major** (vX.0.0): Breaking changes
