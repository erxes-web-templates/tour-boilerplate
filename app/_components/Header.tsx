import Link from "next/link";
import { CPDetail, MenuItem } from "../../types/cms";
import { useQuery } from "@apollo/client";
import { GET_MENUS } from "../../../../../dashboard/projects/_graphql/queries";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getFileUrl, templateUrl } from "../../../../../../lib/utils";

export default function Header({ cpDetail }: { cpDetail: CPDetail }) {
  const params = useParams<{ id: string }>();

  const { data } = useQuery(GET_MENUS, {
    variables: {
      clientPortalId: params.id,
      kind: "main",
    },
  });

  const menus = data?.cmsMenuList || [];

  const organizeMenus = (menus: MenuItem[]) => {
    const menuMap: Record<string, MenuItem & { children: MenuItem[] }> = {};

    menus.forEach((menu: any) => {
      menuMap[menu._id] = { ...menu, children: [] };
    });

    const nestedMenus: (MenuItem & { children: MenuItem[] })[] = [];

    menus.forEach((menu: any) => {
      if (menu.parentId) {
        menuMap[menu.parentId]?.children.push(menuMap[menu._id]);
      } else {
        nestedMenus.push(menuMap[menu._id]);
      }
    });

    return nestedMenus;
  };
  const nestedMenus = organizeMenus(menus);

  const renderMenu = (menu: MenuItem & { children: MenuItem[] }) => (
    <div key={menu._id} className="relative group z-10">
      <Link
        href={templateUrl(menu.url || "")}
        className="hover:underline text-primary "
      >
        {menu.label}
      </Link>
      {menu.children.length > 0 && (
        <div className="absolute hidden group-hover:block bg-white shadow-md ">
          <div className="space-y-2 p-2">
            {menu.children.map((child: any) => renderMenu(child))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-background text-primary-foreground">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href={templateUrl("/")} className="text-2xl font-bold">
          {cpDetail.logo ? (
            <Image
              src={getFileUrl(cpDetail.logo)}
              alt={cpDetail.name}
              width={50}
              height={50}
            />
          ) : (
            cpDetail.name
          )}
        </Link>
        <div className="space-x-4 flex">{nestedMenus.map(renderMenu)}</div>
      </nav>
    </header>
  );
}
