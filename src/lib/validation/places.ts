import * as z from "zod"

export const placeValidationSchema = z.object({
	name: z.string(),
	description: z.string(),
	coord_x: z.string(),
	coord_y: z.string(),
	id_user: z.string(),
	hidden_place: z.boolean()
})

export const paginatedPlacesValidationSchema = z.object({
	page: z.number(),
	limit: z.number(),
	id_user: z.string()
})
