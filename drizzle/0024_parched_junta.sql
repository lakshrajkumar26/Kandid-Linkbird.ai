ALTER TABLE "campaigns" ADD COLUMN "activity" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "firstname";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "lastname";