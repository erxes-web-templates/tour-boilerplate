import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchBmTours } from "@/lib/fetchTours";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import React from "react";
import { getFileUrl } from "@/lib/utils";

const page = async () => {
  const { list } = await fetchBmTours(1, 4);

  console.log(list, " list");
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((tour) => (
          <Card key={tour._id}>
            <CardHeader>
              {tour.itinerary?.images[0] && (
                <Image
                  src={getFileUrl(tour.itinerary.images[0])}
                  alt={tour.name}
                  width={300}
                  height={200}
                  className="rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent>
              <CardTitle>{tour.name}</CardTitle>
              <CardDescription>
                <p dangerouslySetInnerHTML={{ __html: tour.content }} />
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">{tour.cost}</span>
              <Link href={`tours/${tour._id}`}>
                {" "}
                <Button>Read more</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default page;
