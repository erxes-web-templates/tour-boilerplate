import React from "react";
import pageData from "@/data/pages/about.json";
import { renderSections } from "@/lib/renderSections";
import ToursSection from "../_components/sections/ToursSection";
import HeroSection from "../_components/sections/HeroSection";
import AboutSection from "../_components/sections/AboutSection";
import FormSection from "../_components/sections/FormSection";
import YoutubeSection from "../_components/sections/YoutubeSection";

export const metadata = {
  title: pageData.title,
  description: pageData.description,
};

const page = () => {
  const sectionComponents = {
    hero: HeroSection,
    imageText: AboutSection,
    form: FormSection,
    tours: ToursSection,
    youtube: YoutubeSection,
  };

  // Use the function to render sections
  const renderedSections = renderSections({
    sections: pageData.pageItems,
    components: sectionComponents,
  });

  return <div>{renderedSections}</div>;
};

export default page;
