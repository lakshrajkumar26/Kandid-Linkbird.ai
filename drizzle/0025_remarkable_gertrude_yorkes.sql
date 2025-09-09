ALTER TABLE "leads" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "updated_at" timestamp DEFAULT now();