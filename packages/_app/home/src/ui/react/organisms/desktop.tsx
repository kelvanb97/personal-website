import { useDesktopStore } from "#desktop-store"
import { DesktopItem } from "./desktop-item/desktop-item"

interface IDesktopProps {
	viewportSize: { width: number; height: number }
}

export function Desktop({ viewportSize }: IDesktopProps) {
	const desktopItems = useDesktopStore((s) => s.items)

	return (
		<>
			<DesktopItem
				desktopItem={desktopItems["resume.pdf"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
			/>
			<DesktopItem
				desktopItem={desktopItems["resume-2.pdf"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
			/>
		</>
	)
}
