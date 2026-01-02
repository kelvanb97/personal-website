import { useDesktopStore } from "#desktop-store"
import { DesktopItem } from "./desktop-item/desktop-item"
import { Resume } from "./window-content/resume"

interface IDesktopProps {
	viewportSize: { width: number; height: number }
}

export function Desktop({ viewportSize }: IDesktopProps) {
	const { items: desktopItems, activeWindowId } = useDesktopStore()

	return (
		<>
			<DesktopItem
				desktopItem={desktopItems["resume.pdf"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "resume.pdf"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["resume-2.pdf"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "resume-2.pdf"}
			>
				<Resume />
			</DesktopItem>
		</>
	)
}
