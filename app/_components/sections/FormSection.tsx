import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/types/sections";
import React from "react";

const FormSection = ({ section }: { section: Section }) => {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="max-w-md mx-auto">
          <form>
            <div className="mb-4">
              <Input type="text" placeholder="Your Name" />
            </div>
            <div className="mb-4">
              <Input type="email" placeholder="Your Email" />
            </div>
            <div className="mb-4">
              <Textarea placeholder="Your Message" />
            </div>
            <Button type="submit" className="w-full" variant="secondary">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
