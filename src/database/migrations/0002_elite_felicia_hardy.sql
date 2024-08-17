CREATE TABLE IF NOT EXISTS "Follow" (
	"follower" integer NOT NULL,
	"followed" integer NOT NULL,
	CONSTRAINT "Follow_follower_followed_pk" PRIMARY KEY("follower","followed")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CommentLike" (
	"commentID" integer NOT NULL,
	"userID" integer NOT NULL,
	"like" boolean NOT NULL,
	CONSTRAINT "CommentLike_commentID_userID_pk" PRIMARY KEY("commentID","userID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"dislikes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userID" integer NOT NULL,
	"postID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostLike" (
	"postID" integer NOT NULL,
	"userID" integer NOT NULL,
	"like" boolean NOT NULL,
	CONSTRAINT "PostLike_postID_userID_pk" PRIMARY KEY("postID","userID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"dislikes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RecipeLike" (
	"recipeID" integer NOT NULL,
	"userID" integer NOT NULL,
	"like" boolean NOT NULL,
	CONSTRAINT "RecipeLike_recipeID_userID_pk" PRIMARY KEY("recipeID","userID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"userID" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "weight" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "height" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "dob" date NOT NULL;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "pregnancyTrimester" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "breastFeeding" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "allergens" integer[] NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "followers" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "following" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follower_User_id_fk" FOREIGN KEY ("follower") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followed_User_id_fk" FOREIGN KEY ("followed") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentID_Comment_id_fk" FOREIGN KEY ("commentID") REFERENCES "public"."Comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postID_Post_id_fk" FOREIGN KEY ("postID") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postID_Post_id_fk" FOREIGN KEY ("postID") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipeLike" ADD CONSTRAINT "RecipeLike_recipeID_Recipe_id_fk" FOREIGN KEY ("recipeID") REFERENCES "public"."Recipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipeLike" ADD CONSTRAINT "RecipeLike_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
