import { Flex } from "@kelvan-design/ui/primitives/flex"
import { MarkdownNode } from "#organisms/markdown-node"

export function Todos() {
	return (
		<Flex className="p-3">
			<MarkdownNode className="w-full" markdownStr={TODOS} />
		</Flex>
	)
}

const TODOS = `#Todos
- [x] Implement MarkdownNode component
- [ ] Add theme toggle functionality
- [ ] Implement preview and code display modes
- [ ] Style the components using Kelvan Design System
- [ ] Test the component for various markdown inputs
`
