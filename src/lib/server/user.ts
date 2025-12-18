import { redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getSupabaseServerClient } from "@/integrations/supabase/supabase"
import {
	loginFormSchema,
	signupFormSchema,
	userListParamsSchema
} from "../validation/user"

const login = createServerFn({ method: "POST" })
	.inputValidator(loginFormSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient()

		const login = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password
		})

		if (login.error) {
			return {
				error: true,
				message: login.error.message
			}
		}

		return {
			error: false
		}
	})

const logout = createServerFn().handler(async () => {
	const supabase = getSupabaseServerClient()

	const { error } = await supabase.auth.signOut()
	if (error) {
		return {
			error: true,
			message: error.message
		}
	}

	throw redirect({
		to: "/",
		viewTransition: true,
		replace: true
	})
})

const signup = createServerFn({ method: "POST" })
	.inputValidator(signupFormSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient()
		const { error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					name: data.name,
					location: data.location
				}
			}
		})
		if (error) {
			return {
				error: true,
				message: error.message
			}
		}

		throw redirect({
			href: data.redirectUrl || "/"
		})
	})

const userData = createServerFn().handler(async () => {
	const supabase = getSupabaseServerClient()
	const { data, error } = await supabase.auth.getUser()
	if (error || !data.user) {
		return {
			error: true,
			message: error?.message ?? "Unknown error"
		}
	}
	return {
		user: {
			id: data.user.id,
			email: data.user.email,
			name: data.user.user_metadata.name || "",
			location: data.user.user_metadata.location || ""
		},
		error: false
	}
})

const resendConfirmationEmail = createServerFn({ method: "POST" })
	.inputValidator(signupFormSchema.pick({ email: true }))
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient()
		const { error } = await supabase.auth.resetPasswordForEmail(data.email)

		if (error) {
			return {
				error: true,
				message: error.message
			}
		}

		return {
			error: false
		}
	})

const userList = createServerFn()
	.inputValidator(userListParamsSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient()
		const users = await supabase.auth.admin.listUsers({
			page: data.page,
			perPage: data.limit
		})

		if (users.error) {
			return {
				error: true,
				message: users.error.message
			}
		}
		return {
			users: users.data,
			error: false
		}
	})

export const user = {
	login,
	logout,
	signup,
	userData,
	resendConfirmationEmail,
	userList
}
