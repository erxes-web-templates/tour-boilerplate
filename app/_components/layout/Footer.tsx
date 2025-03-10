import Link from "next/link";
import cpDetail from "@/data/configs.json";
import { Twitter, Linkedin, Youtube, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">
              <Link href={"/"}>{cpDetail.meta.title}</Link>
            </h3>
            <p>{cpDetail.meta.description}</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              {cpDetail.menus.footerMenu.map((menu: any) => (
                <li key={menu._id}>
                  <Link href={menu.url} className="hover:underline">
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p>Email: {cpDetail?.additional?.social.find((item) => item.name === "emails")?.url[0]}</p>
            <p>Phone: {cpDetail?.additional?.social.find((item) => item.name === "phones")?.url[0]}</p>
            <p>Address: {cpDetail?.additional?.social.find((item) => item.name === "address")?.url} </p>
            <div className="flex space-x-4">
              {cpDetail?.additional?.social.find((item) => item.name === "facebook")?.url && (
                <a
                  href={cpDetail?.additional?.social.find((item) => item.name === "facebook")?.url as string}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <Facebook />
                </a>
              )}
              {cpDetail?.additional?.social.find((item) => item.name === "twitter")?.url && (
                <a
                  href={cpDetail?.additional?.social.find((item) => item.name === "twitter")?.url as string}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <Twitter />
                </a>
              )}
              {cpDetail?.additional?.social.find((item) => item.name === "linkedin")?.url && (
                <a
                  href={cpDetail?.additional?.social.find((item) => item.name === "linkedin")?.url as string}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <Linkedin />
                </a>
              )}
              {cpDetail?.additional?.social.find((item) => item.name === "youtube")?.url && (
                <a
                  href={cpDetail?.additional?.social.find((item) => item.name === "youtube")?.url as string}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <Youtube />
                </a>
              )}
              {cpDetail?.additional?.social.find((item) => item.name === "instagram")?.url && (
                <a
                  href={cpDetail?.additional?.social.find((item) => item.name === "instagram")?.url as string}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <Instagram />
                </a>
              )}
              {cpDetail?.additional?.social.find((item) => item.name === "whatsapp")?.url && (
                <a
                  href={cpDetail?.additional?.social.find((item) => item.name === "whatsapp")?.url as string}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <MessageCircle />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>{cpDetail?.additional?.copyright?.text}</p>
        </div>
      </div>
    </footer>
  );
}
