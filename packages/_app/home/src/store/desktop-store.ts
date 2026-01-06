import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type TDesktopItemId =
	| "performance"
	| "profile-pic.jpg"
	| "about"
	| "resume.pdf"
	| "contact"
	| "projects"
	| "README.md"
	| "todos"

export type TShortcutState = {
	x: number
	y: number
}

export type TWindowState = {
	isOpen: boolean
	isMinimized: boolean
	isMaximized: boolean
	x: number
	y: number
	width: number
	height: number
	zIndex: number
}

export type TDesktopItem = {
	id: TDesktopItemId
	shortcut: TShortcutState
	window: TWindowState
}

type TDesktopState = {
	items: Record<TDesktopItemId, TDesktopItem>
	activeWindowId: TDesktopItemId | null
	nextZIndex: number
}

type TDesktopActions = {
	setShortcutPos: (id: TDesktopItemId, pos: Partial<TShortcutState>) => void
	openWindow: (id: TDesktopItemId) => void
	closeWindow: (id: TDesktopItemId) => void
	toggleMinimize: (id: TDesktopItemId) => void
	toggleMaximize: (id: TDesktopItemId) => void
	setWindowPos: (
		id: TDesktopItemId,
		pos: Partial<Pick<TWindowState, "x" | "y">>,
	) => void
	setWindowSize: (
		id: TDesktopItemId,
		size: Partial<Pick<TWindowState, "width" | "height">>,
	) => void
	bringToFront: (id: TDesktopItemId) => void
	setActiveWindow: (id: TDesktopItemId) => void
	reset: () => void
}

const initialState: TDesktopState = {
	items: {
		// column 1
		"profile-pic.jpg": {
			id: "profile-pic.jpg",
			shortcut: {
				x: 50,
				y: 50,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 100,
				y: 100,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
		performance: {
			id: "performance",
			shortcut: {
				x: 50,
				y: 150,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 100,
				y: 100,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
		about: {
			id: "about",
			shortcut: {
				x: 50,
				y: 250,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 120,
				y: 120,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
		contact: {
			id: "contact",
			shortcut: {
				x: 50,
				y: 350,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 140,
				y: 140,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
		"resume.pdf": {
			id: "resume.pdf",
			shortcut: {
				x: 50,
				y: 450,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 100,
				y: 100,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
		//column 2
		projects: {
			id: "projects",
			shortcut: {
				x: 200,
				y: 50,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 160,
				y: 160,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
		"README.md": {
			id: "README.md",
			shortcut: {
				x: 200,
				y: 150,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 180,
				y: 180,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
		todos: {
			id: "todos",
			shortcut: {
				x: 200,
				y: 250,
			},
			window: {
				isOpen: false,
				isMinimized: false,
				isMaximized: false,
				x: 200,
				y: 200,
				width: 800,
				height: 600,
				zIndex: 1,
			},
		},
	},
	activeWindowId: null,
	nextZIndex: 2,
}

export const useDesktopStore = create<TDesktopState & TDesktopActions>()(
	persist(
		(set) => ({
			...initialState,
			setShortcutPos: (id, pos) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					return {
						items: {
							...s.items,
							[id]: {
								...item,
								shortcut: { ...item.shortcut, ...pos },
							},
						},
					}
				}),
			bringToFront: (id) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					const z = s.nextZIndex
					return {
						nextZIndex: z + 1,
						activeWindowId: id,
						items: {
							...s.items,
							[id]: {
								...item,
								window: { ...item.window, zIndex: z },
							},
						},
					}
				}),
			setActiveWindow: (id) => set(() => ({ activeWindowId: id })),
			openWindow: (id) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					const z = s.nextZIndex
					return {
						nextZIndex: z + 1,
						activeWindowId: id,
						items: {
							...s.items,
							[id]: {
								...item,
								window: {
									...item.window,
									isOpen: true,
									isMinimized: false,
									zIndex: z,
								},
							},
						},
					}
				}),
			closeWindow: (id) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					return {
						activeWindowId:
							s.activeWindowId === id ? null : s.activeWindowId,
						items: {
							...s.items,
							[id]: {
								...item,
								window: {
									...item.window,
									isOpen: false,
									isMinimized: false,
									isMaximized: false,
								},
							},
						},
					}
				}),
			toggleMinimize: (id) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					const nextMin = !item.window.isMinimized
					return {
						activeWindowId:
							nextMin && s.activeWindowId === id
								? null
								: s.activeWindowId,
						items: {
							...s.items,
							[id]: {
								...item,
								window: {
									...item.window,
									isMinimized: nextMin,
									isOpen: true,
								},
							},
						},
					}
				}),
			toggleMaximize: (id) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					const nextMax = !item.window.isMaximized
					return {
						items: {
							...s.items,
							[id]: {
								...item,
								window: {
									...item.window,
									isMaximized: nextMax,
									isOpen: true,
									isMinimized: false,
								},
							},
						},
					}
				}),
			setWindowPos: (id, pos) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					return {
						items: {
							...s.items,
							[id]: {
								...item,
								window: { ...item.window, ...pos },
							},
						},
					}
				}),
			setWindowSize: (id, size) =>
				set((s) => {
					const item = s.items[id]
					if (!item) return s
					return {
						items: {
							...s.items,
							[id]: {
								...item,
								window: { ...item.window, ...size },
							},
						},
					}
				}),
			reset: () => set(() => ({ ...initialState })),
		}),
		{
			name: "desktop-store",
			// NOTE: Next.js friendly: don’t touch localStorage on the server
			storage: createJSONStorage(() =>
				typeof window === "undefined"
					? ({} as unknown as Storage)
					: window.localStorage,
			),
		},
	),
)

export const useDesktopItem = (id: TDesktopItemId) =>
	useDesktopStore((s) => s.items[id])
