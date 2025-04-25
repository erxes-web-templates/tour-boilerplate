"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import usePage from "../../lib/usePage";

const CmsPageRenderer = () => {
  // const searchParams = useSearchParams();
  // const pageName = searchParams.get("pageName"); // pageName = about, tours, contact etc

  // const PageContent = usePage(pageName);

  return (
    <div className="cms-page-container">
      {/* <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense> */}
    </div>
  );
};

export default CmsPageRenderer;
