import React from "react";
import { Section } from "@/types/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getFileUrl } from "@/lib/utils";
const HeroSection = ({ section }: { section: Section }) => {
  const renderImage = () => {
    const { image } = section.config;

    if (!image) return null;

    const imageUrl = getFileUrl(image.url) || image.initUrl;

    return imageUrl ? <Image src={imageUrl} alt="Beautiful landscape" layout="fill" objectFit="cover" /> : null;
  };

  return (
    <section className="relative h-[600px]">
      {renderImage()}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{section.config.title}</h1>
          {section.config.description && <p className="text-xl mb-8 max-w-[800px] mx-auto" dangerouslySetInnerHTML={{ __html: section.config.description }}></p>}
          {section.config.primaryCtaUrl && (
            <Link href={section.config.primaryCtaUrl}>
              <Button size="lg" variant="secondary">
                {section.config.primaryCta}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
