import * as z from "zod"

export const droneValidationSchema = z.object({
	model: z.string(),
	brand: z.string(),
	id: z.number()
})

export const paginatedDronesValidationSchema = z.object({
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(100).default(10)
})
