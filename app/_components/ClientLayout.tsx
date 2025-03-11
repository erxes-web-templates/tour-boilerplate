"use client";

import Header from "./Header";
import Footer from "./Footer";
import { useParams, useSearchParams } from "next/navigation";
import useClientPortal from "../../../../../../hooks/useClientPortal";
import TourBoilerPlateHome from "../page";
import ToursPage from "../tours/page";
import TourDetailPage from "../tours/[id]/page";
import AboutPage from "../about/page";
import LoginPage from "../auth/login/page";
import RegisterPage from "../auth/register/page";
import ContactPage from "../contact/page";
import LegalPage from "../legal/page";
import PostDetailPage from "../blog/[id]/page";
import BlogsPage from "../blog/page";

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
      case "about":
        return <AboutPage />;
      case "login":
        return <LoginPage />;
      case "register":
        return <RegisterPage />;
      case "contact":
        return <ContactPage />;
      case "terms":
        return <LegalPage />;
      case "privacy":
        return <LegalPage />;
      case "blogs":
        return <BlogsPage />;
      case "post":
        return <PostDetailPage />;
      // case "checkout":
      //   return <div>Checkout</div>;
      // case "confirmation":
      //   return <div>Confirmation</div>;
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
