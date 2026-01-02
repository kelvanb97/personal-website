"use client"

import { type TDesktopItem } from "#desktop-store"
import { memo } from "react"
import { DesktopShortcut } from "./desktop-shortcut"

interface IDesktopItemProps {
	desktopItem: TDesktopItem
	iconSrc: string
	viewportSize: { width: number; height: number }
}

export const DesktopItem = memo(
	({ desktopItem, iconSrc, viewportSize }: IDesktopItemProps) => {
		return (
			<DesktopShortcut
				id={desktopItem.id}
				desktopShortcut={desktopItem.shortcut}
				iconSrc={iconSrc}
				viewportSize={viewportSize}
			/>
		)
	},
)

DesktopItem.displayName = "DesktopItem"
