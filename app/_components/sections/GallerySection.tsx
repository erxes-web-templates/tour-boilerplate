"use client";

import React from "react";
import CustomImage from "@/components/common/CustomImage";
import { Section } from "@/types/section";
import { getFileUrl } from "@/lib/utils";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const GallerySection = ({ section }: { section: Section }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{section.config.title}</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">{section.config.description}</p>

        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {section.config.images.map((image: any, index: number) => (
            <div key={image.url} className="break-inside-avoid mb-6">
              <div
                className="overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white shadow-md"
                onClick={() => handleImageClick(image.url)}
              >
                <div className="relative w-full">
                  <CustomImage 
                    src={getFileUrl(image.url)} 
                    alt={`Gallery image ${index + 1}`} 
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedImage && (
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Gallery Image</DialogTitle>
                <DialogDescription>Click outside to close</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <CustomImage 
                  src={getFileUrl(selectedImage) || "/placeholder.svg"} 
                  alt="Gallery image" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
