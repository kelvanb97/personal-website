/**
 * NOTE: This is a hacky but simple way to avoid
 * tracking local development events.
 *
 * This will throw a build error if set to `false`
 * making sure that we don't accidentally enable
 * local analytics tracking.
 */
// eslint-disable-next-line @typescript-eslint/prefer-as-const
const _IGNORE_LOCAL_TRACKING: true = true
export const IGNORE_LOCAL_TRACKING: boolean =
	_IGNORE_LOCAL_TRACKING && process.env["NODE_ENV"] === "development"
