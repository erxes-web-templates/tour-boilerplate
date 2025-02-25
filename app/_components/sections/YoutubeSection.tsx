import { Section } from "@/types/sections";
import React from "react";

const YoutubeSection = ({ section }: { section: Section }) => {
  return (
    <section className="relative h-[600px]">
      <iframe
        className="w-full ratio-16/9 h-full"
        src={section.config.videoUrl}
      ></iframe>
    </section>
  );
};

export default YoutubeSection;
