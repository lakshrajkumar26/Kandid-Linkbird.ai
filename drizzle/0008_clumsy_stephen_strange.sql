ALTER TABLE "accounts" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "accounts_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "accounts_provider_provider_account_id_pk";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;