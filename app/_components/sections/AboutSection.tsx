import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { Section } from "@/types/section";
import Link from "next/link";
import { getFileUrl } from "@/lib/utils";

const AboutSection = ({ section }: { section: Section }) => {
  const isImageLeft = section.config.imagePosition === "left";

  const renderImage = () => {
    const { image } = section.config;

    if (!image) return null;

    const imageUrl = getFileUrl(image.url) || image.initUrl;

    return imageUrl ? <Image src={imageUrl} alt="Beautiful landscape" objectFit="cover" width={600} height={400} className="rounded-lg" /> : null;
  };
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{section.config.title}</h2>
        <div className="flex flex-wrap items-center">
          {isImageLeft && <div className="w-full md:w-1/2 mb-8 md:mb-0">{renderImage()}</div>}
          <div className={`w-full md:w-1/2 ${isImageLeft ? "md:pl-8" : "md:pr-8"}`}>
            <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: section.config.description }}></p>
            {section.config.primaryCtaUrl && (
              <Link href={section.config.primaryCtaUrl}>
                <Button>{section.config.primaryCta}</Button>
              </Link>
            )}
          </div>
          {!isImageLeft && <div className="w-full md:w-1/2 mb-8 md:mb-0">{renderImage()}</div>}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
