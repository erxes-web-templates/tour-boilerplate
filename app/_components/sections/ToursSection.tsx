import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { TOURS_QUERY } from "../../../graphql/queries";
import { getFileUrl, templateUrl } from "../../../../../../../lib/utils";
import { Section } from "../../../types/sections";
import { BmTour } from "../../../types/tours";

const ToursSection = ({ section }: { section: Section }) => {
  const { data } = useQuery(TOURS_QUERY, {
    variables: {
      perPage: 6,
      page: 1,
    },
  });
  console.log(section, "section");
  const tours = data?.bmTours?.list || [];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour: BmTour) => (
            <Card key={tour._id}>
              <CardHeader>
                {tour.itinerary?.images[0] && (
                  <Image src={getFileUrl(tour.itinerary.images[0])} alt={tour.name} width={300} height={200} className="rounded-t-lg" />
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
                <Link href={templateUrl(`/tour&tourId=${tour._id}`)}>
                  {" "}
                  <Button>Book Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className=" text-center mt-6 ">
          <Link className="underline" href={templateUrl("/tours")}>
            Show All tours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
