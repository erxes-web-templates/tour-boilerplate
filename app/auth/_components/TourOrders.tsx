"use client";

import { useQuery, gql } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarDays, Users, DollarSign, MapPin, FileText, AlertCircle } from "lucide-react";

const BM_ORDERS_QUERY = gql`
  query BmOrders($customerId: String) {
    bmOrders(customerId: $customerId) {
      total
      list {
        _id
        branchId
        customerId
        tourId
        amount
        status
        note
        numberOfPeople
        type
        additionalCustomers
        isChild
        parent
      }
    }
  }
`;

interface Order {
  _id: string;
  branchId: string;
  customerId: string;
  tourId: string;
  amount: number;
  status: string;
  note?: string;
  numberOfPeople: number;
  type: string;
  additionalCustomers?: any[];
  isChild: boolean;
  parent?: string;
}

interface BmOrdersData {
  bmOrders: {
    total: number;
    list: Order[];
  };
}

interface TourOrdersProps {
  customerId: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "halfPaid":
      return "bg-green-100 text-green-800 border-green-200";
    case "notPaid":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function TourOrders({ customerId }: TourOrdersProps) {
  const { loading, error, data } = useQuery<BmOrdersData>(BM_ORDERS_QUERY, {
    variables: { customerId },
    skip: !customerId,
  });

  console.log(data, "data");
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load tour orders: {error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!data?.bmOrders?.list?.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Tour Orders Found</h3>
          <p className="text-muted-foreground text-center">{`This customer hasn't made any tour bookings yet.`}</p>
        </CardContent>
      </Card>
    );
  }

  const { total, list: orders } = data.bmOrders;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tour Orders</h2>
        <Badge variant="secondary" className="text-sm">
          {total} {total === 1 ? "Order" : "Orders"}
        </Badge>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order._id} className="hover:shadow-md transition-shadow rounded-lg">
            <CardHeader className="p-3 pb-3">
              <div className="flex items-start justify-between">
                {/* <div>
                  <CardTitle className="text-lg">
                    Order #{order._id.slice(-8)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tour ID: {order.tourId}
                  </p>
                </div> */}
                <div className="flex gap-2">
                  <Badge className={getStatusColor(order.status)}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Badge>
                  {/* <Badge className={getTypeColor(order.type)}>
                    {order.type}
                  </Badge> */}
                  {order.isChild && (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      Child Order
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-semibold">${order.amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">People</p>
                    <p className="font-semibold">{order.numberOfPeople}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Branch</p>
                    <p className="font-semibold">{order.branchId}</p>
                  </div>
                </div>

                {order.additionalCustomers && order.additionalCustomers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Additional</p>
                      <p className="font-semibold">{order.additionalCustomers.length} customers</p>
                    </div>
                  </div>
                )}
              </div>

              {order.note && (
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Note</p>
                    <p className="text-sm">{order.note}</p>
                  </div>
                </div>
              )}

              {order.parent && <div className="text-sm text-muted-foreground">Parent Order: {order.parent}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
