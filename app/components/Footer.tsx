import { CPDetail, MenuItem } from "../../types/cms";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_MENUS } from "../../../../projects/_graphql/queries";
import { templateUrl } from "../../lib/utils";

export default function Footer({ cpDetail }: { cpDetail: CPDetail }) {
  const { data } = useQuery(GET_MENUS, {
    variables: {
      clientPortalId: cpDetail._id,
      kind: "footer",
    },
  });

  // const templateUrl = (slug: string) => {
  //   // http://localhost:3400/dashboard/projects/nfwq9JHMZz7Kfa7M2iN_f?template=tour-boilerplate&pageName=home&style=3

  //   const url = window.location.href;
  //   const newUrl = new URL(url);
  //   const template = newUrl.searchParams.get("template");
  //   return `/dashboard/projects/${cpDetail._id}?template=${template}&pageName=${slug}`;
  // };

  const menus = data?.cmsMenuList || [];
  console.log(menus, "menus at footer");
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{cpDetail?.name}</h3>
            <p>{cpDetail?.description}</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              {menus.map((menu: MenuItem) => (
                <li key={menu._id}>
                  <Link
                    href={templateUrl(menu.label, menu.url)}
                    className="hover:underline"
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p>Email: {cpDetail?.externalLinks?.emails[0]}</p>
            <p>Phone: {cpDetail?.externalLinks?.phones[0]}</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>{cpDetail?.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
