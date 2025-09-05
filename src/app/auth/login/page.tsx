"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleEmailLogin() {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard", // redirect after login
      });

      if (error) {
        console.error("Login failed:", error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  // async function handleGoogleLogin() {
  //   try {
  //     const data = await authClient.signIn.social({
  //       provider: "google",
  //       callbackURL: "/dashboard",
  //     });
  //   } catch (err) {
  //     console.error("Google login failed:", err);
  //   }
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full min-h-lg  max-w-sm text-center">
       
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-500 mb-4 flex"
        >
          ← Back
        </button>

        <h2 className="text-xl font-semibold mb-2 flex">Login with email</h2>
        <p className="text-sm text-gray-500 mb-6 flex ">
          Login using your email address.
        </p>

        {/* Google Login */}
        {/* <Button
          className="w-full mb-4"
          variant="outline"
          type="button"
          onClick={handleGoogleLogin}
        >
          <LogIn className="mr-2 h-4 w-4" /> Continue with Google
        </Button> */}

        {/* Email Login */}
        <span className="flex my-2">Email or Username</span>
        <div className="space-y-2 mb-4">
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="flex py-2" >Password</label>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700 border rounded-2xl mt-5 shadow-2xl"
            onClick={handleEmailLogin}
          >
             Login 
          </Button> 
        </div>

        <div className="flex justify-around items-center ">
            <p className="mt-6 text-sm text-gray-500 ">
          <Link href="/auth/register" className=" font-medium">
            Forgot password{" "}
          </Link>
        </p>
        <p className="mt-6 text-sm text-gray-500 ">
          <Link href="/auth/register" className=" font-medium">
            Create New Account{" "}
          </Link>
        </p>
        </div>
        
      </div>
    </div>
  );
}
