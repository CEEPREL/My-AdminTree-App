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
  const { login } = useAuth(); // ✅ use AuthContext

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

      // Store token on server (if needed, e.g. for HttpOnly cookies)
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

      // ✅ Now update client-side AuthContext
      login(data.login.token, data.login.user);

      // Redirect
      router.push("/departments");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
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
          Don't have an account?{" "}
          <a href="/create-user" className="text-blue-600 hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </form>
  );
}
