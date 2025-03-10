import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { Section } from "@/types/section";
import Link from "next/link";
import { getFileUrl } from "@/lib/utils";

const AboutSection = ({ section }: { section: Section }) => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{section.config.title}</h2>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            {section.config.image.url ||
              (section.config.image.initUrl && (
                <Image
                  src={getFileUrl(section.config.image.url) || section.config.image.initUrl}
                  alt="About us"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              ))}
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <p className="text-lg mb-4">{section.config.description}</p>
            {section.config.primaryCtaUrl && (
              <Link href={section.config.primaryCtaUrl}>
                <Button>{section.config.primaryCta}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
