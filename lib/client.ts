import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": process.env.ERXES_URL || "",
      },
    }),
  });
});
