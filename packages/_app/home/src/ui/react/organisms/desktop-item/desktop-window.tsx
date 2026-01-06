import { cn } from "@kelvan-design/ui/cn"
import { TextBody } from "@kelvan-design/ui/library/text"
import {
	MaximizeIcon,
	MinimizeIcon,
	MinusIcon,
	XIcon,
} from "@kelvan-design/ui/lucide-icons"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useViewportContext } from "#context/viewport-context"
import {
	useDesktopStore,
	type TDesktopItem,
	type TDesktopItemId,
} from "#store/desktop-store"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const MIN_W = 360
const MIN_H = 240
const EDGE = 8
const CORNER = 14

type TResizeDir = "right" | "left" | "bottom" | "bottom-right" | "bottom-left"

type TRect = { x: number; y: number; width: number; height: number }
type TAnim = null | "closing" | "minimizing" | "maximizing" | "restoring"

const clamp = (v: number, min: number, max: number) =>
	Math.min(max, Math.max(min, v))

const rectFromStore = (
	w: TDesktopItem["window"],
	viewport: { width: number; height: number },
): TRect => {
	if (w.isMaximized)
		return { x: 0, y: 0, width: viewport.width, height: viewport.height }
	return { x: w.x, y: w.y, width: w.width, height: w.height }
}

interface IDesktopWindowProps {
	id: TDesktopItemId
	desktopWindow: TDesktopItem["window"]
	isWindowActive: boolean
	children: React.ReactNode
}

