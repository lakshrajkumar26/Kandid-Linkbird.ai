"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // from Option 1 fix
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e :any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: `${form.firstName} ${form.lastName}`,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-500 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold mb-2">Register with email</h1>
        <p className="text-sm text-gray-500 mb-6">
          Register using your email address.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <label className="flex">First Name</label>
            <Input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <label className="flex">First Name</label>
            <Input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <label className="flex">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
           <label className="flex">Password</label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            className=" w-full bg-blue-600 text-white hover:bg-blue-700 border rounded-2xl mt-5 shadow-2xl"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create my account"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
