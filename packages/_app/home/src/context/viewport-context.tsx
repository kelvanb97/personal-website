import { useDesktopStore } from "#store/desktop-store"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

interface IViewportContext {
	viewport: {
		width: number
		height: number
	}
}

const ViewportContext = createContext<IViewportContext | undefined>(undefined)

ViewportContext.displayName = "ViewportContext"

interface IViewportProviderProps {
	containerRef: React.RefObject<HTMLDivElement | null>
	children: React.ReactNode
}

export const ViewportProvider = ({
	containerRef,
	children,
}: IViewportProviderProps) => {
	const [viewport, setViewport] = useState({ width: 0, height: 0 })

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const updateFromWindow = () => {
			const w = window.innerWidth
			const h = window.innerHeight
			setViewport((s) =>
				s.width === w && s.height === h ? s : { width: w, height: h },
			)
			useDesktopStore.getState().reset()
		}

		updateFromWindow()

		const ro = new ResizeObserver(() => {
			updateFromWindow()
		})

		ro.observe(el)
		window.addEventListener("resize", updateFromWindow)

		return () => {
			ro.disconnect()
			window.removeEventListener("resize", updateFromWindow)
		}
	}, [containerRef])

	const value: IViewportContext = useMemo(
		() => ({
			viewport,
		}),
		[viewport],
	)

	return (
		<ViewportContext.Provider value={value}>
			{children}
		</ViewportContext.Provider>
	)
}

export const useViewportContext = () => {
	const context = useContext(ViewportContext)

	if (context === undefined)
		throw new Error(
			"useViewportContext must be used within a ViewportProvider",
		)

	return context
}
