//@ts-nocheck

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
import { GET_CMS_PAGES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const standardComponentRegistry = {
  home: TourBoilerPlateHome,
  tours: ToursPage,
  tour: TourDetailPage,
  about: AboutPage,
  login: LoginPage,
  register: RegisterPage,
  contact: ContactPage,
  terms: LegalPage,
  privacy: LegalPage,
  blogs: BlogsPage,
  post: PostDetailPage,
};

export default function ClientBoilerplateLayout() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const { cpDetail } = useClientPortal({ id: params.id });
  const pageName = searchParams.get("pageName");
  const [CustomPageComponent, setCustomPageComponent] = useState(null);

  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data, loading } = useQuery(GET_CMS_PAGES, {
    variables: {
      clientPortalId: params.id,
    },
  });

  const customPage = data?.cmsPages?.find((page: any) => page.slug === pageName);

  // Check if this is a custom page that needs dynamic handling
  const isCustomCmsPage = Boolean(customPage && !standardComponentRegistry[pageName]);

  useEffect(() => {
    if (!isCustomCmsPage) {
      setCustomPageComponent(null);
      return;
    }

    setIsLoading(true);

    // Create a dynamic component to render the custom CMS page
    const loadCustomComponent = async () => {
      try {
        // Load the CMS page renderer component
        const DynamicCmsRenderer = dynamic(() => import("../custom/page"), { loading: () => <div>Loading custom page content...</div> });

        // Create a wrapper component with a proper display name
        const WrappedComponent = (props) => <DynamicCmsRenderer page={customPage} {...props} />;

        // Set a display name for the component
        WrappedComponent.displayName = `CmsPage_${customPage?.slug || "Unknown"}`;

        setCustomPageComponent(() => WrappedComponent);
        setError(null);
      } catch (err) {
        console.error("Failed to load CMS page renderer:", err);
        setError(`Error loading CMS page: ${err.message}`);
        setCustomPageComponent(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomComponent();
  }, [customPage, isCustomCmsPage, pageName]);

  const renderPageContent = () => {
    if (loading) return <div>Loading pages...</div>;
    if (!pageName) return null;

    // For standard pre-defined pages, use the registry
    const StandardComponent = standardComponentRegistry[pageName];

    if (StandardComponent) {
      return <StandardComponent />;
    }

    // For custom CMS pages
    if (isCustomCmsPage) {
      if (isLoading) {
        return <div>Loading custom page...</div>;
      }

      if (error) {
        return <div>{error}</div>;
      }

      if (CustomPageComponent) {
        return <CustomPageComponent />;
      }
    }

    // Page not found case
    return <div>Page not found</div>;
  };
  // const renderPageContent = () => {
  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error loading pages: {error.message}</div>;
  //   if (!pageName) return <div>No page specified</div>;

  //   const pageConfig = data?.cmsPages.find((page: any) => page.slug === pageName);

  //   if (!pageConfig) {
  //     // Handle 404 case - page not found or not active
  //     return <div>Page not found</div>;
  //   }

  //   try {
  //     // Dynamically import the component based on the path from GraphQL
  //     const PageComponent = dynamic(() => import(`path/to/components/${pageConfig.componentPath}`), {
  //       loading: () => <div>Loading page...</div>,
  //       ssr: true, // Set to false if you don't want server-side rendering
  //     });

  //     return <PageComponent />;
  //   } catch (e) {
  //     return <div>Error loading component: {e.message}</div>;
  //   }

  //   console.log(pageConfig, "data");

  //   switch (pageName) {
  //     case "home":
  //       return <TourBoilerPlateHome />;
  //     case "tours":
  //       return <ToursPage />;
  //     case "tour":
  //       return <TourDetailPage />;
  //     case "about":
  //       return <AboutPage />;
  //     case "login":
  //       return <LoginPage />;
  //     case "register":
  //       return <RegisterPage />;
  //     case "contact":
  //       return <ContactPage />;
  //     case "terms":
  //       return <LegalPage />;
  //     case "privacy":
  //       return <LegalPage />;
  //     case "blogs":
  //       return <BlogsPage />;
  //     case "post":
  //       return <PostDetailPage />;
  //     // case "checkout":
  //     //   return <div>Checkout</div>;
  //     // case "confirmation":
  //     //   return <div>Confirmation</div>;
  //     default:
  //       return;
  //   }
  // };

  return (
    <>
      <Header cpDetail={cpDetail} />
      <main>{renderPageContent()}</main>
      <Footer cpDetail={cpDetail} />
    </>
  );
}
