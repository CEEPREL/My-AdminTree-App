"use client";

import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [loginMutation, { loading }] = useMutation(LOGIN);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data, errors } = await loginMutation({
        variables: { loginInput: form },
      });

      if (errors || !data?.login?.token) {
        throw new Error("Invalid credentials");
      }

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          token: data.login.token,
        }),
      });

      if (!res.ok) {
        throw new Error("Server login failed");
      }

      login(data.login.token, data.login.user);
      router.push("/departments");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Clipboard copy failed:", err);
    });
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center justify-between text-sm bg-gray-100 p-3 rounded mb-4">
        <div className="flex gap-2 items-center">
          <span className="font-medium">Email:</span>
          <span className="text-gray-700">you-are-hired@tactology.com</span>
        </div>
        <button
          onClick={() => copyToClipboard("youarehired@tactology.com")}
          className="text-blue-600 hover:underline text-xs"
        >
          Copy
        </button>
      </div>

      <div className="flex items-center justify-between text-sm bg-gray-100 p-3 rounded mb-4">
        <div className="flex gap-2 items-center">
          <span className="font-medium">Password:</span>
          <span className="text-gray-700">123345</span>
        </div>
        <button
          onClick={() => copyToClipboard("123345")}
          className="text-blue-600 hover:underline text-xs"
        >
          Copy
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500">{error}</p>}

        <div className="text-center mt-4">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/create-user" className="text-blue-600 hover:underline">
              Create Account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
