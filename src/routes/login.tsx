import {
	Button,
	FieldError,
	FieldGroup,
	Fieldset,
	FieldsetLegend,
	Form,
	Input,
	Label,
	TextField
} from "@heroui/react"
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
			<Form
				validationErrors={errors}
				className="grid gap-2 max-w-sm w-full"
				onSubmit={handleSubmit}
			>
				<Fieldset>
					<FieldsetLegend className="text-center text-xl">Login</FieldsetLegend>
					<FieldGroup>
						<TextField
							isRequired
							defaultValue={import.meta.env.VITE_LOGIN_USER}
						>
							<Label>Email</Label>
							<Input name="email" type="email" />
							<FieldError />
						</TextField>
						<TextField
							isRequired
							defaultValue={import.meta.env.VITE_LOGIN_PASS}
						>
							<Label>Password</Label>
							<Input name="password" type="password" />
							<FieldError />
						</TextField>
						<Button fullWidth type="submit" isPending={isPending}>
							Entrar
						</Button>
					</FieldGroup>
				</Fieldset>
			</Form>
		</div>
	)
}
