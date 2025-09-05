"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // ✅ Correct import
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Mail, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleEmailLogin() {
    // try {
    //   const { data, error } = await authClient.signIn.email({
    //     email,
    //     password,
    //     callbackURL: "/dashboard", // redirect after login
    //   });

    //   if (error) {
    //     console.error("Login failed:", error);
    //   } else {
    //     router.push("/dashboard");
    //   }
    // } catch (err) {
    //   console.error("Unexpected error:", err);
    // }
    router.push("/auth/login");
  }

  async function handleGoogleLogin() {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      console.error("Google login failed:", err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Continue with an account</h2>
        <p className="text-sm text-gray-500 mb-6">
          You must log in or register to continue.
        </p>

        {/* Google Login */}
        <Button
          className="w-full mb-4"
          variant="outline"
          type="button"
          onClick={handleGoogleLogin}
        >
          <LogIn className="mr-2 h-4 w-4" /> Continue with Google
        </Button>

             <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleEmailLogin}
          >
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
        <p className="mt-6 text-sm hover:underline">
          <Link  href="/auth/register">New User? Create New Account</Link>
        </p>
        <p className="text-sm text-gray-500 mb-6 pt-5 ">
          By continuing, you agree to our <span  className="mt-6 text-sm underline">Privacy Policy </span>and <span  className="mt-6 text-sm underline">T&Cs</span>
        </p>
      </div>
    </div>
  );
}
