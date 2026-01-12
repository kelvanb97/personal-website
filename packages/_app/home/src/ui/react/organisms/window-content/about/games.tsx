import { cn } from "@kelvan-design/ui/cn"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import Image from "next/image"
import { useCallback, useState } from "react"

export function Games() {
	return (
		<YStack className="space-y-24 py-16 mb-16 max-w-4xl">
			<YStack className="space-y-4 text-center">
				<TextBody size="5xl" variant="accent-foreground">
					Games
				</TextBody>
				<TextBody
					variant="accent-foreground"
					className="text-center px-16"
				>
					I tend to enjoy games that are strategic but also notably
					difficult. I don't game as much as I used to, but I still
					appreciate playing a good game from time to time. Here is a
					list of my favorite games I have played in the past ~15
					years, in no particular order.
				</TextBody>
			</YStack>
			<Dota2 />
			<SlayTheSpire />
			<Chess />
			<DarkSouls />
			<Terraria />
			<Doom />
			{/* HACK: space divider */}
			<div>&nbsp;</div>
		</YStack>
	)
}

function Dota2() {
	return (
		<XStack className="space-x-8">
			<MiterWindow link="https://www.dota2.com/">
				<video
					src="/assets/videos/morphling.mov"
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
					className="w-full h-auto object-cover"
				/>
			</MiterWindow>
			<YStack className="space-y-4">
				<TextBody size="5xl" variant="accent-foreground">
					Dota 2
				</TextBody>
				<TextBody variant="accent-foreground">
					Real-time strategy disguised as chaos. You're constantly
					making decisions with incomplete information: lane matchups,
					power spikes, vision, itemization, and timing windows. Then
					coordinating those decisions with four other humans who are
					doing the same.
				</TextBody>
				<TextBody variant="accent-foreground">
					It rewards pattern recognition and communication as much as
					mechanics.
				</TextBody>
			</YStack>
		</XStack>
	)
}

function SlayTheSpire() {
	return (
		<XStack className="space-x-8">
			<YStack className="space-y-4">
				<TextBody size="5xl" variant="accent-foreground">
					Slay The Spire
				</TextBody>
				<TextBody variant="accent-foreground">
					Slay The Spire is a deck-building roguelike where you make a
					sequence of small choices that snowball into a build that
					either works or collapses. It rewards discipline and
					strategic thinking.
				</TextBody>
				<TextBody variant="accent-foreground">
					In order to "slay the spire," you must balance decisions
					that benefit you immediately with those that pay off later.
					This tension between short-term gain and long-term strategy
					is at the heart of the game.
				</TextBody>
			</YStack>
			<MiterWindow link="https://store.steampowered.com/app/646570/Slay_the_Spire/">
				<Image
					src="/assets/slay-the-spire.jpg"
					alt="Slay The Spire"
					layout="responsive"
					width={800}
					height={600}
				/>
			</MiterWindow>
		</XStack>
	)
}

function Chess() {
	return (
		<XStack className="space-x-8">
			<MiterWindow link="https://lichess.org/">
				<Image
					src="/assets/pawn.png"
					alt="Chess"
					layout="responsive"
					width={800}
					height={600}
				/>
			</MiterWindow>
			<YStack className="space-y-4">
				<TextBody size="5xl" variant="accent-foreground">
					Chess
				</TextBody>
				<TextBody variant="accent-foreground">
					I started playing chess when I was 7 years old. I played
					until ~12 years old rather consistently then didn't get back
					into the game until my early 20s.
				</TextBody>
				<TextBody variant="accent-foreground">
					Highest Elo achieved: <b>1781</b>
				</TextBody>
				<TextBody variant="accent-foreground">
					I still enjoy playing casually. But having to study openings
					and tactics started to take away from the fun for me. I also
					am unsure how to feel about chess being a "solved" game.
				</TextBody>
			</YStack>
		</XStack>
	)
}

function Doom() {
	return (
		<XStack className="space-x-8">
			<YStack className="space-y-4">
				<TextBody size="5xl" variant="accent-foreground">
					Doom
				</TextBody>
				<TextBody variant="accent-foreground">
					First-person shooter classic. Fast-paced action, intense
					combat, and relentless enemies. Mastering movement, aiming,
					and weapon choice is key to surviving the onslaught.
				</TextBody>
				<TextBody variant="accent-foreground">
					There is some amount of strategy to this game but it is
					primarily action-oriented. Shoot enemies, dodge attacks, and
					use the right weapons for the situation.
				</TextBody>
			</YStack>
			<MiterWindow
				link="https://store.steampowered.com/app/782330/DOOM_Eternal/"
				className="shrink-0"
			>
				<Image
					src="/assets/doom-eternal.jpg"
					alt="Doom Eternal"
					layout="responsive"
					width={500}
					height={500}
				/>
			</MiterWindow>
		</XStack>
	)
}

