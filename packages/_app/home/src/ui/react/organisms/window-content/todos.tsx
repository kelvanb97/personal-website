import { Checkbox } from "@kelvan-design/ui/library/checkbox"
import { TextBody } from "@kelvan-design/ui/library/text"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useState } from "react"

export function Todos() {
	return (
		<YStack className="p-3 overflow-auto h-full w-full gap-3">
			<LabeledCheckbox label="Learn React" checked={false} />
			<LabeledCheckbox label="Build a personal website" checked={false} />
			<LabeledCheckbox label="Write blog posts" checked={false} />
			<LabeledCheckbox
				label="Contribute to open source"
				checked={false}
			/>
			<LabeledCheckbox label="Explore new technologies" checked={false} />
		</YStack>
	)
}

interface ILabeledCheckboxProps {
	label: string
	checked: boolean
}

function LabeledCheckbox({ label, checked }: ILabeledCheckboxProps) {
	const [isChecked, setIsChecked] = useState(checked)

	return (
		<XStack className="gap-x-1 items-center">
			<Checkbox
				className="cursor-pointer hover:opacity-80"
				checked={isChecked}
				onCheckedChange={() => setIsChecked((prev) => !prev)}
			/>
			<TextBody variant="accent-foreground">{label}</TextBody>
		</XStack>
	)
}
