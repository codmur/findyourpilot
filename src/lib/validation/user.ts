import * as z from "zod"

export const loginFormSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password must be at least 1 character long")
})

export const signupFormSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	name: z.string().min(1, "The field is required"),
	location: z.string().min(1, "The field is required"),
	redirectUrl: z.string().optional()
})

export const profileFormSchema = z.object({
	id: z.uuid(),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required")
})

export const userListParamsSchema = z.object({
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(100).default(10)
})
