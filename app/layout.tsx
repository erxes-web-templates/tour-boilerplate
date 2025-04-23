import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/layout/Header";
import Footer from "./_components/layout/Footer";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import data from "../data/configs.json";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });
const baseUrl = new URL(process.env.ERXES_API_URL as string).origin;

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="keywords" content={data.meta.keywords} />
        {/* <link rel="icon" href={getFileUrl(data.meta.favicon)} /> */}
        {/* <meta property="og:image" content={getFileUrl(data.meta.logo)} /> */}
      </head>
      <body className={inter.className}>
        {data?.additional?.integrations?.messengerId && (
          <Script
            id="erxes"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
    window.erxesSettings = {
      messenger: {
        brand_id: "${data?.additional?.integrations?.messengerId}",
      },
    };
    
    (() => {
      const script = document.createElement('script');
      script.src = "${baseUrl}/widgets/build/messengerWidget.bundle.js";
      script.async = true;

      const entry = document.getElementsByTagName('script')[0];
      entry.parentNode.insertBefore(script, entry);
    })();
  `,
            }}
          />
        )}
        <ApolloWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ApolloWrapper>
      </body>
    </html>
  );
}
