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
			<Form
				validationErrors={errors}
				className="grid gap-2 max-w-sm w-full"
				onSubmit={handleSubmit}
			>
				<Fieldset>
					<FieldsetLegend className="font-semibold mb-3">Signup</FieldsetLegend>
					<FieldGroup>
						<TextField>
							<Label>Email</Label>
							<Input name="email" type="email" />
							<FieldError />
						</TextField>
						<TextField>
							<Label>Password</Label>
							<Input name="password" type="password" />
							<FieldError />
						</TextField>
						<TextField>
							<Label>Name</Label>
							<Input name="nombre" />
							<FieldError />
						</TextField>
						<TextField>
							<Label>Location</Label>
							<Input name="location" />
							<FieldError />
						</TextField>
					</FieldGroup>
					<Button type="submit" isPending={isPending}>
						Enviar
					</Button>
				</Fieldset>
			</Form>
		</div>
	)
}
