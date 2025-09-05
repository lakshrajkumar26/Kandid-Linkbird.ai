ALTER TABLE "user" ADD COLUMN "firstname" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastname" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "name";