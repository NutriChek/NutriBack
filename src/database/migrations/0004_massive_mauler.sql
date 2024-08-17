ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commentID_Comment_id_fk";
--> statement-breakpoint
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postID_Post_id_fk";
--> statement-breakpoint
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postID_Post_id_fk";
--> statement-breakpoint
ALTER TABLE "RecipeLike" DROP CONSTRAINT "RecipeLike_recipeID_Recipe_id_fk";
--> statement-breakpoint
ALTER TABLE "Recipe" ADD COLUMN "likes" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ADD COLUMN "dislikes" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentID_Comment_id_fk" FOREIGN KEY ("commentID") REFERENCES "public"."Comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postID_Post_id_fk" FOREIGN KEY ("postID") REFERENCES "public"."Post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postID_Post_id_fk" FOREIGN KEY ("postID") REFERENCES "public"."Post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipeLike" ADD CONSTRAINT "RecipeLike_recipeID_Recipe_id_fk" FOREIGN KEY ("recipeID") REFERENCES "public"."Recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
