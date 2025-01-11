CREATE TABLE "recipes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recipes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"source" text NOT NULL,
	"original_id" text,
	"name" text NOT NULL,
	"created_at" date NOT NULL,
	"duration" integer NOT NULL,
	"tags" text[] NOT NULL,
	"steps_count" integer NOT NULL,
	"description" text NOT NULL,
	"ingredients_count" integer NOT NULL,
	"calories" integer,
	"total_fat" integer,
	"sugar" integer,
	"sodium" integer,
	"protein" integer,
	"saturated_fat" integer,
	"carbohydrates" integer
);
