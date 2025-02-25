"use client";

import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { TOUR_DETAIL_QUERY } from "../../../graphql/queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function TourDetailPage() {
  const searchParams = useSearchParams();

  const tourId = searchParams.get("tourId");

  const { data } = useQuery(TOUR_DETAIL_QUERY, {
    variables: {
      id: tourId,
    },
  });

  const tour = data?.bmTourDetail || {};

  console.log(tour, "rour page");
  return (
    <div className="container mx-auto p-4">
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
            <strong>Start Date:</strong>{" "}
            {new Date(tour.startDate).toLocaleDateString()}
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
    </div>
  );
}
