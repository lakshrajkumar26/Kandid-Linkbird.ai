import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// exports methods Next expects ({ GET, POST, ... })
export const { GET, POST } = toNextJsHandler(auth);
