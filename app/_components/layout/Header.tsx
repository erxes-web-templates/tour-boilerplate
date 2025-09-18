"use client";
import Link from "next/link";
import data from "@/data/configs.json";
import Image from "next/image";
import { getFileUrl } from "@/lib/utils";
import { CURRENT_USER } from "@/app/auth/_graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT_MUTATION } from "@/app/auth/_graphql/mutations";

export default function Header() {
  const { data: userData } = useQuery(CURRENT_USER);

  const currentUser = userData?.clientPortalCurrentUser;

  console.log(currentUser, "cu");
  const [logoutFunc] = useMutation(LOGOUT_MUTATION);

  const logout = async () => {
    await logoutFunc().then(() => {
      window.location.href = "/";
    });
  };

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          {data.meta.logo ? (
            <Image
              alt={data.meta.title}
              src={getFileUrl(data.meta.logo)}
              width={50}
              height={30}
            />
          ) : (
            data.meta.title
          )}
        </Link>
        <div className="space-x-10">
          {data.menus.main.map((menu) => (
            <Link
              key={menu.url}
              href={menu.url === "#" ? "#" : menu.url}
              className="hover:underline"
            >
              {menu.label}
            </Link>
          ))}
          {currentUser && (
            <>
              <Link href="/auth/profile" className="hover:underline">
                Profile
              </Link>
              <span onClick={logout} className="hover:underline">
                Logout
              </span>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
