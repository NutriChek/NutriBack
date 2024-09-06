DO $$ BEGIN
 CREATE TYPE "public"."RecipeComplexity" AS ENUM('Beginner', 'Intermediate', 'Advanced');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Contest" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Follow" (
	"follower" integer NOT NULL,
	"followed" integer NOT NULL,
	CONSTRAINT "Follow_follower_followed_pk" PRIMARY KEY("follower","followed")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Goal" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"value" integer NOT NULL,
	"userID" integer NOT NULL,
	"until" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CommentLike" (
	"commentID" integer NOT NULL,
	"userID" integer NOT NULL,
	CONSTRAINT "CommentLike_commentID_userID_pk" PRIMARY KEY("commentID","userID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userID" integer NOT NULL,
	"postID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostLike" (
	"postID" integer NOT NULL,
	"userID" integer NOT NULL,
	CONSTRAINT "PostLike_postID_userID_pk" PRIMARY KEY("postID","userID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userID" integer NOT NULL,
	"recipeID" integer NOT NULL,
	"tierID" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profile" (
	"id" integer PRIMARY KEY NOT NULL,
	"bodyProfile" jsonb DEFAULT '{"height":180,"weight":100,"age":25,"activityLevel":1.7,"sex":"male","pregnant":false,"trimester":0,"breastfeeding":false}'::jsonb NOT NULL,
	"nutritionalPreferences" jsonb DEFAULT '{"nutriscore":4,"lowSalt":false,"lowSugar":false,"lowFat":false,"lowSaturatedFat":false,"palmOil":false,"diet":"None","restricted":[],"allergens":[]}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RecipeLike" (
	"recipeID" integer NOT NULL,
	"userID" integer NOT NULL,
	CONSTRAINT "RecipeLike_recipeID_userID_pk" PRIMARY KEY("recipeID","userID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RecipePackPurchase" (
	"userID" integer NOT NULL,
	"recipePackID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RecipePack" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"private" boolean NOT NULL,
	"price" integer,
	"userID" integer NOT NULL,
	"tierID" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RecipePurchase" (
	"userID" integer NOT NULL,
	"recipeID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RecipeToRecipePack" (
	"recipeID" integer NOT NULL,
	"recipePackID" integer NOT NULL,
	CONSTRAINT "RecipeToRecipePack_recipeID_recipePackID_pk" PRIMARY KEY("recipeID","recipePackID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"steps" text[] NOT NULL,
	"utensils" jsonb[] NOT NULL,
	"cookingMethods" text[] NOT NULL,
	"allergens" text[] NOT NULL,
	"complexity" "RecipeComplexity" NOT NULL,
	"duration" integer NOT NULL,
	"private" boolean NOT NULL,
	"price" integer,
	"images" text[] NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userID" integer NOT NULL,
	"tierID" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Team" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"leaderID" integer NOT NULL,
	"contestID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tier" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"level" integer NOT NULL,
	"price" integer NOT NULL,
	"userID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserToContestTeam" (
	"userID" integer NOT NULL,
	"teamID" integer NOT NULL,
	CONSTRAINT "UserToContestTeam_userID_teamID_pk" PRIMARY KEY("userID","teamID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserToTier" (
	"userID" integer NOT NULL,
	"tierID" integer NOT NULL,
	CONSTRAINT "UserToTier_userID_tierID_pk" PRIMARY KEY("userID","tierID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"picture" text,
	"password" text NOT NULL,
	"premium" boolean DEFAULT false NOT NULL,
	"followers" integer DEFAULT 0 NOT NULL,
	"following" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email"),
	CONSTRAINT "User_username_unique" UNIQUE("username")
);
--> statement-breakpoint
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
 ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentID_Comment_id_fk" FOREIGN KEY ("commentID") REFERENCES "public"."Comment"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "Post" ADD CONSTRAINT "Post_recipeID_Recipe_id_fk" FOREIGN KEY ("recipeID") REFERENCES "public"."Recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_tierID_Tier_id_fk" FOREIGN KEY ("tierID") REFERENCES "public"."Tier"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_User_id_fk" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipeLike" ADD CONSTRAINT "RecipeLike_recipeID_Recipe_id_fk" FOREIGN KEY ("recipeID") REFERENCES "public"."Recipe"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "RecipePackPurchase" ADD CONSTRAINT "RecipePackPurchase_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipePackPurchase" ADD CONSTRAINT "RecipePackPurchase_recipePackID_RecipePack_id_fk" FOREIGN KEY ("recipePackID") REFERENCES "public"."RecipePack"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipePack" ADD CONSTRAINT "RecipePack_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipePack" ADD CONSTRAINT "RecipePack_tierID_Tier_id_fk" FOREIGN KEY ("tierID") REFERENCES "public"."Tier"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipePurchase" ADD CONSTRAINT "RecipePurchase_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipePurchase" ADD CONSTRAINT "RecipePurchase_recipeID_Recipe_id_fk" FOREIGN KEY ("recipeID") REFERENCES "public"."Recipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipeToRecipePack" ADD CONSTRAINT "RecipeToRecipePack_recipeID_Recipe_id_fk" FOREIGN KEY ("recipeID") REFERENCES "public"."Recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RecipeToRecipePack" ADD CONSTRAINT "RecipeToRecipePack_recipePackID_RecipePack_id_fk" FOREIGN KEY ("recipePackID") REFERENCES "public"."RecipePack"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_tierID_Tier_id_fk" FOREIGN KEY ("tierID") REFERENCES "public"."Tier"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Team" ADD CONSTRAINT "Team_leaderID_User_id_fk" FOREIGN KEY ("leaderID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Team" ADD CONSTRAINT "Team_contestID_Contest_id_fk" FOREIGN KEY ("contestID") REFERENCES "public"."Contest"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tier" ADD CONSTRAINT "Tier_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserToContestTeam" ADD CONSTRAINT "UserToContestTeam_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserToContestTeam" ADD CONSTRAINT "UserToContestTeam_teamID_Team_id_fk" FOREIGN KEY ("teamID") REFERENCES "public"."Team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserToTier" ADD CONSTRAINT "UserToTier_userID_User_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserToTier" ADD CONSTRAINT "UserToTier_tierID_Tier_id_fk" FOREIGN KEY ("tierID") REFERENCES "public"."Tier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
