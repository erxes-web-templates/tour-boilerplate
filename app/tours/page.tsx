import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchBmTours, fetchBmToursGroup } from "@/lib/fetchTours";
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
import TextSection from "../_components/sections/TextSection";

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.description,
};

const page = async () => {
  const data = await fetchBmToursGroup(1, 100);
  console.log(data, "data from tours page");
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

  if (!data) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">No tours available</h2>
        <p className="text-gray-600">
          Please check back later or contact us for more information.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((tour: any) => (
          <Card key={tour.items[0]._id}>
            <CardHeader>
              {tour.items[0].imageThumbnail && (
                <div className="relative w-full h-[200px]">
                  <Image
                    src={getFileUrl(tour.items[0].imageThumbnail)}
                    alt={tour.items[0].name}
                    fill
                    className="rounded-md h-[200px]"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <CardTitle>{tour.items[0].name}</CardTitle>
              <CardDescription>
                <p
                  dangerouslySetInnerHTML={{ __html: tour.items[0].content }}
                />
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">{tour.items[0].cost}</span>
              <Link href={`/tours/${tour._id}`}>
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
