# @kelvan-api/contact

Server action and Zod schema for contact form submissions. Validates input and sends email notifications.

## Exports

- `./actions/contact-action` — server action that processes contact form submissions
- `./schema/contact-schema` — Zod schema validating name, email, and message fields

## Dependencies

- `@kelvan-core/next-safe-action` — type-safe action client
- `@kelvan-core/result` — result type error handling
- `@kelvan-integrations/email` — email sending
