ALTER TABLE "account" RENAME COLUMN "provider_account_id" TO "provider_id";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "provider" SET DEFAULT 'credential';--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "type" SET DEFAULT 'credential';