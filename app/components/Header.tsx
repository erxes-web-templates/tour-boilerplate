import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CmsMenuList } from "@/types/cms";

export default function Header({ menuList }: { menuList: CmsMenuList[] }) {
  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Adventure Tours.
        </Link>
        <div className="space-x-4">
          {menuList.map((menu) => (
            <Link key={menu._id} href={menu.url} className="hover:underline">
              {menu.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
