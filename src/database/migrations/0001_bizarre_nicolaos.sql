ALTER TABLE "Users" RENAME TO "User";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "Users_email_unique";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "Users_username_unique";--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_username_unique" UNIQUE("username");