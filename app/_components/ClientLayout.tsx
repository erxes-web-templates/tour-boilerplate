"use client";

import Header from "./Header";
import Footer from "./Footer";
import { useParams, useSearchParams } from "next/navigation";
import useClientPortal from "../../../../../../hooks/useClientPortal";
import TourBoilerPlateHome from "../page";
import ToursPage from "../tours/page";
import TourDetailPage from "../tours/[id]/page";

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
        return <ToursPage />;
      case "tour":
        return <TourDetailPage />;
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
