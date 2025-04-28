"use client";

import { useSearchParams } from "next/navigation";

import usePage from "../lib/usePage";
import { Suspense } from "react";

export default function TourBoilerPlateHome() {
  const searchParams = useSearchParams();

  const pageName = searchParams.get("pageName"); //pageName = about, tours, contact etc
  const PageContent = usePage(pageName);

  // console.log("about", pageName);
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <PageContent />
      </Suspense>
    </div>
  );
}
