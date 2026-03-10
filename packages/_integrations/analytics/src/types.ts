import type { EVENTS } from "#events"

export type TEvent = (typeof EVENTS)[keyof typeof EVENTS]
