CREATE TABLE IF NOT EXISTS "Profile" (
	"id" integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email"),
	CONSTRAINT "Users_username_unique" UNIQUE("username")
);
