import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import type z from "zod"
import { user } from "@/lib/server/user"
import { loginFormSchema } from "@/lib/validation/user"
import { useValidation } from "../useValidation"

type TLoginForm = z.infer<typeof loginFormSchema>

export const useLogin = () => {
	const navigate = useNavigate()
	const { errors, validate } = useValidation({
		defaultSchema: loginFormSchema
	})
	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: TLoginForm) => {
			const response = await user.login({ data })
			if (response.error) {
				throw new Error(response.message)
			}
		},
		onMutate: () => {
			toast.loading("Logging in...", { id: "login" })
		},
		onSuccess: () => {
			toast.success("Login successful! Redirecting to posts..", { id: "login" })
			navigate({
				to: "/dashboard"
			})
		},
		onError: (error) => {
			toast.error(error.message, { id: "login" })
		}
	})

	const validateLogin = (formData: TLoginForm) => {
		const isValid = validate({
			formData
		})

		if (!isValid) {
			toast.error("Error en el formulario.")
			return false
		}

		loginMutation.mutate(formData)
	}

	return {
		login: validateLogin,
		isPending: loginMutation.isPending,
		errors: errors
	}
}
