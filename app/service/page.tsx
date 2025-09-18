import React from "react";
import HeroSection from "../_components/sections/HeroSection";
import AboutSection from "../_components/sections/AboutSection";
import FormSection from "../_components/sections/FormSection";
import TextSection from "../_components/sections/TextSection";
import ContactSection from "../_components/sections/AboutSection";
import YoutubeSection from "../_components/sections/YoutubeSection";
import ToursSection from "../_components/sections/ToursSection";
import GallerySection from "../_components/sections/GallerySection";
import pageData from "@/data/pages/service.json";
import { renderSections } from "@/lib/renderSections";
import { Section } from "@/types/section";
import data from "@/data/configs.json";
import { getFileUrl } from "@/lib/utils";

export const metadata = {
  title: pageData.title,
  description: pageData.description,
};


export default async function Blogs() {
  const sectionComponents = {
    hero: HeroSection,
    imageText: AboutSection,
    form: FormSection,
    tours: ToursSection,
    youtube: YoutubeSection,
    gallery: GallerySection,
    text: TextSection,
    contact: ContactSection,
  };

  const renderedSections = renderSections({
    sections: pageData.pageItems as Section[],
    components: sectionComponents,
  });

  return (
    <div className="min-h-screen bg-primary">
      <div>{renderedSections}</div>
    </div>
  )
}
