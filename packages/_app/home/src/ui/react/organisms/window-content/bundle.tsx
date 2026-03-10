import { Flex } from "@kelvan-design/ui/primitives/flex"

export function Bundle() {
	return (
		<Flex className="w-full h-full">
			<iframe
				src="/_analyze/index.html"
				className="w-full h-full"
				sandbox="allow-scripts allow-same-origin"
			/>
		</Flex>
	)
}
