import { cn } from "@kelvan-design/ui/cn"
import { Checkbox } from "@kelvan-design/ui/library/checkbox"
import { TextBody } from "@kelvan-design/ui/library/text"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useState } from "react"

const TODOS = [
	"update reset logic to detect for collisions instead of resetting every time the viewport changes",
	"set window to active when a drag starts",
	"give mobile warning notice",
	"implement reverse proxy for analytics",
	"debug what is going on with morphling",
]

export function Todos() {
	return (
		<YStack className="p-3 overflow-auto h-full w-full gap-1">
			{TODOS.map((todo, index) => (
				<LabeledCheckbox
					key={index}
					label={todo}
					checked={false}
					isFirst={index === 0}
				/>
			))}
		</YStack>
	)
}

interface ILabeledCheckboxProps {
	label: string
	checked: boolean
	isFirst: boolean
}

function LabeledCheckbox({ label, checked, isFirst }: ILabeledCheckboxProps) {
	const [isChecked, setIsChecked] = useState(checked)

	return (
		<XStack
			className={cn("gap-x-2 items-center py-1", {
				"border-t-1": !isFirst,
			})}
		>
			<Checkbox
				className="cursor-pointer hover:filter hover:brightness-120"
				checked={isChecked}
				onCheckedChange={() => setIsChecked((prev) => !prev)}
			/>
			<TextBody size="sm" variant="accent-foreground">
				{label}
			</TextBody>
		</XStack>
	)
}
