import { cn } from "@kelvan-design/ui/cn"
import { Switch } from "@kelvan-design/ui/library/switch"
import { Textarea } from "@kelvan-design/ui/library/text-area"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface IMarkdownNodeProps {
	markdownStr: string
	className?: string
}

export function MarkdownNode({ markdownStr, className }: IMarkdownNodeProps) {
	const [markdown, setMarkdown] = useState<string>(markdownStr)
	const [displayType, setDisplayType] = useState<"preview" | "code">(
		"preview",
	)

	return (
		<YStack className={cn("gap-4", className)}>
			<XStack className="items-end justify-end">
				<Flex>
					<Switch
						leftLabel="Preview"
						rightLabel="Code"
						checked={displayType === "code"}
						onCheckedChange={(checked) =>
							setDisplayType(checked ? "code" : "preview")
						}
					/>
				</Flex>
			</XStack>
			{displayType === "preview" ? (
				<Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
			) : (
				<Textarea
					value={markdown}
					onChange={(e) => setMarkdown(e.currentTarget.value)}
				/>
			)}
		</YStack>
	)
}
