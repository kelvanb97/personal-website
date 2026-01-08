import { useDesktopStore } from "#store/desktop-store"
import { DesktopItem } from "./desktop-item/desktop-item"
import { Contact } from "./window-content/contact"
import { Performance } from "./window-content/performance"
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
				isWindowActive={activeWindowId === "profile-pic.jpg"}
				imageContainerClassName="border-accent-foreground border-2"
			>
				<ProfilePic />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["performance"]}
				isWindowActive={activeWindowId === "performance"}
			>
				<Performance />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["about"]}
				isWindowActive={activeWindowId === "about"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["resume.pdf"]}
				isWindowActive={activeWindowId === "resume.pdf"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["contact"]}
				isWindowActive={activeWindowId === "contact"}
			>
				<Contact />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["projects"]}
				isWindowActive={activeWindowId === "projects"}
			>
				<Resume />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["README.md"]}
				isWindowActive={activeWindowId === "README.md"}
			>
				<Readme />
			</DesktopItem>
			<DesktopItem
				desktopItem={desktopItems["todos"]}
				isWindowActive={activeWindowId === "todos"}
			>
				<Todos />
			</DesktopItem>
		</>
	)
}
