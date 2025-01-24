import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import data from "../data/configs.json";
import { fetchMenuList } from "@/lib/fetchCms";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const menuList = await fetchMenuList("gmi68tMTXYCD7oLgHQ-tv", "main");
  console.log(menuList, "menuList");
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <Header menuList={menuList} />
          <main>{children}</main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
