"use client"

import { cn } from "@kelvan-design/ui/cn"
import { GithubIcon } from "@kelvan-design/ui/github-icon"
import { Button } from "@kelvan-design/ui/library/button"
import { NavbarContainer } from "@kelvan-design/ui/library/navbar-container"
import { RefreshCwIcon } from "@kelvan-design/ui/lucide-icons"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { useDesktopStore, type TDesktopItemId } from "#store/desktop-store"
import Image from "next/image"
import { useCallback, useMemo } from "react"

const GITHUB_URL = "https://github.com/kelvanb97"

interface INavbarFooterProps {
	className?: string
}

export function NavbarFooter({ className }: INavbarFooterProps) {
	const { items } = useDesktopStore()

	const minimizedItems = useMemo(
		() => Object.values(items).filter((item) => item.window.isMinimized),
		[items],
	)

	const isContactButtonDisabled = useMemo(() => {
		return items.contact.window.isOpen && !items.contact.window.isMinimized
	}, [items.contact.window.isOpen, items.contact.window.isMinimized])

	const handleMinimizedItemClick = useCallback((id: TDesktopItemId) => {
		useDesktopStore.getState().toggleMinimize(id)
	}, [])

	const handleContactClick = useCallback(() => {
		useDesktopStore.getState().openWindow("contact")
	}, [])

	const handleGithubClick = useCallback(() => {
		window.open(GITHUB_URL, "_blank")
	}, [])

	const handleReset = useCallback(() => {
		useDesktopStore.getState().reset()
	}, [])

	return (
		<NavbarContainer
			className={cn("fixed bottom-0 z-1 bg-accent", className)}
		>
			<XStack className="items-center justify-between w-full">
				<XStack className="justify-start items-center space-x-2">
					{minimizedItems.map((item) => (
						<Button
							key={item.id}
							variant="outline"
							size="sm"
							className="text-xs py-1"
							onClick={() => handleMinimizedItemClick(item.id)}
						>
							<Image
								src={item.iconSrc}
								alt={`${item.id} Icon`}
								width={16}
								height={16}
							/>
							{item.id}
						</Button>
					))}
				</XStack>
				<XStack className="justify-end items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="text-xs py-1"
						onClick={handleContactClick}
						disabled={isContactButtonDisabled}
					>
						<Image
							src="/assets/desktop-shortcut/email-icon.png"
							alt="Email Icon"
							width={16}
							height={16}
						/>
						Contact
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="text-xs py-1"
						onClick={handleGithubClick}
					>
						<GithubIcon />
						Github
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="text-xs py-1"
						onClick={handleReset}
					>
						<RefreshCwIcon />
						Reset
					</Button>
				</XStack>
			</XStack>
		</NavbarContainer>
	)
}
