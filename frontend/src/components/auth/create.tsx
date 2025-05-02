"use client";

import { useMutation } from "@apollo/client";
import { SIGN_UP } from "@/graphql/mutations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const [signUpMutation, { loading }] = useMutation(SIGN_UP);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // ✅ Reuse login to set token & user

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data, errors } = await signUpMutation({
        variables: { signUpInput: form },
      });

      if (errors || !data?.signUp?.token) {
        throw new Error("Signup failed");
      }

      // Send to server (e.g. to store token in a cookie)
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          token: data.signUp.token,
        }),
      });

      if (!res.ok) {
        throw new Error("Server token handling failed");
      }

      // ✅ Save token and user client-side
      login(data.signUp.token, data.signUp.user);

      // Redirect to departments page
      router.push("/departments");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
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
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {error && <p className="text-red-500">{error}</p>}

      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </form>
  );
}
