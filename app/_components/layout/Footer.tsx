import Link from "next/link";
import cpDetail from "@/data/configs.json";
import { Twitter, Linkedin, Youtube, Instagram, Facebook, MessageCircle } from "lucide-react";

interface SocialItem {
  name: string;
  url: string | string[];
}

interface AdditionalDetails {
  social: SocialItem[];
}

interface CpDetail {
  additional?: AdditionalDetails;
}

export default function Footer() {
  const getSocialUrl = (name: string): string | undefined => {
    const socialItems = cpDetail?.additional?.social as SocialItem[] | undefined;
    const item = socialItems?.find((item) => item.name === name);
    return Array.isArray(item?.url) ? item.url[0] : item?.url;
  };

  const socialLinks = [
    { name: "facebook", icon: <Facebook /> },
    { name: "twitter", icon: <Twitter /> },
    { name: "linkedin", icon: <Linkedin /> },
    { name: "youtube", icon: <Youtube /> },
    { name: "instagram", icon: <Instagram /> },
    { name: "whatsapp", icon: <MessageCircle /> },
  ];
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
            <p>Email: {getSocialUrl("emails")}</p>
            <p>Phone: {getSocialUrl("phones")}</p>
            <p>Address: {getSocialUrl("address")}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            {socialLinks.map(({ name, icon }) => {
              const url = getSocialUrl(name);
              return (
                url && (
                  <a key={name} href={url} className="text-white hover:text-gray-300 transition-colors duration-200">
                    {icon}
                  </a>
                )
              );
            })}
          </div>
          <p className="text-center md:text-right">{cpDetail?.additional?.copyright?.text}</p>
        </div>
      </div>
    </footer>
  );
}
