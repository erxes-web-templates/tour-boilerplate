"use client";

import usePage from "../../lib/usePage";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const AboutPage = () => {
  const searchParams = useSearchParams();

  const pageName = searchParams.get("pageName"); //pageName = about, tours, contact etc
  const PageContent = usePage(pageName);
  console.log("test", pageName);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </div>
  );
};

export default AboutPage;
