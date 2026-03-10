# @kelvan-integrations/posthog-analytics

PostHog analytics provider implementation with server-side and browser-side clients.

## Exports

- `./track-action` — server action to capture events via `posthog-node`
- `./alias-action` — server action to alias user identities
- `./browser/client` — browser-side PostHog client wrapper

## Dependencies

- `posthog-js` — browser SDK
- `posthog-node` — server SDK
