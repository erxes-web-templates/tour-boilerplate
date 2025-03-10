import Link from "next/link";
import data from "@/data/configs.json";
import Image from "next/image";
import { getFileUrl } from "@/lib/utils";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          {data.meta.logo ? <Image alt={data.meta.title} src={getFileUrl(data.meta.logo)} width={50} height={30} /> : data.meta.title}
        </Link>
        <div className="space-x-4">
          {data.menus.main.map((menu) => (
            <Link key={menu.url} href={menu.url} className="hover:underline">
              {menu.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
