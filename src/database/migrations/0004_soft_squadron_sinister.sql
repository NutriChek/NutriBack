ALTER TABLE "posts" ALTER COLUMN "source" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "preferences" ALTER COLUMN "allergens" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "preferences" ALTER COLUMN "diet" SET DATA TYPE diet_enum;--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "source" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "likes_count" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "followers" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "follows" integer DEFAULT 0 NOT NULL;