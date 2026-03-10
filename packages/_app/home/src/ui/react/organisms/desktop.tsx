import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@kelvan-design/ui/library/dialog"
import { useViewportContext } from "#context/viewport-context"
import { useDesktopStore } from "#store/desktop-store"
import { useCallback, useState } from "react"
import { DesktopItem } from "./desktop-item/desktop-item"
import { About } from "./window-content/about/about"
import { Bundle } from "./window-content/bundle"
import { Contact } from "./window-content/contact"
import { Performance } from "./window-content/performance"
import { ProfilePic } from "./window-content/profile-pic"
import { Projects } from "./window-content/projects/projects"
import { Readme } from "./window-content/readme"
import { Resume } from "./window-content/resume"
import { Todos } from "./window-content/todos"

export function Desktop() {
	const { isMobile } = useViewportContext()
	const { items: desktopItems, activeWindowId } = useDesktopStore()

	return (
		<>
			{isMobile && <MobileModal />}
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
				<About />
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
				<Projects />
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
			<DesktopItem
				desktopItem={desktopItems["bundle-analysis"]}
				isWindowActive={activeWindowId === "bundle-analysis"}
			>
				<Bundle />
			</DesktopItem>
		</>
	)
}

function MobileModal() {
	const [isOpen, setIsOpen] = useState(true)
	const onClose = useCallback(() => setIsOpen(false), [])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				showCloseButton
				className="overflow-y-auto max-h-[90vh]"
			>
				<DialogHeader>
					<DialogTitle>Not optimized for mobile devices</DialogTitle>
					<DialogDescription>
						You can try, but this site is not optimized for mobile
						devices. Please use a desktop or laptop for the best
						experience.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
