import React from "react";
import HeroSection from "../_components/sections/HeroSection";
import AboutSection from "../_components/sections/AboutSection";
import FormSection from "../_components/sections/FormSection";
import TextSection from "../_components/sections/TextSection";
import ContactSection from "../_components/sections/AboutSection";
import YoutubeSection from "../_components/sections/YoutubeSection";
import ToursSection from "../_components/sections/ToursSection";
import CmsPostsSection from "../_components/sections/CmsPostsSection";
import PostsSection from "../_components/sections/PostsSection";
import GallerySection from "../_components/sections/GallerySection";
import pageData from "@/data/pages/blogs.json";
import { renderSections } from "@/lib/renderSections";
import { Section } from "@/types/section";

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
		cmsPosts: CmsPostsSection,
		gallery: GallerySection,
		text: TextSection,
		contact: ContactSection,
	};

	const renderedSections = renderSections({
		sections: pageData.pageItems as Section[],
		components: sectionComponents,
	});

	return (
		<div className="min-h-screen bg-[hsl(0,0%,7%)]">
			<div>{renderedSections}</div>
		</div>
	)
}
