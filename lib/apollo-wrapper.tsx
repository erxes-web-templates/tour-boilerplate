"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import {
  ApolloNextAppProvider,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { AuthProvider } from "./AuthContext";

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.ERXES_API_URL,
    credentials: "include", // Include cookies
    headers: {
      "Access-Control-Allow-Origin": process.env.ERXES_URL || "",
    },
    fetchOptions: { cache: "no-store" },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloNextAppProvider>
  );
}
