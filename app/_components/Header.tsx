import Link from "next/link";
import { CPDetail, MenuItem } from "../../types/cms";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getFileUrl, templateUrl } from "@/lib/utils";
import { GET_CMS_MENU_LIST } from "../../graphql/queries";

export default function Header({ cpDetail }: { cpDetail: CPDetail }) {
  const params = useParams<{ id: string }>();

  const { data } = useQuery(GET_CMS_MENU_LIST, {
    variables: {
      clientPortalId: params.id,
      kind: "main",
    },
  });

  const menus = data?.cmsMenuList || [];
  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href={templateUrl("/")} className="text-2xl font-bold">
          {cpDetail.logo ? <Image src={getFileUrl(cpDetail.logo)} alt={cpDetail.name} width={50} height={50} /> : cpDetail.name}
        </Link>
        <div className="space-x-4">
          {menus.map((menu: MenuItem) => (
            <Link key={menu._id} href={templateUrl(menu.url)} className="hover:underline">
              {menu.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
