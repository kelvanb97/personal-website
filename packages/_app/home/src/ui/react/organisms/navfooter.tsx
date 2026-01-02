"use client"

import { cn } from "@kelvan-design/ui/cn"
import { Accordion } from "@kelvan-design/ui/library/accordion"
import { Button } from "@kelvan-design/ui/library/button"
import { NavbarContainer } from "@kelvan-design/ui/library/navbar-container"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@kelvan-design/ui/library/sheet"
import { Logo } from "@kelvan-design/ui/logo"
import { MenuIcon } from "@kelvan-design/ui/lucide-icons"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import Link from "next/link"

export function NavbarFooter() {
	return (
		<>
			{/* Desktop */}
			<NavbarContainer className="fixed bottom-0 z-50 hidden lg:block bg-primary-foreground/80 backdrop-blur-md border-t border-white/10">
				<Button>start</Button>
			</NavbarContainer>
			{/* Mobile */}
			<NavbarContainer className="sticky top-0 z-50 block lg:hidden bg-background/10 backdrop-blur-md border-b border-white/10">
				<XStack className="items-center gap-4">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon">
								<MenuIcon className="size-4" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="overflow-y-auto">
							<SheetHeader>
								<SheetTitle>
									<Logo />
								</SheetTitle>
							</SheetHeader>
							<YStack className="gap-6 p-4">
								<Accordion
									type="single"
									collapsible
									className="flex w-full flex-col gap-4"
								>
									{MENU_ITEM_LIST.map((item) => (
										<MenuLink
											key={item.title}
											title={item.title}
											anchor={item.anchor}
										/>
									))}
								</Accordion>
							</YStack>
						</SheetContent>
					</Sheet>
				</XStack>
				<XStack className="items-end gap-4">
					<Link href="#generate-a-sample">
						<Button className="font-bold">Generate a sample</Button>
					</Link>
					<Button
						variant="outline"
						className="font-bold"
						onClick={() =>
							window.open(
								"https://cal.com/tanner-kelvan/15-min",
								"_blank",
							)
						}
					>
						Book a call
					</Button>
				</XStack>
			</NavbarContainer>
		</>
	)
}

interface TMenuItem {
	title: string
	anchor: string
	showUnreadIndicator?: boolean
}

const MENU_ITEM_LIST: TMenuItem[] = [
	{
		title: "Product",
		anchor: "#product",
	},
	{
		title: "How it works",
		anchor: "#how-it-works",
	},
	{
		title: "Pricing",
		anchor: "#pricing",
	},
	{
		title: "FAQ",
		anchor: "#faq",
	},
]

const MenuLink = ({
	anchor,
	title,
	isActive = false,
}: Omit<TMenuItem, "activeScreen"> & { isActive?: boolean }) => {
	return (
		<Link href={anchor} className="relative">
			<Button
				variant="nav"
				size="lg"
				className={cn("flex space-x-1 items-center", {
					"underline underline-offset-8 decoration-2 hover:no-underline":
						isActive,
				})}
			>
				{title}
			</Button>
		</Link>
	)
}
