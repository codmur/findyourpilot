import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"
import { db } from "@/integrations/drizzle"
import { dronesSchema } from "@/integrations/drizzle/db/schema"
import {
	droneValidationSchema,
	paginatedDronesValidationSchema
} from "../validation/drones"

const insertDrones = createServerFn()
	.inputValidator(droneValidationSchema)
	.handler(async ({ data }) => {
		await db()
			.insert(dronesSchema)
			.values({
				model: data.model,
				brand: data.brand
			})
			.returning()
	})

const editDrone = createServerFn()
	.inputValidator(
		droneValidationSchema.pick({
			model: true,
			brand: true,
			id: true
		})
	)
	.handler(async ({ data }) => {
		await db()
			.update(dronesSchema)
			.set({
				model: data.model,
				brand: data.brand
			})
			.where(eq(dronesSchema.id, data.id))
	})

const deleteDrones = createServerFn({
	method: "POST"
})
	.inputValidator(
		droneValidationSchema.pick({
			id: true
		})
	)
	.handler(async ({ data }) => {
		return await db().delete(dronesSchema).where(eq(dronesSchema.id, data.id))
	})

const getAllDrones = createServerFn({
	method: "POST"
})
	.inputValidator(paginatedDronesValidationSchema)
	.handler(async ({ data }) => {
		return db()
			.select()
			.from(dronesSchema)
			.limit(data.limit)
			.offset((data.page - 1) * data.limit)
	})

export const serverDrones = {
	insertDrones,
	editDrone,
	getAllDrones,
	deleteDrones
}
