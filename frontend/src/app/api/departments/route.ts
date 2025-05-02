import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import fetch from "cross-fetch";
import {
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  REMOVE_DEPARTMENT,
} from "@/graphql/mutations";
import { GET_ALL_DEPARTMENTS } from "@/graphql/queries";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL,
    fetch,
  }),
  cache: new InMemoryCache(),
});

// GET: Fetch all departments with pagination
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "10", 10);

  // Extract the token from the Authorization header
  const authHeader = req.headers.get("Authorization");

  // If the token is not provided, return an error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authorization token is required" },
      { status: 401 }
    );
  }

  // Extract the actual token (after 'Bearer ' prefix)
  const token = authHeader.split(" ")[1];

  try {
    const { data } = await client.query({
      query: GET_ALL_DEPARTMENTS,
      variables: { skip, take },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token to the server
        },
      },
    });

    return NextResponse.json({ departments: data.getAllDepartments });
  } catch (err: any) {
    console.error("Fetch departments failed:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
// Create Department (POST)
export async function POST(req: Request) {
  const body = await req.json();
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authorization token is required" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("body:", body);
    const { data } = await client.mutate({
      mutation: CREATE_DEPARTMENT,
      variables: {
        input: body,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    console.log("body:", body);

    return NextResponse.json({ department: data.createDepartment });
  } catch (err: any) {
    console.error("Error creating department:", err);
    return NextResponse.json({ error: "Create failed..." }, { status: 500 });
  }
}

// Update Department (PUT)
export async function PUT(req: Request) {
  const body = await req.json();

  try {
    const { data } = await client.mutate({
      mutation: UPDATE_DEPARTMENT,
      variables: {
        updateDepartmentInput: body,
      },
    });

    return NextResponse.json({ department: data.updateDepartment });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// Remove Department (DELETE)
export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    const { data } = await client.mutate({
      mutation: REMOVE_DEPARTMENT,
      variables: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ removed: data.removeDepartment });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
