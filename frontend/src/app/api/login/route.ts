import fetch from "cross-fetch";
import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { LOGIN } from "@/graphql/mutations";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL,
    fetch,
  }),
  cache: new InMemoryCache(),
});

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: {
        loginInput: { email, password },
      },
    });

    const token = data.login.token;

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}
