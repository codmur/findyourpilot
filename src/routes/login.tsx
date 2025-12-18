import { Button, Form, Input } from "@heroui/react"
import { createFileRoute, redirect } from "@tanstack/react-router"
import type { FormEvent } from "react"
import { useLogin } from "@/lib/hooks/user/useLogin"

export const Route = createFileRoute("/login")({
	beforeLoad: ({ context }) => {
		if (!context?.error) {
			throw redirect({
				to: "/dashboard"
			})
			// TODO: Redirect to login page
		}
	},
	component: LoginComp
})

function LoginComp() {
	const { errors, isPending, login } = useLogin()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		login({
			email: formData.get("email") as string,
			password: formData.get("password") as string
		})
	}

	return (
		<div className="flex justify-center items-center flex-col h-screen">
			<p className="font-semibold mb-3">Login</p>
			<Form
				validationErrors={errors}
				className="grid gap-2 max-w-sm w-full"
				onSubmit={handleSubmit}
			>
				<Input name="email" label="Email" />
				<Input name="password" type="password" label="Password" />
				<Button type="submit" isLoading={isPending}>
					Entrar
				</Button>
			</Form>
		</div>
	)
}
