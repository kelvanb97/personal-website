import { cn } from "@kelvan-design/ui/cn"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useViewportContext } from "#context/viewport-context"
import {
	useDesktopStore,
	type TDesktopItem,
	type TDesktopItemId,
} from "#store/desktop-store"
import Image from "next/image"
import { useCallback, useMemo, useRef, useState } from "react"

const PADDING = 16

const DESKTOP_SHORTCUT_WIDTH = 112
const DESKTOP_SHORTCUT_HEIGHT = 60

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const clamp = (v: number, min: number, max: number) =>
	Math.min(max, Math.max(min, v))

const rectsOverlap = (
	a: { x: number; y: number; w: number; h: number },
	b: { x: number; y: number; w: number; h: number },
) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

interface IDesktopShortcutProps {
	id: TDesktopItemId
	desktopShortcut: TDesktopItem["shortcut"]
	iconSrc: string
	desktopIconCoefficient?: number
	imageContainerClassName: string | undefined
}

export function DesktopShortcut({
	id,
	desktopShortcut,
	iconSrc,
	desktopIconCoefficient = 0.4,
	imageContainerClassName,
}: IDesktopShortcutProps) {
	const { viewport } = useViewportContext()
	const animRef = useRef<number | null>(null)

	const desktopIconSize = useMemo(
		() => DESKTOP_SHORTCUT_WIDTH * desktopIconCoefficient,
		[desktopIconCoefficient],
	)

	const { setShortcutPos, openWindow } = useMemo(
		() => useDesktopStore.getState(),
		[],
	)

	const [isHovered, setIsHovered] = useState(false)

	const onMouseEnter = useCallback(() => setIsHovered(true), [])
	const onMouseLeave = useCallback(() => setIsHovered(false), [])

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			openWindow(id)
		},
		[id, openWindow],
	)

	const dragRef = useRef<{
		pointerId: number
		startClientX: number
		startClientY: number
		startX: number
		startY: number
		currentX: number
		currentY: number
		raf: number | null
	} | null>(null)

	const onPointerDown = useCallback(
		(e: React.PointerEvent) => {
			e.preventDefault()
			e.stopPropagation()
			e.currentTarget.setPointerCapture(e.pointerId)

			dragRef.current = {
				pointerId: e.pointerId,
				startClientX: e.clientX,
				startClientY: e.clientY,
				startX: desktopShortcut.x,
				startY: desktopShortcut.y,
				currentX: desktopShortcut.x,
				currentY: desktopShortcut.y,
				raf: null,
			}
		},
		[desktopShortcut.x, desktopShortcut.y],
	)

	const onPointerMove = useCallback(
		(e: React.PointerEvent) => {
			const d = dragRef.current
			if (!d || e.pointerId !== d.pointerId) return

			const dx = e.clientX - d.startClientX
			const dy = e.clientY - d.startClientY

			const nextX = d.startX + dx
			const nextY = d.startY + dy

			if (d.raf) cancelAnimationFrame(d.raf)
			d.raf = requestAnimationFrame(() => {
				d.currentX = nextX
				d.currentY = nextY
				setShortcutPos(id, { x: nextX, y: nextY })
			})
		},
		[id, setShortcutPos],
	)

	const cancelAnim = useCallback(() => {
		if (animRef.current) cancelAnimationFrame(animRef.current)
		animRef.current = null
	}, [])

	const animateShortcutTo = useCallback(
		(
			from: { x: number; y: number },
			to: { x: number; y: number },
			durationMs = 180,
		) => {
			cancelAnim()

			const start = performance.now()
			const dx = to.x - from.x
			const dy = to.y - from.y

			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / durationMs)
				const e = easeOutCubic(t)

				setShortcutPos(id, {
					x: from.x + dx * e,
					y: from.y + dy * e,
				})

				if (t < 1) animRef.current = requestAnimationFrame(tick)
				else animRef.current = null
			}

			animRef.current = requestAnimationFrame(tick)
		},
		[id, cancelAnim, setShortcutPos],
	)

	const endDrag = useCallback(
		(e: React.PointerEvent) => {
			e.preventDefault()
			e.stopPropagation()
			const { items: allItems } = useDesktopStore.getState()

			const d = dragRef.current
			if (!d || e.pointerId !== d.pointerId) return

			try {
				e.currentTarget.releasePointerCapture(e.pointerId)
			} catch {
				// do nothing
			}

			if (d.raf) cancelAnimationFrame(d.raf)

			const maxX = Math.max(0, viewport.width - DESKTOP_SHORTCUT_WIDTH)
			const maxY = Math.max(0, viewport.height - DESKTOP_SHORTCUT_HEIGHT)

			const clampedX = clamp(d.currentX, PADDING, maxX - PADDING)
			const clampedY = clamp(d.currentY, PADDING, maxY - PADDING)

			const me = {
				x: clampedX,
				y: clampedY,
				w: DESKTOP_SHORTCUT_WIDTH,
				h: DESKTOP_SHORTCUT_HEIGHT,
			}

			const collides = Object.entries(allItems).some(
				([otherId, other]) => {
					if (otherId === id) return false
					const them = {
						x: other.shortcut.x,
						y: other.shortcut.y,
						w: DESKTOP_SHORTCUT_WIDTH,
						h: DESKTOP_SHORTCUT_HEIGHT,
					}
					return rectsOverlap(me, them)
				},
			)

			const target = collides
				? { x: d.startX, y: d.startY }
				: { x: clampedX, y: clampedY }

			const from = { x: d.currentX, y: d.currentY }

			if (from.x !== target.x || from.y !== target.y) {
				animateShortcutTo(from, target, 200)
			} else {
				setShortcutPos(id, target)
			}

			dragRef.current = null
		},
		[viewport, setShortcutPos, animateShortcutTo, id],
	)

	return (
		<YStack
			className={cn(
				"absolute",
				"touch-none select-none",
				"w-full h-full justify-center items-center space-y-1.5 cursor-pointer",
			)}
			style={{
				top: desktopShortcut.y,
				left: desktopShortcut.x,
				maxWidth: DESKTOP_SHORTCUT_WIDTH,
				maxHeight: DESKTOP_SHORTCUT_HEIGHT,
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={endDrag}
			onPointerCancel={endDrag}
			onLostPointerCapture={endDrag}
			onClick={handleClick}
		>
			{iconSrc && (
				<Flex className={imageContainerClassName}>
					<Image
						src={iconSrc}
						alt={id}
						width={desktopIconSize}
						height={desktopIconSize}
					/>
				</Flex>
			)}
			<Flex
				className={cn(
					"rounded-xs px-1",
					"bg-muted",
					isHovered && "bg-muted-foreground",
				)}
			>
				<TextBody
					size="xs"
					variant="accent-foreground"
					className="font-bold"
				>
					{id}
				</TextBody>
			</Flex>
		</YStack>
	)
}

DesktopShortcut.displayName = "DesktopShortcut"
