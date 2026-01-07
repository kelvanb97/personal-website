import { useDesktopStore } from "#store/desktop-store"
import { DesktopItem } from "./desktop-item/desktop-item"
import { ProfilePic } from "./window-content/profile-pic"
import { Readme } from "./window-content/readme"
import { Resume } from "./window-content/resume"
import { Todos } from "./window-content/todos"

export function Desktop() {
	const { items: desktopItems, activeWindowId } = useDesktopStore()

	return (
		<>
			<DesktopItem
				desktopItem={desktopItems["profile-pic.jpg"]}
				iconSrc="/profile-pic.jpg"
				isWindowActive={activeWindowId === "profile-pic.jpg"}
				imageContainerClassName="border-accent-foreground border-2"
			>
				<ProfilePic />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["performance"]}
				iconSrc="/activity-monitor.png"
				isWindowActive={activeWindowId === "performance"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["about"]}
				iconSrc="/k-square.png"
				isWindowActive={activeWindowId === "about"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["resume.pdf"]}
				iconSrc="/pdf-file-icon.png"
				isWindowActive={activeWindowId === "resume.pdf"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["contact"]}
				iconSrc="/email-icon.png"
				isWindowActive={activeWindowId === "contact"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["projects"]}
				iconSrc="/folder.png"
				isWindowActive={activeWindowId === "projects"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["README.md"]}
				iconSrc="/md-icon.png"
				isWindowActive={activeWindowId === "README.md"}
			>
				<Readme />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["todos"]}
				iconSrc="/notes.png"
				isWindowActive={activeWindowId === "todos"}
			>
				<Todos />
			</DesktopItem>
		</>
	)
}
