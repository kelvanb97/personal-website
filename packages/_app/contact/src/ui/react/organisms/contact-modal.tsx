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
import { Button } from "@kelvan-design/ui/library/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@kelvan-design/ui/library/dialog"
import { InputGroup } from "@kelvan-design/ui/library/input-group"
import { Label } from "@kelvan-design/ui/library/label"
import {
	PhoneInput,
	type PhoneInputProps,
} from "@kelvan-design/ui/library/phone-input"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Textarea } from "@kelvan-design/ui/library/text-area"
import { toast } from "@kelvan-design/ui/library/toast"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useCallback, useRef, useState } from "react"

interface ITicketModalProps {
	title: string
	isOpen: boolean
	onClose: () => void
}

export function TicketModal({ title, isOpen, onClose }: ITicketModalProps) {
	const [phoneNumber, setPhoneNumber] =
		useState<NonNullable<PhoneInputProps["value"]>>("")
	const messageRef = useRef<HTMLTextAreaElement>(null)

	const { execute, result, status } = useAction(contactAction, {
		onSuccess: () => {
			toast.success("Report submitted successfully, we will be in touch!")
			onClose()
		},
	})

	const handleSubmit = useCallback(() => {
		const payload: Record<keyof TContactSchema, unknown> = {
			name: "",
			email: "",
			phone: phoneNumber || undefined,
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
	}, [execute, phoneNumber])

	const errorMessage = useActionError(result)
	const isLoading = useIsLoading(status)
	useToastOnError(errorMessage, status)

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				showCloseButton
				className="overflow-y-auto max-h-[90vh]"
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>
						Please describe your issue or feature request in as much
						detail as possible.
					</DialogDescription>
				</DialogHeader>
				<YStack className="space-y-4">
					<InputGroup>
						<Label size="xl">Message</Label>
						<Textarea
							id="message-text"
							ref={messageRef}
							className="h-40"
							rows={4}
							placeholder="Describe your issue or feature request..."
						/>
					</InputGroup>
					<InputGroup>
						<Label htmlFor="phone" size="lg">
							Phone number{" "}
							<span className="text-muted-foreground">
								(optional)
							</span>
						</Label>
						<TextBody size="sm" variant="muted-foreground">
							For urgent resolution, please provide your phone
							number.
						</TextBody>
						<PhoneInput
							value={phoneNumber}
							onChange={setPhoneNumber}
						/>
					</InputGroup>
				</YStack>
				<DialogFooter>
					<Button onClick={handleSubmit} disabled={isLoading}>
						Submit report
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
