"use client"

import { contactAction } from "@kelvan-api/contact/actions/contact-action"
import {
	contactSchema,
	type TContactSchema,
} from "@kelvan-api/contact/schema/contact-schema"
import {
	useAction,
	useActionError,
	useIsLoading,
	useToastOnError,
} from "@kelvan-core/next-safe-action/hooks"
import { cn } from "@kelvan-design/ui/cn"
import { Button } from "@kelvan-design/ui/library/button"
import { Input } from "@kelvan-design/ui/library/input"
import { InputGroup } from "@kelvan-design/ui/library/input-group"
import { Label } from "@kelvan-design/ui/library/label"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Textarea } from "@kelvan-design/ui/library/text-area"
import { toast } from "@kelvan-design/ui/library/toast"
import { SendIcon } from "@kelvan-design/ui/lucide-icons"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useCallback, useRef } from "react"

interface IContractFormProps {
	className?: string
}

export function ContactForm({ className }: IContractFormProps) {
	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const messageRef = useRef<HTMLTextAreaElement>(null)

	const { execute, result, status } = useAction(contactAction, {
		onSuccess: () => {
			toast.success(
				"Contact form submitted successfully, we will be in touch!",
			)
		},
	})

	const handleSubmit = useCallback(() => {
		const payload: Record<keyof TContactSchema, unknown> = {
			name: nameRef.current?.value || "",
			email: emailRef.current?.value || "",
			message: messageRef.current?.value || "",
		}

		const parsed = contactSchema.safeParse(payload)

		if (!parsed.success) {
			const flattenedErrors = parsed.error.flatten()
			const fieldErrors = flattenedErrors.fieldErrors
			const formErrors = flattenedErrors.formErrors
			const firstError =
				Object.values(fieldErrors).flat()[0] ??
				Object.values(formErrors).flat()[0]
			toast.error(firstError ?? "Invalid input")
			return
		}

		execute(parsed.data)
	}, [execute])

	const errorMessage = useActionError(result)
	const isLoading = useIsLoading(status)
	useToastOnError(errorMessage, status)

	return (
		<YStack className={cn("bg-white/4 space-y-4", className)}>
			<YStack className="space-y-2">
				<TextBody size="2xl" variant="accent-foreground">
					Contact Me
				</TextBody>
				<TextBody size="sm" variant="muted-foreground">
					You know the drill. Fill out the form below and I'll get
					back to you as soon as I can!
				</TextBody>
			</YStack>
			<XStack className="space-x-2">
				<InputGroup className="flex-1">
					<Label htmlFor="name" size="lg">
						Name
					</Label>
					<Input
						id="name"
						ref={nameRef}
						type="text"
						placeholder="Jane Doe"
					/>
				</InputGroup>
				<InputGroup className="flex-1">
					<Label htmlFor="email" size="lg">
						Email
					</Label>
					<Input
						id="email"
						ref={emailRef}
						type="email"
						placeholder="jane@acme.com"
					/>
				</InputGroup>
			</XStack>
			<InputGroup>
				<Label size="xl">Message</Label>
				<Textarea
					id="message-text"
					ref={messageRef}
					className="h-40"
					rows={4}
					placeholder="What's up? Ask me anything... I may even respond!"
				/>
			</InputGroup>
			<Button
				onClick={handleSubmit}
				disabled={isLoading}
				className="font-bold"
			>
				<SendIcon />
				Contact me
			</Button>
		</YStack>
	)
}
