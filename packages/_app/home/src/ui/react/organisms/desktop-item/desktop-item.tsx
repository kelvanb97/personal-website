"use client"

import { type TDesktopItem } from "#store/desktop-store"
import { memo } from "react"
import { DesktopShortcut } from "./desktop-shortcut"
import { DesktopWindow } from "./desktop-window"

interface IDesktopItemProps {
	desktopItem: TDesktopItem
	iconSrc: string
	isWindowActive: boolean
	children: React.ReactNode
}

export const DesktopItem = memo(
	({ desktopItem, iconSrc, isWindowActive, children }: IDesktopItemProps) => {
		return (
			<>
				<DesktopShortcut
					id={desktopItem.id}
					desktopShortcut={desktopItem.shortcut}
					iconSrc={iconSrc}
				/>
				<DesktopWindow
					id={desktopItem.id}
					desktopWindow={desktopItem.window}
					isWindowActive={isWindowActive}
				>
					{children}
				</DesktopWindow>
			</>
		)
	},
)

DesktopItem.displayName = "DesktopItem"
