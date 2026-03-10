# @kelvan-app/analytics

Analytics abstraction layer over PostHog. Provides server actions, client hooks, and browser utilities with automatic development mode bypass.

## Exports

- `./track-action` — server action to track events
- `./alias-action` — server action to alias user identities
- `./use-track-action` — React hook for tracking events
- `./browser/get-anon-id` — get anonymous user ID
- `./browser/instrumentation-client` — browser-side instrumentation
- `./types` — analytics type definitions

## Dependencies

- `@kelvan-integrations/posthog-analytics` — PostHog provider
- `@kelvan-shared/consts` — `IGNORE_LOCAL_TRACKING` flag
