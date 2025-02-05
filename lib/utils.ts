import { clsx, type ClassValue } from "clsx";
// import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uncapitalize = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const templateUrl = (slug: string, externalUrl: string) => {
  // const params = useParams<{ id: string }>();
  const url = window.location.href;
  const newUrl = new URL(url);
  // const template = newUrl.searchParams.get("template");
  console.log(externalUrl);
  // if (externalUrl) {
  //   return slug;
  // }
  return `/dashboard/projects/123?template=tour&pageName=${uncapitalize(slug)}`;
};

// export const templateUrl = (projectId: string, slug: string) => {
//   return `/dashboard/projects/${projectId}?template=tour-boilerplate&pageName=${slug}`;
// };
