import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBmTours } from "@/lib/fetchTours";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import pageData from "@/data/pages/tours.json";
import React from "react";
import { getFileUrl } from "@/lib/utils";
import { Metadata } from "next";
import { renderSections } from "@/lib/renderSections";
import { Section } from "@/types/section";
import HeroSection from "../_components/sections/HeroSection";
import AboutSection from "../_components/sections/AboutSection";
import FormSection from "../_components/sections/FormSection";
import ToursSection from "../_components/sections/ToursSection";
import YoutubeSection from "../_components/sections/YoutubeSection";
import CmsPostsSection from "../_components/sections/CmsPostsSection";
import GallerySection from "../_components/sections/GallerySection";
import ContactSection from "../_components/sections/ContactSection";

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.description,
};

const page = async () => {
  const { list } = await fetchBmTours(1, 4);
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((tour) => (
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
              <Link href={`tours/${tour._id}`}>
                {" "}
                <Button>Read more</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {renderedSections}
    </>
  );
};

export default page;
