import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import Image from "next/image"

export function Games() {
	return (
		<YStack className="space-y-4 justify-center items-center max-w-4xl">
			<Dota2 />
		</YStack>
	)
}

function Dota2() {
	return (
		<XStack className="space-x-8">
			<Flex className="w-[400px] h-[400px] relative p-12">
				{/* top miter */}
				<div
					className="absolute top-0 right-0 w-[250px] h-6"
					style={{
						background:
							"linear-gradient(135deg, transparent 0%, var(--color-muted) 90%)",
						clipPath: `polygon(0 0, 100% 0, 100% 100%, 16px 100%)`,
					}}
				/>
				{/* right miter */}
				<div
					className="absolute top-0 right-0 w-6 h-[250px]"
					style={{
						background:
							"linear-gradient(45deg, transparent 0%, var(--color-muted) 90%)",
						clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 16px))`,
					}}
				/>
				{/* bottom miter */}
				<div
					className="absolute bottom-0 left-0 w-[250px] h-6"
					style={{
						background:
							"linear-gradient(45deg, var(--color-background) 0%, transparent 100%)",
						clipPath: `polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)`,
					}}
				/>
				{/* left miter */}
				<div
					className="absolute bottom-0 left-0 w-6 h-[250px]"
					style={{
						background:
							"linear-gradient(135deg, transparent 0%, var(--color-background) 95%)",
						clipPath: `polygon(0 0, 100% 16px, 100% 100%, 0 100%)`,
					}}
				/>
				<video
					src="/assets/videos/morphling.mov"
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
					className="w-full h-auto object-cover"
				/>
			</Flex>
			<YStack className="space-y-4">
				<Image
					src="/assets/dota-2.png"
					alt="Dota 2"
					width={300}
					height={300}
				/>
				<TextBody variant="accent-foreground">Dota 2</TextBody>
			</YStack>
		</XStack>
	)
}
