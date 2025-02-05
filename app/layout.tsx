"use client";

// import "./globals.css";

export default async function TourBoilerplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const menuList = await fetchMenuList("gmi68tMTXYCD7oLgHQ-tv", "main");
  // console.log(menuList, "menuList");
  return (
    <html lang="en">
      <body>
        {/* <ApolloWrapper> */}
        {/* <Header menuList={menuList} /> */}
        <main>{children}</main>
        {/* <Footer /> */}
        {/* </ApolloWrapper> */}
      </body>
    </html>
  );
}