export function DesktopWindow({
	id,
	desktopWindow,
	isWindowActive,
	children,
}: IDesktopWindowProps) {
	const { viewport } = useViewportContext()
	const store = useMemo(() => useDesktopStore.getState(), [])
	const [anim, setAnim] = useState<TAnim>(null)
	const [visualRect, setVisualRect] = useState<TRect>(() =>
		rectFromStore(desktopWindow, viewport),
	)

	const resizeRef = useRef<{
		pointerId: number
		dir: TResizeDir
		startClientX: number
		startClientY: number
		startRect: TRect
		currentRect: TRect
		raf: number | null
	} | null>(null)

	const transitionDoneRef = useRef(false)
	const dragRef = useRef<{
		pointerId: number
		startClientX: number
		startClientY: number
		startX: number
		startY: number
		w: number
		h: number
		currentX: number
		currentY: number
		raf: number | null
	} | null>(null)

	const applyRect = useCallback(
		(r: TRect) => {
			setVisualRect(r)
			store.setWindowPos(id, { x: r.x, y: r.y })
			store.setWindowSize(id, { width: r.width, height: r.height })
		},
		[id, store],
	)

	const computeResizeRect = useCallback(
		(dir: TResizeDir, start: TRect, dx: number, dy: number): TRect => {
			const maxX = viewport.width
			const maxY = viewport.height

			// start with original
			let x = start.x
			let y = start.y
			let w = start.width
			let h = start.height

			if (dir === "right" || dir === "bottom-right") {
				const maxW = Math.max(MIN_W, maxX - x)
				w = clamp(start.width + dx, MIN_W, maxW)
			}

			if (
				dir === "bottom" ||
				dir === "bottom-right" ||
				dir === "bottom-left"
			) {
				const maxH = Math.max(MIN_H, maxY - y)
				h = clamp(start.height + dy, MIN_H, maxH)
			}

			if (dir === "left" || dir === "bottom-left") {
				const right = start.x + start.width
				const nextX = clamp(start.x + dx, 0, right - MIN_W)
				x = nextX
				w = clamp(right - nextX, MIN_W, maxX - x)
			}

			x = clamp(x, 0, Math.max(0, maxX - w))
			y = clamp(y, 0, Math.max(0, maxY - h))

			return { x, y, width: w, height: h }
		},
		[viewport.width, viewport.height],
	)

	const startResize = useCallback(
		(dir: TResizeDir) => (e: React.PointerEvent) => {
			if (anim) return
			if (desktopWindow.isMaximized) return

			e.preventDefault()
			e.stopPropagation()
			e.currentTarget.setPointerCapture(e.pointerId)

			store.setActiveWindow(id)
			store.bringToFront(id)

			const startRect = visualRect

			resizeRef.current = {
				pointerId: e.pointerId,
				dir,
				startClientX: e.clientX,
				startClientY: e.clientY,
				startRect,
				currentRect: startRect,
				raf: null,
			}
		},
		[anim, desktopWindow.isMaximized, id, store, visualRect],
	)

	const onResizeMove = useCallback(
		(e: React.PointerEvent) => {
			const r = resizeRef.current
			if (!r || e.pointerId !== r.pointerId) return

			e.preventDefault()
			e.stopPropagation()

			const dx = e.clientX - r.startClientX
			const dy = e.clientY - r.startClientY

			const next = computeResizeRect(r.dir, r.startRect, dx, dy)
			r.currentRect = next

			if (r.raf) cancelAnimationFrame(r.raf)
			r.raf = requestAnimationFrame(() => applyRect(next))
		},
		[applyRect, computeResizeRect],
	)

	const endResize = useCallback(
		(e: React.PointerEvent) => {
			const r = resizeRef.current
			if (!r || e.pointerId !== r.pointerId) return

			e.preventDefault()
			e.stopPropagation()

			try {
				e.currentTarget.releasePointerCapture(e.pointerId)
			} catch {
				// do nothing
			}

			if (r.raf) cancelAnimationFrame(r.raf)

			applyRect(r.currentRect)

			resizeRef.current = null
		},
		[applyRect],
	)

	const onPointerDown = useCallback(
		(e: React.PointerEvent) => {
			if (anim) return
			if (desktopWindow.isMaximized) return

			e.preventDefault()
			e.stopPropagation()
			e.currentTarget.setPointerCapture(e.pointerId)

			dragRef.current = {
				pointerId: e.pointerId,
				startClientX: e.clientX,
				startClientY: e.clientY,
				startX: desktopWindow.x,
				startY: desktopWindow.y,
				w: visualRect.width,
				h: visualRect.height,
				currentX: desktopWindow.x,
				currentY: desktopWindow.y,
				raf: null,
			}
		},
		[
			anim,
			desktopWindow.isMaximized,
			desktopWindow.x,
			desktopWindow.y,
			visualRect.width,
			visualRect.height,
		],
	)

	const onPointerMove = useCallback(
		(e: React.PointerEvent) => {
			e.preventDefault()
			e.stopPropagation()

			const d = dragRef.current
			if (!d || e.pointerId !== d.pointerId) return

			const dx = e.clientX - d.startClientX
			const dy = e.clientY - d.startClientY

			const maxX = Math.max(0, viewport.width - d.w)
			const maxY = Math.max(0, viewport.height - d.h)

			const nextX = clamp(d.startX + dx, 0, maxX)
			const nextY = clamp(d.startY + dy, 0, maxY)

			if (d.raf) cancelAnimationFrame(d.raf)
			d.raf = requestAnimationFrame(() => {
				d.currentX = nextX
				d.currentY = nextY
				store.setWindowPos(id, { x: nextX, y: nextY })
				setVisualRect((r) => ({ ...r, x: nextX, y: nextY }))
			})
		},
		[id, store, viewport.width, viewport.height],
	)

	const endDrag = useCallback((e: React.PointerEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const d = dragRef.current
		if (!d || e.pointerId !== d.pointerId) return

		try {
			e.currentTarget.releasePointerCapture(e.pointerId)
		} catch {
			// do nothing
		}

		if (d.raf) cancelAnimationFrame(d.raf)
		dragRef.current = null
	}, [])

	// NOTE: keep visual rect in sync with store when we're NOT animating
	useEffect(() => {
		if (anim) return
		setVisualRect(rectFromStore(desktopWindow, viewport))
	}, [anim, desktopWindow, viewport])

	const handleFocus = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			store.setActiveWindow(id)
			store.bringToFront(id)
		},
		[id, store],
	)

	const startMaximizeToggle = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()

			transitionDoneRef.current = false
			const goingToMax = !desktopWindow.isMaximized

			setAnim(goingToMax ? "maximizing" : "restoring")

			// next frame -> trigger transition
			requestAnimationFrame(() => {
				setVisualRect(
					goingToMax
						? {
								x: 0,
								y: 0,
								width: viewport.width,
								height: viewport.height,
							}
						: {
								x: desktopWindow.x,
								y: desktopWindow.y,
								width: desktopWindow.width,
								height: desktopWindow.height,
							},
				)
			})
		},
		[
			desktopWindow.isMaximized,
			desktopWindow.x,
			desktopWindow.y,
			desktopWindow.width,
			desktopWindow.height,
			viewport.width,
			viewport.height,
		],
	)

	const startMinimize = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setAnim("minimizing")
	}, [])

	const startClose = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setAnim("closing")
	}, [])

	if (
		(!desktopWindow.isOpen && anim === null) ||
		(desktopWindow.isMinimized && anim === null)
	)
		return null

	const isTransitioning = anim === "maximizing" || anim === "restoring"
	const isMinimizing = anim === "minimizing"
	const isClosing = anim === "closing"

	return (
		<Flex
			className="absolute"
			style={{
				top: visualRect.y,
				left: visualRect.x,
				width: visualRect.width,
				height: visualRect.height,
				zIndex: desktopWindow.zIndex,
			}}
		>
			<YStack
				className={cn(
					"w-full h-full",
					"rounded-lg border border-border bg-card overflow-hidden",
					isTransitioning && "window-transition",
					isMinimizing && "window-minimize",
					isClosing && "window-exit",
				)}
				onClick={handleFocus}
				onTransitionEnd={(e) => {
					if (!isTransitioning) return
					if (transitionDoneRef.current) return
					if (
						e.propertyName !== "width" &&
						e.propertyName !== "height"
					)
						return
					transitionDoneRef.current = true
					store.toggleMaximize(id)
					setAnim(null)
				}}
				onAnimationEnd={() => {
					if (isMinimizing) {
						store.toggleMinimize(id)
						setAnim(null)
					}
					if (isClosing) {
						store.closeWindow(id)
						setAnim(null)
					}
				}}
			>
				<TitleBar
					id={id}
					isWindowActive={isWindowActive}
					isWindowMaximized={desktopWindow.isMaximized}
					onToggleMaximize={startMaximizeToggle}
					onMinimize={startMinimize}
					onClose={startClose}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					endDrag={endDrag}
				/>
				{children}
				{!desktopWindow.isMaximized && anim === null && (
					<>
						{/* right edge */}
						<div
							className="absolute top-0 right-0 h-full z-10 touch-none translate-x-1/2"
							style={{ width: EDGE, cursor: "ew-resize" }}
							onPointerDown={startResize("right")}
							onPointerMove={onResizeMove}
							onPointerUp={endResize}
							onPointerCancel={endResize}
							onLostPointerCapture={endResize}
						/>
						{/* left edge */}
						<div
							className="absolute top-0 left-0 h-full z-10 touch-none -translate-x-1/2"
							style={{ width: EDGE, cursor: "ew-resize" }}
							onPointerDown={startResize("left")}
							onPointerMove={onResizeMove}
							onPointerUp={endResize}
							onPointerCancel={endResize}
							onLostPointerCapture={endResize}
						/>
						{/* bottom edge */}
						<div
							className="absolute left-0 bottom-0 w-full z-10 touch-none translate-y-1/2"
							style={{ height: EDGE, cursor: "ns-resize" }}
							onPointerDown={startResize("bottom")}
							onPointerMove={onResizeMove}
							onPointerUp={endResize}
							onPointerCancel={endResize}
							onLostPointerCapture={endResize}
						/>
						{/* bottom right */}
						<div
							className="absolute bottom-0 right-0 z-20 touch-none translate-y-1/2 translate-x-1/2"
							style={{
								width: CORNER,
								height: CORNER,
								cursor: "nwse-resize",
							}}
							onPointerDown={startResize("bottom-right")}
							onPointerMove={onResizeMove}
							onPointerUp={endResize}
							onPointerCancel={endResize}
							onLostPointerCapture={endResize}
						/>
						{/* bottom left */}
						<div
							className="absolute bottom-0 left-0 z-20 touch-none"
							style={{
								width: CORNER,
								height: CORNER,
								cursor: "nesw-resize",
							}}
							onPointerDown={startResize("bottom-left")}
							onPointerMove={onResizeMove}
							onPointerUp={endResize}
							onPointerCancel={endResize}
							onLostPointerCapture={endResize}
						/>
					</>
				)}
			</YStack>
		</Flex>
	)
}

