# Gateway Rules

## General
- WebSocket connections must be authenticated.
- Prefer Socket.IO style event naming if project uses Socket.IO.
- Keep gateway logic thin; move reusable logic into services.

## Chat Gateway
- Support zone-scoped channels/rooms.
- Validate message length.
- Add basic rate limiting hooks.
- Keep persistence in service layer, not in gateway methods.

## Room Gateway
- Server authoritative only.
- Client sends actions/intents only.
- Room state must be serializable.
- Prepare for reconnect support.
- Keep room state handling separate from transport events.

## Event Design
Prefer stable event names, such as:
- `chat.joinZone`
- `chat.send`
- `chat.history`
- `room.create`
- `room.join`
- `room.submitAction`
- `room.syncState`

## Error Handling
- Emit structured error payloads
- Avoid exposing sensitive internal details
