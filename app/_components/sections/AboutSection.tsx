import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg"
              alt="About us"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <p className="text-lg mb-4">
              {`    Adventure Tours is your gateway to unforgettable experiences around the world. With over a decade of expertise in crafting unique and
            exciting tours, we're passionate about helping you create memories that last a lifetime.`}
            </p>
            <p className="text-lg mb-4">
              Our team of experienced travel enthusiasts is dedicated to
              providing you with top-notch service, ensuring every aspect of
              your journey is carefully planned and executed to perfection.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
