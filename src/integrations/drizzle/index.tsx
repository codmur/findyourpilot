import { createServerOnlyFn } from "@tanstack/react-start"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export const db = createServerOnlyFn(() => {
	const connectionString = process.env.DATABASE_URL ?? ""
	const client = postgres(connectionString, { prepare: false })

	// Disable prefetch as it is not supported for "Transaction" pool mode

	return drizzle(client)
})
