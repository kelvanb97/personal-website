# @kelvan-integrations/resend

Resend email provider implementation. Wraps the Resend SDK with result type error handling.

## Exports

- `resendSendEmail({ from, to, subject, html })` — send an email via Resend, returns `TResult`

## Dependencies

- `resend` — email API SDK
- `@kelvan-core/result` — result type
