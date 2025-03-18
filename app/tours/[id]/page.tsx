import { fetchBmTourDetail } from "@/lib/fetchTours";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Itinerary } from "@/types/tours";
import { Metadata } from "next";

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
      images: [getFileUrl(tour.itinerary?.images[0])],
    },
  };
}

export default async function TourDetailPage(props: { params: Params }) {
  const { id } = await props.params;
  const tour = await fetchBmTourDetail(id);
  const sectionComponents = {
    hero: HeroSection,
    imageText: AboutSection,
    form: FormSection,
    tours: ToursSection,
    youtube: YoutubeSection,
    cmsPosts: CmsPostsSection,
    gallery: GallerySection,
    contact: ContactSection,
  };

  // Use the function to render sections
  const renderedSections = renderSections({
    sections: pageData.pageItems as unknown as Section[],
    components: sectionComponents,
  });
  if (!tour) {
    return <div>Tour not found</div>;
  }

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
            <strong>Start Date:</strong> {new Date(tour.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Cost:</strong> ${tour.cost.toLocaleString()}
          </p>{" "}
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
