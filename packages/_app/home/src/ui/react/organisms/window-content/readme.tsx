import { TextBody } from "@kelvan-design/ui/library/text"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"

export function Readme() {
	return (
		<YStack className="p-3 overflow-y-auto h-full">
			<YStack>
				<TextBody
					size="3xl"
					variant="accent-foreground"
					className="font-bold mt-4"
				>
					Why build this site?
				</TextBody>
				<TextBody
					size="2xl"
					variant="accent-foreground"
					className="font-bold mt-3"
				>
					For fun
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="mt-2"
				>
					Creating an "OS-like" experience on the web is something
					that I have wanted to do for a while.
				</TextBody>
				<TextBody
					size="2xl"
					variant="accent-foreground"
					className="font-bold mt-3"
				>
					Proof of competence
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="font-medium mt-2"
				>
					In a very similar sense to the cliche "a picture is worth a
					thousand words", I believe that a well-designed and
					functional website can convey much more about my abilities
					than a resume.
				</TextBody>
				<TextBody
					size="2xl"
					variant="accent-foreground"
					className="relative font-bold mt-3"
				>
					<span className="relative px-3">
						"Trust me bro"
						<div className="absolute top-1/2 translate-y-1/2 bg-accent-foreground h-[2px] w-full z-10" />
					</span>{" "}
					¯\_(ツ)_/¯
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="font-medium mt-2"
				>
					Resumes (including mine, guilty as charged) often make
					grandiose claims that are hard to verify. My operating
					theory is that this website will validate my skills better
					than any resume could.
				</TextBody>
			</YStack>
			<YStack className="mt-8">
				<TextBody
					size="3xl"
					variant="accent-foreground"
					className="font-bold mt-4"
				>
					FAQs
				</TextBody>
				<TextBody
					size="2xl"
					variant="accent-foreground"
					className="font-bold mt-3"
				>
					Can I see the source code?
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="mt-2"
				>
					Yes! Please use the contact form to get in touch with me.
				</TextBody>
				<TextBody
					size="2xl"
					variant="accent-foreground"
					className="font-bold mt-3"
				>
					Why not open source it?
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="mt-2"
				>
					TL;DR I like the feedback loop. I like to know who wants to
					see my code.
				</TextBody>
				<TextBody
					size="2xl"
					variant="accent-foreground"
					className="font-bold mt-3"
				>
					Is there a backend?
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="mt-2"
				>
					There is an extremely minimal backend that handles the
					contact form submissions. I send myself emails via a Resend
					integration, using a Next.js server action.
				</TextBody>
				<TextBody
					size="2xl"
					variant="accent-foreground"
					className="font-bold mt-3"
				>
					Do you plan to maintain this site?
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="mt-2"
				>
					Yes and no. I plan to keep the site up and running and I
					intend on using it as a personal blog. But as far as
					features are concerned, I have supported my needs so I see
					little point in adding more features.
				</TextBody>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="mt-2"
				>
					With that said, if I needed a new feature to showcase
					something then sure, I'll add it.
				</TextBody>
			</YStack>
		</YStack>
	)
}
