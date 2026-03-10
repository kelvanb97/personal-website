"use client"

import { getAnonId } from "#browser/get-anon-id"
import { trackAction, type ITrackActionProps } from "#next/actions/track-action"
import { usePathname } from "next/navigation"

export function useTrackAction(
	event: ITrackActionProps["event"],
	properties?: ITrackActionProps["properties"],
) {
	const pathname = usePathname()
	const anonId = getAnonId()

	return () =>
		void trackAction({
			anonId,
			event,
			properties: { ...properties, pathname },
		})
}
