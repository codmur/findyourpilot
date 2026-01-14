import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"
import { db } from "@/integrations/drizzle"
import { placesSchema } from "@/integrations/drizzle/db/schema"
import {
	paginatedPlacesValidationSchema,
	placeValidationSchema
} from "../validation/places"

export const insertUserPlace = createServerFn()
	.inputValidator(placeValidationSchema)
	.handler(async ({ data }) => {
		await db().insert(placesSchema).values(data).returning()
	})

export const editUserPlace = createServerFn()
	.inputValidator(
		placeValidationSchema.pick({
			hidden_place: true,
			name: true,
			description: true,
			id_user: true
		})
	)
	.handler(async ({ data }) => {
		await db()
			.update(placesSchema)
			.set(data)
			.where(eq(placesSchema.id_user, data.id_user))
	})

export const getUserPlacesById = createServerFn()
	.inputValidator(paginatedPlacesValidationSchema)
	.handler(async ({ data }) => {
		return await db()
			.select()
			.from(placesSchema)
			.where(eq(placesSchema.id_user, data.id_user))
			.limit(data.limit)
			.offset((data.page - 1) * data.limit)
	})

export const getUserPlacesByUser = createServerFn()
	.inputValidator(
		paginatedPlacesValidationSchema.pick({ page: true, limit: true })
	)
	.handler(async ({ data }) => {
		console.log(data)
		return await db()
			.select()
			.from(placesSchema)
			.limit(data.limit)
			.offset((data.page - 1) * data.limit)
	})

export const places = {
	insertUserPlace,
	editUserPlace,
	getUserPlacesById,
	getUserPlacesByUser
}
