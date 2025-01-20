CREATE TYPE "public"."diet_enum" AS ENUM('no_diet', 'vegetarian', 'vegan', 'pescatarian');--> statement-breakpoint
CREATE TYPE "public"."gender_enum" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TYPE "public"."difficulty_enum" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TABLE "dietary-plan" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dietary-plan_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"start_date" date NOT NULL,
	"target" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "featured_recipes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "featured_recipes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"recipe_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "followers" (
	"follower_id" integer NOT NULL,
	"followed_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_likes" (
	"post_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"source" text,
	"author_id" integer,
	"rating" integer NOT NULL,
	"recipe_id" integer NOT NULL,
	"content" text NOT NULL,
	"author_name" text,
	"original_id" text,
	"original_recipe_id" text,
	"created_at" date DEFAULT now() NOT NULL,
	"likes_count" integer
);
--> statement-breakpoint
CREATE TABLE "preferences" (
	"id" integer PRIMARY KEY NOT NULL,
	"activity_level" real NOT NULL,
	"weight" real NOT NULL,
	"height" real NOT NULL,
	"gender" "gender_enum" NOT NULL,
	"age" integer NOT NULL,
	"diet" "diet_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe_likes" (
	"recipe_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recipes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"source" text,
	"original_id" text,
	"name" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"preparation_time" integer NOT NULL,
	"cooking_time" integer NOT NULL,
	"tags" text[] NOT NULL,
	"steps_count" integer NOT NULL,
	"steps" text[] NOT NULL,
	"description" text NOT NULL,
	"ingredients_count" integer NOT NULL,
	"ingredients" jsonb[] NOT NULL,
	"calories" real,
	"total_fat" real,
	"sugar" real,
	"sodium" real,
	"protein" real,
	"saturated_fat" real,
	"carbohydrates" real,
	"cholesterol" real,
	"fiber" real,
	"likes" integer DEFAULT 0 NOT NULL,
	"author_name" text,
	"author_id" integer,
	"images" text[] NOT NULL,
	"difficulty" "difficulty_enum" NOT NULL,
	"servings" integer,
	"serving_size" integer,
	"searchable" "tsvector"
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"password" text NOT NULL,
	"picture" text,
	"username" text NOT NULL,
	"followers" integer DEFAULT 0 NOT NULL,
	"follows" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "featured_recipes" ADD CONSTRAINT "featured_recipes_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_follower_id_users_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_followed_id_users_id_fk" FOREIGN KEY ("followed_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_likes" ADD CONSTRAINT "recipe_likes_recipe_id_posts_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_likes" ADD CONSTRAINT "recipe_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "searchable_idx" ON "recipes" USING btree ("searchable");