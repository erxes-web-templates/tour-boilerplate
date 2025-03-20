"use client";

import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { TOUR_DETAIL_QUERY } from "../../../graphql/queries";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import usePage from "../../../lib/usePage";
import Image from "next/image";
import { getFileUrl } from "../../../../../../../lib/utils";
export default function TourDetailPage() {
  const searchParams = useSearchParams();

  const pageName = searchParams.get("pageName"); //pageName = about, tours, contact etc

  const PageContent = usePage(pageName);

  const tourId = searchParams.get("tourId");

  const { data } = useQuery(TOUR_DETAIL_QUERY, {
    variables: {
      id: tourId,
    },
  });

  const tour = data?.bmTourDetail || {};

  return (
    <div className="container mx-auto p-4">
      {tour.imageThumbnail && (
        <div className="relative w-full h-[500px]">
          <Image src={getFileUrl(tour.imageThumbnail)} alt={tour.name} fill className="rounded-md " />
        </div>
      )}
      <div className="flex gap-3 my-3">
        {tour.images &&
          tour.images.map((image: any, index: number) => (
            <div key={index} className="relative w-[300px] h-[200px]">
              <Image src={getFileUrl(image)} alt={tour.name} fill className="rounded-md " />
            </div>
          ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">{tour.name}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Reference Number:</strong> {tour.refNumber}
          </p>
          <p>
            <strong>Status:</strong> {tour.status}
          </p>
          <p>
            <strong>Start Date:</strong> {new Date(tour.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Cost:</strong> ${tour?.cost?.toLocaleString()}
          </p>{" "}
          {tour.itinerary && (
            <div className="itineraries">
              <Accordion type="single" collapsible className="w-full">
                {tour.itinerary.map((itinerary: any, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{itinerary.name}</AccordionTrigger>
                    <AccordionContent>{itinerary.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{tour.content}</p>
        </div>
      </div>
      <div>
        <PageContent />
      </div>
    </div>
  );
}