function Terraria() {
	return (
		<XStack className="space-x-8">
			<MiterWindow link="https://terraria.org/">
				<Image
					src="/assets/terraria.png"
					alt="Terraria"
					width={1000}
					height={1000}
				/>
			</MiterWindow>
			<YStack className="space-y-4">
				<TextBody size="5xl" variant="accent-foreground">
					Terraria
				</TextBody>
				<TextBody variant="accent-foreground">
					Terraria is a sandbox adventure game where you explore,
					build, and fight in a procedurally generated world. It
					rewards creativity, exploration, and strategic planning.
				</TextBody>
				<TextBody variant="accent-foreground">
					Many people often compare it to a 2D version of Minecraft.
					The building, mining, and crafting mechanics are similar,
					but Terraria adds combat, exploration, and crafting
					elements.
				</TextBody>
				<TextBody variant="accent-foreground">
					This game is pretty interesting because you can make combats
					exponentially easier by building specialized structures and
					setups for different enemies.
				</TextBody>
			</YStack>
		</XStack>
	)
}

function DarkSouls() {
	return (
		<XStack className="space-x-8">
			<YStack className="space-y-4 min-w-sm">
				<TextBody size="5xl" variant="accent-foreground">
					Dark Souls
				</TextBody>
				<TextBody variant="accent-foreground">
					Dark Souls is an action RPG known for its challenging
					combat, cryptic story, and intricate world design. It
					rewards patience, strategy, and learning from failure.
				</TextBody>
				<TextBody variant="accent-foreground">
					The phrase "Get Good" is often associated with the
					franchise. In essence meaning, the game is hard, and the
					only way to make it less hard is to improve your skills.
				</TextBody>
			</YStack>
			<MiterWindow link="https://store.steampowered.com/app/570940/DARK_SOULS_REMASTERED/">
				<Image
					src="/assets/dark-souls.jpg"
					alt="Dark Souls"
					layout="responsive"
					width={500}
					height={500}
				/>
			</MiterWindow>
		</XStack>
	)
}

interface IMiterWindowProps {
	link: string
	className?: string
	children: React.ReactNode
}

function MiterWindow({ link, className, children }: IMiterWindowProps) {
	const [isHovered, setIsHovered] = useState(false)

	const onMouseEnter = useCallback(() => setIsHovered(true), [])
	const onMouseLeave = useCallback(() => setIsHovered(false), [])

	const handleClick = useCallback(() => window.open(link, "_blank"), [link])

	return (
		<Flex
			className={cn(
				"min-w-[400px] min-h-[400px] relative p-12 cursor-pointer items-center",
				className,
			)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={handleClick}
		>
			{/* top miter */}
			<div
				className="absolute top-0 right-0 w-[250px] h-6"
				style={{
					background: `linear-gradient(45deg, transparent 10%, ${isHovered ? "white" : "var(--color-muted)"} 90%)`,
					clipPath: `polygon(0 0, 100% 0, 100% 100%, 16px 100%)`,
				}}
			/>
			{/* right miter */}
			<div
				className="absolute top-0 right-0 w-6 h-[250px]"
				style={{
					background: `linear-gradient(45deg, transparent 10%, ${isHovered ? "white" : "var(--color-muted)"} 90%)`,
					clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 16px))`,
				}}
			/>
			{/* bottom miter */}
			<div
				className="absolute bottom-0 left-0 w-[250px] h-6"
				style={{
					background: `linear-gradient(45deg, ${isHovered ? "white" : "var(--color-background)"} 10%, transparent 90%)`,
					clipPath: `polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)`,
				}}
			/>
			{/* left miter */}
			<div
				className="absolute bottom-0 left-0 w-6 h-[250px]"
				style={{
					background: `linear-gradient(225deg, transparent 10%, ${isHovered ? "white" : "var(--color-background)"} 90%)`,
					clipPath: `polygon(0 0, 100% 16px, 100% 100%, 0 100%)`,
				}}
			/>
			{children}
		</Flex>
	)
}
