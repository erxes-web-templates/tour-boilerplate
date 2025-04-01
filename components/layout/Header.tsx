import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { GET_MENUS } from "../../../../projects/_graphql/queries";
import { CURRENT_USER } from "../../app/auth/_graphql/queries";
import { LOGOUT_MUTATION } from "../../app/auth/_graphql/mutations";
import { getFileUrl, templateUrl } from "../../../../../../lib/utils";
import { CPDetail, MenuItem } from "../../types/cms";

const TEMPLATE_TYPE = process.env.TEMPLATE_TYPE;

export default function Header({ cpDetail }: { cpDetail: CPDetail }) {
  const params = useParams<{ id: string }>();

  const { data: menuData } = useQuery(GET_MENUS, {
    variables: { clientPortalId: params.id, kind: "main" },
  });
  const { data: userData } = useQuery(CURRENT_USER);
  const [logoutFunc] = useMutation(LOGOUT_MUTATION);

  const currentUser = userData?.clientPortalCurrentUser;
  const menus = menuData?.cmsMenuList || [];

  const handleLogout = async () => {
    await logoutFunc();
    window.location.href = "/";
  };

  const renderLogo = (logo: string | undefined, title: string, url: string) => (
    <Link href={url} className="text-2xl font-bold">
      {logo ? <Image alt={title} src={getFileUrl(logo)} width={50} height={50} /> : title}
    </Link>
  );

  const renderMenuItems = (menuList: MenuItem[], urlTransformer = (url: string) => url) =>
    menuList.map((menu) => (
      <Link key={menu._id || menu.url} href={urlTransformer(menu.url)} className="hover:underline">
        {menu.label}
      </Link>
    ));

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        {TEMPLATE_TYPE === "build"
          ? renderLogo(menuData?.meta?.logo, menuData?.meta?.title, "/")
          : renderLogo(cpDetail.logo, cpDetail.name, templateUrl("/"))}

        <div className="space-x-4">
          {TEMPLATE_TYPE === "build" && menuData?.menus?.main ? renderMenuItems(menuData.menus.main) : renderMenuItems(menus, templateUrl)}

          {currentUser && (
            <>
              <Link href="/auth/profile" className="hover:underline">
                Profile
              </Link>
              <span onClick={handleLogout} className="hover:underline cursor-pointer">
                Logout
              </span>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
