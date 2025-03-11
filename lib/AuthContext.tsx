"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { gql, useQuery } from "@apollo/client";
// import { useRouter } from "next/navigation";

interface User {
  _id: string;
  details: {
    avatar: string;
    firstName: string;
    fullName: string;
    lastName: string;
    shortName: string;
  };
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User | null>(null);
  // const router = useRouter();

  const ME_QUERY = gql`
    query me {
      clientPortalCurrentUser {
        _id
        details {
          avatar
          firstName
          fullName
          lastName
          shortName
        }
        username
        email
      }
    }
  `;

  const { data, loading } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  const currentUser = data?.clientPortalCurrentUser;

  console.log(currentUser, "currentUser");

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Export the context for use in other files
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
