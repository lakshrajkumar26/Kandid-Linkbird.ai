ALTER TABLE "users" RENAME TO "user ";--> statement-breakpoint
ALTER TABLE "user " DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_user _id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user "("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_user _id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user "("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user " ADD CONSTRAINT "user _email_unique" UNIQUE("email");