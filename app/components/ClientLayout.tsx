"use client";

import Header from "./Header";
import Footer from "./Footer";
import { useParams, useSearchParams } from "next/navigation";
import useClientPortal from "../../../../../../hooks/useClientPortal";
import TourBoilerPlateHome from "../page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const featuredTours = [
  {
    id: 1,
    title: "Mountain Trek",
    description: "Experience the thrill of mountain climbing",
    price: "$999",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Beach Getaway",
    description: "Relax on pristine beaches",
    price: "$799",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "City Explorer",
    description: "Discover vibrant city cultures",
    price: "$899",
    image: "/placeholder.svg",
  },
];

export default function ClientBoilerplateLayout() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const { cpDetail } = useClientPortal({ id: params.id });
  const pageName = searchParams.get("pageName");
  const renderPageContent = () => {
    switch (pageName) {
      case "home":
        return <TourBoilerPlateHome />;
      case "tours":
        return (
          <>
            <section className="py-16 bg-gray-100">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Featured Tours
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredTours.map((tour) => (
                    <Card key={tour.id}>
                      <CardHeader>
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          width={300}
                          height={200}
                          className="rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{tour.title}</CardTitle>
                        <CardDescription>{tour.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-lg font-bold">{tour.price}</span>
                        <Button>Book Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
      default:
        return;
    }
  };

  return (
    <>
      <Header cpDetail={cpDetail} />
      <main>{renderPageContent()}</main>
      <Footer cpDetail={cpDetail} />
    </>
  );
}
