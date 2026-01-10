import { cn } from "@kelvan-design/ui/cn"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useMemo, useState } from "react"
import { Games } from "./games"

const MITER_CUT_WIDTH = 32
const CLIP_PATH = `polygon(0 0, 100% 0, calc(100% - ${MITER_CUT_WIDTH}px) 100%, 0% 100%)`

type TTab = "personal" | "mountains" | "games" | "music" | "professional"

export function About() {
	const [activeTab, setActiveTab] = useState<TTab>("personal")

	const renderedTab = useMemo(() => {
		switch (activeTab) {
			case "personal":
				return <Personal />
			case "mountains":
				return <Mountains />
			case "games":
				return <Games />
			case "music":
				return <Music />
			case "professional":
				return <Professional />
		}
	}, [activeTab])

	return (
		<Flex className="w-full h-full overflow-auto">
			<YStack className="min-w-5xl w-full">
				<XStack className="w-full">
					<Tab
						tab="personal"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						className="z-10"
						style={{
							width: `calc(20% + ${MITER_CUT_WIDTH}px)`,
							clipPath: CLIP_PATH,
						}}
						textStyle={{ marginLeft: -MITER_CUT_WIDTH }}
					/>
					<Tab
						tab="mountains"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						className="z-9"
						style={{
							width: `calc(20% + ${MITER_CUT_WIDTH}px)`,
							marginLeft: `-${MITER_CUT_WIDTH}px`,
							clipPath: CLIP_PATH,
						}}
					/>
					<Tab
						tab="games"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						className="z-8"
						style={{
							width: `calc(20% + ${MITER_CUT_WIDTH}px)`,
							marginLeft: `-${MITER_CUT_WIDTH}px`,
							clipPath: CLIP_PATH,
						}}
					/>
					<Tab
						tab="music"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						className="z-7"
						style={{
							width: `calc(20% + ${MITER_CUT_WIDTH}px)`,
							marginLeft: `-${MITER_CUT_WIDTH}px`,
							clipPath: CLIP_PATH,
						}}
					/>
					<Tab
						tab="professional"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						className="z-6"
						style={{
							width: "20%",
							marginLeft: `-${MITER_CUT_WIDTH}px`,
						}}
						textStyle={{
							marginLeft: MITER_CUT_WIDTH,
						}}
					/>
				</XStack>
				<Flex className="p-3 justify-center w-full h-full">
					{renderedTab}
				</Flex>
			</YStack>
		</Flex>
	)
}

interface ITabProps {
	tab: TTab
	activeTab: TTab
	setActiveTab: (tab: TTab) => void
	className?: string
	style?: React.CSSProperties
	textStyle?: React.CSSProperties
}

function Tab({
	tab,
	activeTab,
	setActiveTab,
	className,
	style,
	textStyle,
}: ITabProps) {
	const isActiveTab = useMemo(() => activeTab === tab, [activeTab, tab])

	return (
		<Flex
			className={cn(
				"cursor-pointer p-2 justify-center items-center relative hover:bg-primary hover:filter hover:brightness-110",
				isActiveTab ? "bg-primary" : "bg-card",
				className,
			)}
			style={style}
			onClick={() => setActiveTab(tab)}
		>
			<GradientBg />
			<TextBody
				variant="accent-foreground"
				size="xl"
				style={textStyle}
				className="capitalize"
			>
				{tab}
			</TextBody>
		</Flex>
	)
}

function GradientBg() {
	return (
		<div
			className="pointer-events-none absolute inset-0 opacity-70"
			style={{
				background:
					"linear-gradient(115deg, rgba(0,0,0,0.65) 0%, rgba(255,255,255,0.18) 30%)",
			}}
		/>
	)
}

function Personal() {
	return <div>This is Personal</div>
}

function Mountains() {
	return <div>This is Mountains</div>
}

function Music() {
	return <div>This is Music</div>
}

function Professional() {
	return <div>This is Professional</div>
}
