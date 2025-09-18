"use client";

import React from "react";
import CustomImage from "@/components/common/CustomImage";
import { Section } from "@/types/section";
import { getFileUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const GallerySection = ({ section }: { section: Section }) => {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {section.config.title}
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          {section.config.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.config.images.map((image: any) => (
            <Card
              key={image.url}
              className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] w-full">
                  <CustomImage 
                    src={getFileUrl(image.url)} 
                    alt="image" 
                    fill 
                    objectFit="cover"
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
