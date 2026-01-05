import { useDesktopStore } from "#desktop-store"
import { DesktopItem } from "./desktop-item/desktop-item"
import { ProfilePic } from "./window-content/profile-pic"
import { Resume } from "./window-content/resume"

interface IDesktopProps {
	viewportSize: { width: number; height: number }
}

export function Desktop({ viewportSize }: IDesktopProps) {
	const { items: desktopItems, activeWindowId } = useDesktopStore()

	return (
		<>
			<DesktopItem
				desktopItem={desktopItems["profile-pic.jpg"]}
				iconSrc="/profile-pic.jpg"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "profile-pic.jpg"}
			>
				<ProfilePic />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["performance"]}
				iconSrc="/activity-monitor.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "performance"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["about"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "about"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["resume.pdf"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "resume.pdf"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["contact"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "contact"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["projects"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "projects"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["README.md"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "README.md"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["todos.txt"]}
				iconSrc="/pdf-file-icon.png"
				viewportSize={viewportSize}
				isWindowActive={activeWindowId === "todos.txt"}
			>
				<Resume />
			</DesktopItem>
		</>
	)
}
