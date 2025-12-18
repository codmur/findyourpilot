CREATE TABLE "certs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"link" text
);
--> statement-breakpoint
ALTER TABLE "certs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "drones" (
	"id" serial PRIMARY KEY NOT NULL,
	"model" varchar(100),
	"brand" varchar(100),
	"type" jsonb
);
--> statement-breakpoint
ALTER TABLE "drones" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "equipment" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "equipment" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "places" (
	"id" serial PRIMARY KEY NOT NULL,
	"coord_x" numeric,
	"coord_y" numeric,
	"description" varchar(255),
	"name" varchar(100),
	"id_user" uuid NOT NULL,
	"hidden_place" boolean
);
--> statement-breakpoint
ALTER TABLE "places" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "users_certs" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_cert" integer,
	"id_user" uuid
);
--> statement-breakpoint
ALTER TABLE "users_certs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "users_drones" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_drone" integer,
	"id_user" uuid
);
--> statement-breakpoint
ALTER TABLE "users_drones" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "users_places" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_place" integer,
	"id_user" uuid
);
--> statement-breakpoint
ALTER TABLE "users_places" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_certs" ADD CONSTRAINT "users_certs_id_cert_certs_id_fk" FOREIGN KEY ("id_cert") REFERENCES "public"."certs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_certs" ADD CONSTRAINT "users_certs_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_drones" ADD CONSTRAINT "users_drones_id_drone_drones_id_fk" FOREIGN KEY ("id_drone") REFERENCES "public"."drones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_drones" ADD CONSTRAINT "users_drones_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_places" ADD CONSTRAINT "users_places_id_place_places_id_fk" FOREIGN KEY ("id_place") REFERENCES "public"."places"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_places" ADD CONSTRAINT "users_places_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "select-own-places" ON "places" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("places"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "insert-own-places" ON "places" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("places"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "update-own-places" ON "places" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("places"."id_user" = auth.uid()) WITH CHECK ("places"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "select-own-user-certs" ON "users_certs" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("users_certs"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "insert-own-user-certs" ON "users_certs" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("users_certs"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "select-own-user-drones" ON "users_drones" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("users_drones"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "insert-own-user-drones" ON "users_drones" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("users_drones"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "select-own-user-places" ON "users_places" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("users_places"."id_user" = auth.uid());--> statement-breakpoint
CREATE POLICY "insert-own-user-places" ON "users_places" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("users_places"."id_user" = auth.uid());