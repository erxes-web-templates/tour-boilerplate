"use client";

import { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  Package,
  MapPin,
  Calendar,
  Clock,
  Loader2,
  CreditCard,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CURRENT_USER } from "../_graphql/queries";
import { UserEditDialog } from "@/components/forms/UserEditForm";
import Link from "next/link";
import TourOrders from "../_components/TourOrders";
// import { Badge } from "@/components/ui/badge"

const EDIT_USER = gql`
  mutation ClientPortalUsersEdit(
    $id: String!
    $clientPortalId: String
    $phone: String
    $email: String
    $firstName: String
    $lastName: String
  ) {
    clientPortalUsersEdit(
      _id: $id
      clientPortalId: $clientPortalId
      phone: $phone
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      _id
    }
  }
`;

export default function ProfilePage() {
  // Fetch current user data
  const { loading, error, data } = useQuery(CURRENT_USER);

  const [editUser] = useMutation(EDIT_USER, {
    onCompleted: (data) => {
      console.log("User updated successfully", data);
    },
    onError: (error) => {
      console.error("Error updating user", error);
    },
  });

  const handleEditUser = (userData: any) => {
    editUser({
      variables: {
        id: data.clientPortalCurrentUser._id,
        ...userData,
      },
    });
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading profile...</span>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center">
        <p className="text-lg text-red-500">
          Error loading profile: {error.message}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
        <Link href="/auth/login" className="mt-2 text-blue-500 hover:underline">
          Log in
        </Link>
      </div>
    );
  }

  const user = data?.clientPortalCurrentUser || {};
  const initials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : user.username?.substring(0, 2).toUpperCase() || "U";

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            View and manage your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  First Name
                </h3>
                <p className="text-base">{user.firstName}</p>
              </div>{" "}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Last Name
                </h3>
                <p className="text-base">{user.lastName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Username
                </h3>
                <p className="text-base">{user.username}</p>
              </div>{" "}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Email
                </h3>
                <p className="text-base">{user.email}</p>
              </div>{" "}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Phone number
                </h3>
                <p className="text-base">{user.phone}</p>
              </div>{" "}
              <div className="pt-4">
                <UserEditDialog user={user} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>My Tours</CardTitle>
          <CardDescription>View your booked and upcoming tours</CardDescription>
        </CardHeader>
        <CardContent>
          {user && <TourOrders customerId={user.erxesCustomerId} />}
        </CardContent>
      </Card>
    </div>
  );
}
