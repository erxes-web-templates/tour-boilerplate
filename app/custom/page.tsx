import usePage from "../../lib/usePage";
import { useSearchParams } from "next/navigation";
import React from "react";

interface CmsPageProps {
  page: {
    _id: string;
    name: string;
    type: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

const CmsPageRenderer: React.FC<CmsPageProps> = ({ page }) => {
  const searchParams = useSearchParams();

  const pageName = searchParams.get("pageName"); //pageName = about, tours, contact etc

  const PageContent = usePage(pageName);

  if (!page) {
    return <div>No page data available</div>;
  }

  return (
    <div className="cms-page-container">
      <PageContent />
    </div>
  );
};

export default CmsPageRenderer;
