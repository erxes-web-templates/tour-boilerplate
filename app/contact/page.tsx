"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help. Reach out to us using the form below or through our contact information.
        </p>
      </div>

      {/* Map (First Row - Full Width) */}
      <div className="mb-12">
        <Card className="overflow-hidden">
          <div className="h-[300px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890123!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our location"
            ></iframe>
          </div>
        </Card>
      </div>

      {/* Contact Info and Form (Second Row - Two Columns) */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us through any of these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-4 mt-0.5" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground">
                    123 Business Avenue, Suite 100
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary mr-4 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone Number</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+14155550123" className="hover:text-primary">
                      +1 (415) 555-0123
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mr-4 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Address</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:contact@example.com" className="hover:text-primary">
                      contact@example.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Facebook className="h-5 w-5 text-primary" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Twitter className="h-5 w-5 text-primary" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Instagram className="h-5 w-5 text-primary" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please provide details about your inquiry..." rows={5} required />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
