import { NextResponse } from "next/server";
import { SIGN_UP } from "@/graphql/mutations";
import client from "@/lib/apollo-client";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  try {
    const { data } = await client.mutate({
      mutation: SIGN_UP,
      variables: {
        signUpInput: {
          name,
          email,
          password,
        },
      },
    });

    return NextResponse.json({
      token: data.signUp.token,
      user: data.signUp.user,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}
