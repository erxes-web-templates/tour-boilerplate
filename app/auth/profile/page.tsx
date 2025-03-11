"use client";

import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Package, MapPin, Calendar, Clock, Loader2, CreditCard } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge"

// GraphQL query for current user
const CURRENT_USER = gql`
  query ClientPortalCurrentUser {
    clientPortalCurrentUser {
      _id
      clientPortalId
      firstName
      fullName
      lastName
      username
      avatar
    }
  }
`;

// Mock data for tours/orders
const mockOrders = [
  {
    id: "ord-001",
    date: new Date(2023, 10, 15),
    status: "completed",
    total: 1299.99,
    tour: {
      id: "tour-001",
      title: "Grand Canyon Adventure",
      image: "/placeholder.svg?height=200&width=300",
      location: "Arizona, USA",
      duration: "5 days",
      startDate: new Date(2023, 11, 10),
      endDate: new Date(2023, 11, 15),
    },
  },
  {
    id: "ord-002",
    date: new Date(2023, 9, 22),
    status: "completed",
    total: 2499.99,
    tour: {
      id: "tour-002",
      title: "Paris City Explorer",
      image: "/placeholder.svg?height=200&width=300",
      location: "Paris, France",
      duration: "7 days",
      startDate: new Date(2023, 10, 5),
      endDate: new Date(2023, 10, 12),
    },
  },
  {
    id: "ord-003",
    date: new Date(2024, 1, 5),
    status: "upcoming",
    total: 1899.99,
    tour: {
      id: "tour-003",
      title: "Tokyo Cultural Tour",
      image: "/placeholder.svg?height=200&width=300",
      location: "Tokyo, Japan",
      duration: "10 days",
      startDate: new Date(2024, 3, 15),
      endDate: new Date(2024, 3, 25),
    },
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch current user data
  const { loading, error, data } = useQuery(CURRENT_USER);

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
        <p className="text-lg text-red-500">Error loading profile: {error.message}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  const user = data?.clientPortalCurrentUser || {};
  const initials = user.firstName && user.lastName ? `${user.firstName[0]}${user.lastName[0]}` : user.username?.substring(0, 2).toUpperCase() || "U";

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">My Tours</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                  ) : (
                    <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                  )}
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                    <p className="text-base">{user.fullName || `${user.firstName} ${user.lastName}`}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Username</h3>
                    <p className="text-base">{user.username}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>My Tours</CardTitle>
              <CardDescription>View your booked and upcoming tours</CardDescription>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No tours booked yet</h3>
                  <p className="mt-2 text-muted-foreground">When you book tours, they will appear here.</p>
                  <Button className="mt-4">Browse Tours</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="rounded-lg border overflow-hidden">
                      <div className="bg-muted p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Order #{order.id}</p>
                          {/* <p className="text-sm text-muted-foreground">
                            Booked on {format(order.date, "MMMM d, yyyy")}
                          </p> */}
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium mr-2">${order.total.toFixed(2)}</p>
                          {/* <Badge variant={order.status === "upcoming" ? "outline" : "default"}>
                            {order.status === "upcoming" ? "Upcoming" : "Completed"}
                          </Badge> */}
                        </div>
                      </div>

                      <div className="p-4 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3">
                          <img src={order.tour.image || "/placeholder.svg"} alt={order.tour.title} className="w-full h-48 object-cover rounded-md" />
                        </div>
                        <div className="md:w-2/3 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold">{order.tour.title}</h3>
                            <div className="flex items-center mt-2">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{order.tour.location}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Start Date</p>
                                <p className="text-sm text-muted-foreground">{/* {format(order.tour.startDate, "MMMM d, yyyy")} */}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">End Date</p>
                                <p className="text-sm text-muted-foreground">{/* {format(order.tour.endDate, "MMMM d, yyyy")} */}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Duration</p>
                                <p className="text-sm text-muted-foreground">{order.tour.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Total Paid</p>
                                <p className="text-sm text-muted-foreground">${order.total.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {order.status === "upcoming" && (
                              <Button variant="outline" size="sm">
                                Download Itinerary
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
