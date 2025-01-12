ALTER TABLE "posts" ALTER COLUMN "author_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "author_name" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "original_id" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "original_recipe_id" text;