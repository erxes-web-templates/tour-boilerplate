import CustomImage from "../../../components/common/CustomImage";
import { Section } from "@/types/section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../components/ui/carousel";
import { Card, CardContent } from "../../../components/ui/card";
import { getFileUrl } from "@/lib/utils";

// interface GalleryImage {
//   id: number;
//   src: string;
//   alt: string;
//   title: string;
// }


export default function GallerySection({ section }: { section: Section }) {
  return (
    <section className=" w-full max-w-[90rem] mx-auto py-8 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-primary">{section.config.title}</h2>
        <div className="flex flex-wrap justify-center mb-8">
          <p>{section.config.description}</p>
        </div>

        <div className="w-full mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.config.images.map((image: any) => (
              <div key={image.src}>
                <Card className="overflow-hidden border-none">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] w-full">
                      <CustomImage src={getFileUrl(image.url)} alt="image" fill className="object-cover" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
