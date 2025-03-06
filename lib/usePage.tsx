"use client";

import { Section } from "../types/sections";
import { GET_CMS_PAGE } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import AboutSection from "../app/_components/sections/AboutSection";
import ToursSection from "../app/_components/sections/ToursSection";
import HeroSection from "../app/_components/sections/HeroSection";
import FormSection from "../app/_components/sections/FormSection";
import YoutubeSection from "../app/_components/sections/YoutubeSection";
import CircleLoader from "../../../../../components/common/CircleLoader";
import EmptyState from "../../../../../components/common/EmptyState";
const usePage = (slug: string | null) => {
  const params = useParams<{ id: string }>();
  const { data: pageData } = useQuery(GET_CMS_PAGE, {
    variables: {
      slug: slug,
    },
    context: {
      headers: {
        "client-portal-id": params.id,
      },
    },
  });

  const sections = pageData?.cmsPage?.pageItems || [];

  console.log("slug --------------- glus", slug);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "imageText":
        return <AboutSection section={section} />;
      case "tours":
        return <ToursSection section={section} />;
      case "hero":
        return <HeroSection section={section} />;
      case "form":
        return <FormSection section={section} />;
      case "youtube":
        return <YoutubeSection section={section} />;
      default:
        return null;
    }
  };

  const PageContent = () => {
    if (!sections || sections.length === 0) {
      return <EmptyState title="No contents available" />;
    }
    return (
      <Suspense fallback={<CircleLoader />}>
        {sections && sections.length > 0 && sections.map((section: Section, index: number) => <div key={index}>{renderSection(section)}</div>)}
      </Suspense>
    );
  };

  return PageContent;
};

export default usePage;
