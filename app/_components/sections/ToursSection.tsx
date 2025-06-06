import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { fetchBmTours, fetchBmToursGroup } from "@/lib/fetchTours";
import Link from "next/link";
import { getFileUrl } from "@/lib/utils";
import { Section } from "@/types/section";
const ToursSection = async ({ section }: { section: Section }) => {
  // const tours = await fetchBmTours(1, section?.config?.limit || 6, { status: "website" });
  const toursGroup = await fetchBmToursGroup(1, section?.config?.limit || 6);
  console.log(toursGroup, "toursGroup from ToursSection");
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{section?.config?.title || "Featured Tours"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursGroup?.map((group: any) => {
            const tour = group.items[0];
            return (
              <Card key={tour._id}>
                <CardHeader>
                  {tour.imageThumbnail && (
                    <div className="relative w-full h-[200px]">
                      <Image src={getFileUrl(tour.imageThumbnail)} alt={tour.name} fill className="rounded-md h-[200px]" />
                    </div>
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
                  <Link href={`tours/${tour.groupCode}`}>
                    {" "}
                    <Button>Book Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className=" text-center mt-6 ">
          <Link className="underline" href="/tours">
            Show All tours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
