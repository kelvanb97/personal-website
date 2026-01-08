import { ContactForm } from "@kelvan-app/contact/contact-form"
import { Flex } from "@kelvan-design/ui/primitives/flex"

export function Contact() {
	return (
		<Flex className="relative w-full h-full justify-center p-3 overflow-y-auto">
			<ContactForm className="rounded-xl border border-border p-3 w-full max-w-md mb-auto mt-12" />
		</Flex>
	)
}
