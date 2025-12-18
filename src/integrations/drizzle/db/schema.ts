import { sql } from "drizzle-orm"
import {
	boolean,
	decimal,
	integer,
	pgPolicy,
	pgTable,
	serial,
	text,
	uuid,
	varchar
} from "drizzle-orm/pg-core"
import { authenticatedRole, authUsers } from "drizzle-orm/supabase"

// === drones ===
export const dronesSchema = pgTable("drones", {
	id: serial("id").primaryKey().notNull(),
	model: varchar("model", { length: 100 }),
	brand: varchar("brand", { length: 100 })
	// type: jsonb("type")
}).enableRLS()

// === certs ===
export const certsSchema = pgTable("certs", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }),
	link: text("link")
}).enableRLS()

// === places ===
export const placesSchema = pgTable(
	"places",
	{
		id: serial("id").primaryKey().notNull(),
		coord_x: decimal("coord_x"),
		coord_y: decimal("coord_y"),
		description: varchar("description", { length: 255 }),
		name: varchar("name", { length: 100 }),
		id_user: uuid("id_user")
			.notNull()
			.references(() => authUsers.id, { onDelete: "cascade" }),
		hidden_place: boolean("hidden_place")
	},
	(table) => [
		pgPolicy("select-own-places", {
			for: "select",
			to: authenticatedRole,
			using: sql`${table.id_user} = auth.uid()`
		}),
		pgPolicy("insert-own-places", {
			for: "insert",
			to: authenticatedRole,
			withCheck: sql`${table.id_user} = auth.uid()`
		}),
		pgPolicy("update-own-places", {
			for: "update",
			to: authenticatedRole,
			using: sql`${table.id_user} = auth.uid()`,
			withCheck: sql`${table.id_user} = auth.uid()`
		})
	]
).enableRLS()

// === users_drones ===
export const usersDronesSchema = pgTable(
	"users_drones",
	{
		id: serial("id").primaryKey().notNull(),
		id_drone: integer("id_drone").references(() => dronesSchema.id),
		id_user: uuid("id_user").references(() => authUsers.id)
	},
	(table) => [
		pgPolicy("select-own-user-drones", {
			for: "select",
			to: authenticatedRole,
			using: sql`${table.id_user} = auth.uid()`
		}),
		pgPolicy("insert-own-user-drones", {
			for: "insert",
			to: authenticatedRole,
			withCheck: sql`${table.id_user} = auth.uid()`
		})
	]
).enableRLS()

// === users_certs ===
export const usersCertsSchema = pgTable(
	"users_certs",
	{
		id: serial("id").primaryKey().notNull(),
		id_cert: integer("id_cert").references(() => certsSchema.id),
		id_user: uuid("id_user").references(() => authUsers.id)
	},
	(table) => [
		pgPolicy("select-own-user-certs", {
			for: "select",
			to: authenticatedRole,
			using: sql`${table.id_user} = auth.uid()`
		}),
		pgPolicy("insert-own-user-certs", {
			for: "insert",
			to: authenticatedRole,
			withCheck: sql`${table.id_user} = auth.uid()`
		})
	]
).enableRLS()

// === users_places ===
export const usersPlacesSchema = pgTable(
	"users_places",
	{
		id: serial("id").primaryKey().notNull(),
		id_place: integer("id_place").references(() => placesSchema.id),
		id_user: uuid("id_user").references(() => authUsers.id)
	},
	(table) => [
		pgPolicy("select-own-user-places", {
			for: "select",
			to: authenticatedRole,
			using: sql`${table.id_user} = auth.uid()`
		}),
		pgPolicy("insert-own-user-places", {
			for: "insert",
			to: authenticatedRole,
			withCheck: sql`${table.id_user} = auth.uid()`
		})
	]
).enableRLS()

// === equipment ===
export const equipmentSchema = pgTable("equipment", {
	id: serial("id").primaryKey().notNull()
}).enableRLS()
