import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import type z from "zod"
import { user } from "@/lib/server/user"
import { signupFormSchema } from "@/lib/validation/user"
import { useValidation } from "../useValidation"

type TSignupForm = z.infer<typeof signupFormSchema>

export const useSignup = () => {
	const navigate = useNavigate()
	const { validate, errors } = useValidation({
		defaultSchema: signupFormSchema
	})
	const signup = useMutation({
		mutationKey: ["signup"],
		mutationFn: async (data: TSignupForm) => user.signup({ data }),
		onSuccess: () => {
			toast.success("Signup successful! Redirecting to login...", {
				id: "signup"
			})
			navigate({
				to: "/login"
			})
		}
	})

	const validateSignup = (formData: TSignupForm) => {
		const isValid = validate({ formData })
		if (!isValid) {
			toast.error("Signup failed. Please check your input.", {
				id: "signup"
			})
		}
		signup.mutate(formData)
	}

	return {
		signup: validateSignup,
		errors,
		isPending: signup.isPending
	}
}
