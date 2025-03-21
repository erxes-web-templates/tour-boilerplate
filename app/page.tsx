import pageData from "@/data/pages/index.json";
import ToursSection from "./_components/sections/ToursSection";
import HeroSection from "./_components/sections/HeroSection";
import AboutSection from "./_components/sections/AboutSection";
import FormSection from "./_components/sections/FormSection";
import YoutubeSection from "./_components/sections/YoutubeSection";
import { renderSections } from "@/lib/renderSections";
import { Section } from "@/types/section";
import CmsPostsSection from "./_components/sections/CmsPostsSection";
import GallerySection from "./_components/sections/GallerySection";
import ContactSection from "./_components/sections/ContactSection";
import TextSection from "./_components/sections/TextSection";

export const metadata = {
  title: pageData.title,
  description: pageData.description,
};

export default function Home() {
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

  return <div className="home">{renderedSections}</div>;
}
