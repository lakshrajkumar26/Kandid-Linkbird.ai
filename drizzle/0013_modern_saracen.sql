ALTER TABLE "account" RENAME COLUMN "user_id" TO "account_id";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_user _id_fk";
