# @kelvan-integrations/email

Application-level email service with template rendering and from-address validation. Skips sending in development mode.

## Exports

- `sendEmail({ from, to, template })` — send an email with a rendered template, returns `TResult`

## Dependencies

- `@kelvan-integrations/resend` — Resend email provider
- `@kelvan-core/dates` — date formatting for templates
- `@kelvan-core/result` — result type
- `@kelvan-shared/consts` — `IGNORE_LOCAL_EMAILS` flag
