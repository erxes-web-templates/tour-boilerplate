import Link from "next/link";
import { CmsMenuList } from "@/types/cms";
import { menus } from "@/data/configs.json";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Adventure Tours.
        </Link>
        <div className="space-x-4">
          {menus.main.map((menu) => (
            <Link key={menu.url} href={menu.url} className="hover:underline">
              {menu.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
