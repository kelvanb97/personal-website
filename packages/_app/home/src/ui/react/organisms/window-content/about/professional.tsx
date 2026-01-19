import { Button } from "@kelvan-design/ui/library/button"
import { TextBody } from "@kelvan-design/ui/library/text"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useDesktopStore } from "#store/desktop-store"
import Image from "next/image"
import { useCallback } from "react"

export function Professional() {
	const handleViewProjects = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			e.stopPropagation()

			useDesktopStore.getState().openWindow("projects")
		},
		[],
	)

	const handleViewResume = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			e.stopPropagation()

			useDesktopStore.getState().openWindow("resume.pdf")
		},
		[],
	)

	return (
		<YStack className="space-y-24 py-16 mb-16 mx-auto">
			<YStack className="max-w-4xl mx-auto space-y-4 text-center">
				<TextBody
					size="5xl"
					variant="accent-foreground"
					className="text-center"
				>
					Professional
				</TextBody>
				<XStack className="justify-center space-x-4">
					<Button
						variant="outline"
						className="rounded-full"
						onClick={handleViewProjects}
					>
						<Image
							src="/assets/desktop-shortcut/folder.png"
							alt="Folder"
							width={24}
							height={24}
						/>
						View projects
					</Button>
					<Button
						variant="outline"
						className="rounded-full"
						onClick={handleViewResume}
					>
						<Image
							src="/assets/desktop-shortcut/pdf-file-icon.png"
							alt="Resume"
							width={24}
							height={24}
						/>
						View resume
					</Button>
				</XStack>
			</YStack>
			{/* HACK: space divider */}
			<div>&nbsp;</div>
		</YStack>
	)
}
