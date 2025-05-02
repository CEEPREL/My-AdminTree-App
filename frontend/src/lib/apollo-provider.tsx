"use client";

import { ReactNode, useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "@/context/AuthContext";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL,
    });

    const authLink = setContext((_, { headers }) => {
      console.log("token:", token);

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
