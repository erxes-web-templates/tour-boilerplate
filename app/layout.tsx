// "use client";

import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// import "./globals.css";

export default async function TourBoilerplateLayout({ children }: { children: React.ReactNode }) {
  // const menuList = await fetchMenuList("gmi68tMTXYCD7oLgHQ-tv", "main");
  // console.log(menuList, "menuList");
  const isBuilderMode = process.env.NEXT_PUBLIC_BUILDER_MODE === "true";

  return (
    <html lang="en">
      <body className={isBuilderMode ? "builder-mode" : "production-mode"}>
        {isBuilderMode && (
          <ApolloWrapper>
            <Header menuList={menuList} />
            <main>{children}</main>
            <Footer />
          </ApolloWrapper>
        )}
      </body>
    </html>
  );
}
