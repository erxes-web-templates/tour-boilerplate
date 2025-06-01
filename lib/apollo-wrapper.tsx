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
      // Remove the CORS header - it's not needed here
      "erxes-app-token": process.env.ERXES_APP_TOKEN || "",
    },
    fetchOptions: { cache: "no-store" },
  });
  const link =
    typeof window === "undefined"
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : httpLink;

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloNextAppProvider>
  );
}
