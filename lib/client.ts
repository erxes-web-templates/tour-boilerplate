import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.ERXES_API_URL,
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": process.env.ERXES_URL || "",
        "erxes-app-token": process.env.ERXES_APP_TOKEN || "",
      },
    }),
  });
});
