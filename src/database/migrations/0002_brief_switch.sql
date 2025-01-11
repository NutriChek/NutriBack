ALTER TABLE "recipes" ADD COLUMN "steps" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "ingredients" text[] NOT NULL;