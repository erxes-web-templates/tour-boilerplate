import {
  fetchBmTourDetail,
  fetchBmToursGroup,
  fetchBmToursGroupDetail,
} from "@/lib/fetchTours";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Itinerary } from "@/types/tours";
import { Metadata } from "next";
import Image from "next/image";
import pageData from "@/data/pages/tour.json";
import { getFileUrl } from "@/lib/utils";
import { renderSections } from "@/lib/renderSections";
import { Section } from "@/types/section";
import HeroSection from "../../_components/sections/HeroSection";
import AboutSection from "../../_components/sections/AboutSection";
import FormSection from "../../_components/sections/FormSection";
import ToursSection from "../../_components/sections/ToursSection";
import YoutubeSection from "../../_components/sections/YoutubeSection";
import CmsPostsSection from "../../_components/sections/CmsPostsSection";
import GallerySection from "../../_components/sections/GallerySection";
import ContactSection from "../../_components/sections/ContactSection";
import TextSection from "@/app/_components/sections/TextSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Params = Promise<{ id: string }>;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  const tour = await fetchBmTourDetail(id);

  if (!tour) {
    return {
      title: "Tour not found",
      description: "",
      openGraph: {
        images: [],
      },
    };
  }

  return {
    title: tour.name,
    description: tour.content,
    openGraph: {
      images: [getFileUrl(tour.imageThumbnail)],
    },
  };
}

export default async function TourDetailPage(props: { params: Params }) {
  const { id } = await props.params;
  const groupTour = await fetchBmToursGroupDetail(id);

  //@ts-expect-error test
  const tourId: string = groupTour?.items[0]._id || ""; // Fallback to id if not found in groupTour
  const tour = await fetchBmTourDetail(tourId);
  const sectionComponents = {
    hero: HeroSection,
    imageText: AboutSection,
    form: FormSection,
    tours: ToursSection,
    youtube: YoutubeSection,
    cmsPosts: CmsPostsSection,
    gallery: GallerySection,
    contact: ContactSection,
    text: TextSection,
  };

  // Use the function to render sections
  const renderedSections = renderSections({
    sections: pageData.pageItems as unknown as Section[],
    components: sectionComponents,
  });
  if (!tour) {
    return <div>Tour not found</div>;
  }
  console.log(tour, "detail");
  return (
    <div className="container mx-auto p-4">
      {tour.imageThumbnail && (
        <div className="relative w-full h-[500px]">
          <Image
            src={getFileUrl(tour.imageThumbnail)}
            alt={tour.name}
            fill
            className="rounded-md "
          />
        </div>
      )}
      <div className="flex gap-3 my-3">
        {tour.images &&
          tour.images.map((image: any, index: number) => (
            <div key={index} className="relative w-[300px] h-[200px]">
              <Image
                src={getFileUrl(image)}
                alt={tour.name}
                fill
                className="rounded-md "
              />
            </div>
          ))}
      </div>

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{tour.name}</h1>
        <div className="flex gap-3 justify-end">
          <Link className="pt-3" href={"/inquiry?tourId=" + tour.groupCode}>
            Inquire now
          </Link>

          <Link
            className="bg-slate-800 text-white px-4 pt-3 rounded-md block"
            href={"/booking?tourId=" + tour.groupCode}
          >
            Book tour
          </Link>
        </div>
      </div>
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
            <strong>Cost:</strong> ${tour.cost.toLocaleString()}
          </p>
          {tour.itinerary && (
            <div className="itineraries">
              <Accordion type="single" collapsible className="w-full">
                {tour.itinerary.map((itinerary: Itinerary, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{itinerary.name}</AccordionTrigger>
                    <AccordionContent>{itinerary.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* <div>
            <h2 className="text-xl font-semibold mb-2">Available Dates</h2>
            <ul className="list-disc pl-5">
              {groupTours &&
                groupTours.map((groupTour: any) => (
                  <li key={groupTour.items[0]._id}>
                    <Link href={`/tours?tourId=${groupTour.items[0]._id}`}>
                      {new Date(
                        groupTour.items[0].startDate
                      ).toLocaleDateString()}{" "}
                      - {groupTour.items[0].name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div> */}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{tour.content}</p>
        </div>
      </div>
      <div> {renderedSections}</div>
    </div>
  );
}
