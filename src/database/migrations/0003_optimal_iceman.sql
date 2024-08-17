ALTER TABLE "Recipe" RENAME COLUMN "body" TO "description";--> statement-breakpoint
ALTER TABLE "Post" ADD COLUMN "recipeID" integer;--> statement-breakpoint
ALTER TABLE "Recipe" ADD COLUMN "steps" text[] NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_recipeID_Recipe_id_fk" FOREIGN KEY ("recipeID") REFERENCES "public"."Recipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