interface ITitleBarProps {
	id: string
	isWindowActive: boolean
	isWindowMaximized: boolean
	onToggleMaximize: (e: React.MouseEvent) => void
	onMinimize: (e: React.MouseEvent) => void
	onClose: (e: React.MouseEvent) => void
	onPointerDown: (e: React.PointerEvent) => void
	onPointerMove: (e: React.PointerEvent) => void
	endDrag: (e: React.PointerEvent) => void
}

function TitleBar({
	id,
	isWindowActive,
	isWindowMaximized,
	onToggleMaximize,
	onMinimize,
	onClose,
	onPointerDown,
	onPointerMove,
	endDrag,
}: ITitleBarProps) {
	const [isControlsHovered, setIsControlsHovered] = useState(false)

	const onMouseEnterControls = useCallback(
		() => setIsControlsHovered(true),
		[],
	)
	const onMouseLeaveControls = useCallback(
		() => setIsControlsHovered(false),
		[],
	)

	return (
		<XStack
			className={cn(
				"justify-between items-center border-b border-border",
				isWindowMaximized || !isWindowActive
					? "cursor-default"
					: "cursor-move",
				isWindowActive ? "bg-accent" : "bg-accent/50",
			)}
		>
			<Flex
				className="flex-1 px-3"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={endDrag}
				onPointerCancel={endDrag}
				onLostPointerCapture={endDrag}
			>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="font-bold py-2"
				>
					{id}
				</TextBody>
			</Flex>
			{isWindowActive ? (
				<XStack
					className="space-x-2.5 pl-6 pr-3 h-full items-center cursor-default bg-card border-border"
					style={{
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 16px 100%)",
					}}
					onMouseEnter={onMouseEnterControls}
					onMouseLeave={onMouseLeaveControls}
				>
					<Flex
						className="w-3.5 h-3.5 bg-green-500 rounded-full items-center justify-center"
						onClick={onToggleMaximize}
					>
						{isControlsHovered ? (
							isWindowMaximized ? (
								<MinimizeIcon className="w-2.5 h-2.5 text-black/90" />
							) : (
								<MaximizeIcon className="w-2.5 h-2.5 text-black/90" />
							)
						) : null}
					</Flex>
					<Flex
						className="w-3.5 h-3.5 bg-yellow-500 rounded-full items-center justify-center"
						onClick={onMinimize}
					>
						{isControlsHovered && (
							<MinusIcon className="w-2.5 h-2.5 text-black/90" />
						)}
					</Flex>
					<Flex
						className="w-3.5 h-3.5 bg-red-400 rounded-full items-center justify-center"
						onClick={onClose}
					>
						{isControlsHovered && (
							<XIcon className="w-2.5 h-2.5 text-black/90" />
						)}
					</Flex>
				</XStack>
			) : (
				<XStack className="space-x-2.5 px-3 py-2">
					<Flex className="w-3.5 h-3.5 bg-gray-500 rounded-full" />
					<Flex className="w-3.5 h-3.5 bg-gray-500 rounded-full" />
					<Flex className="w-3.5 h-3.5 bg-gray-500 rounded-full" />
				</XStack>
			)}
		</XStack>
	)
}
