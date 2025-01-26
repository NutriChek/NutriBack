ALTER TABLE "chat_messages" RENAME COLUMN "content" TO "parts";--> statement-breakpoint
ALTER TABLE "recipe_likes" DROP CONSTRAINT "recipe_likes_recipe_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe_likes" ADD CONSTRAINT "recipe_likes_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;