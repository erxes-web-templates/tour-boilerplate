// "use client";

import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import ClientBoilerplateLayout from "./_components/ClientLayout";

// import "./globals.css";

export default async function TourBoilerplateLayout({ children }: { children: React.ReactNode }) {
  // const menuList = await fetchMenuList("gmi68tMTXYCD7oLgHQ-tv", "main");
  // console.log(menuList, "menuList");
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {/* <Header menuList={menuList} />/ */}
          <main>{children}</main>
          <ClientBoilerplateLayout />
          {/* <Footer /> */}
          <p>neg</p>
        </ApolloWrapper>
      </body>
    </html>
  );
}
