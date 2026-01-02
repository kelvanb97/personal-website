"use client"

import { type TDesktopItem } from "#desktop-store"
import { memo } from "react"
import { DesktopShortcut } from "./desktop-shortcut"
import { DesktopWindow } from "./desktop-window"

interface IDesktopItemProps {
	desktopItem: TDesktopItem
	iconSrc: string
	viewportSize: { width: number; height: number }
	isWindowActive: boolean
	children: React.ReactNode
}

export const DesktopItem = memo(
	({
		desktopItem,
		iconSrc,
		viewportSize,
		isWindowActive,
		children,
	}: IDesktopItemProps) => {
		return (
			<>
				<DesktopShortcut
					id={desktopItem.id}
					desktopShortcut={desktopItem.shortcut}
					iconSrc={iconSrc}
					viewportSize={viewportSize}
				/>
				<DesktopWindow
					id={desktopItem.id}
					desktopWindow={desktopItem.window}
					viewportSize={viewportSize}
					isWindowActive={isWindowActive}
				>
					{children}
				</DesktopWindow>
			</>
		)
	},
)

DesktopItem.displayName = "DesktopItem"
