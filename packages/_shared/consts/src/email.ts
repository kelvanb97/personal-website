/**
 * NOTE: This is a hacky but simple way to avoid
 * sending emails in local development events.
 *
 * This will throw a build error if set to `false`
 * making sure that we don't accidentally enable
 * local email sending.
 */
// eslint-disable-next-line @typescript-eslint/prefer-as-const
const _IGNORE_LOCAL_EMAILS: true = true
export const IGNORE_LOCAL_EMAILS: boolean =
	_IGNORE_LOCAL_EMAILS && process.env["NODE_ENV"] === "development"
