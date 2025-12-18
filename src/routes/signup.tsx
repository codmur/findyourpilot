import { Button, Form, Input } from "@heroui/react"
import { createFileRoute } from "@tanstack/react-router"
import type { FormEvent } from "react"
import { useSignup } from "@/lib/hooks/user/useSignup"

export const Route = createFileRoute("/signup")({
	component: SignupComp
})

function SignupComp() {
	const { signup, errors, isPending } = useSignup()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		signup({
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			name: formData.get("nombre") as string,
			location: formData.get("location") as string
		})
	}

	return (
		<div className="flex justify-center items-center flex-col h-screen">
			<p className="font-semibold mb-3">Signup</p>
			<Form
				validationErrors={errors}
				className="grid gap-2 max-w-sm w-full"
				onSubmit={handleSubmit}
			>
				<Input name="email" type="email" label="Email" />
				<Input name="password" type="password" label="Password" />
				<Input name="nombre" label="Name" />
				<Input name="location" label="Location" />
				<Button type="submit" isLoading={isPending}>
					Enviar
				</Button>
			</Form>
		</div>
	)
}
