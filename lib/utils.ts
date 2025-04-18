import { clsx, type ClassValue } from "clsx";
// import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uncapitalize = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSocialLinks(externalLinks: any) {
  const socials = {
    twitter: externalLinks.twitter,
    linkedin: externalLinks.linkedin,
    youtube: externalLinks.youtube,
    instagram: externalLinks.instagram,
    facebook: externalLinks.facebook,
    whatsapp: externalLinks.whatsapp,
  };

  // Filter out null values if desired
  const filteredSocials = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(socials).filter(([_, value]) => value !== null)
  );

  return filteredSocials;
}

// export const templateUrl = (projectId: string, slug: string) => {
//   return `/dashboard/projects/${projectId}?template=tour-boilerplate&pageName=${slug}`;
// };

export const getEnv = (): any => {
  const envs: any = {};

  if (typeof window !== "undefined") {
    const appVersion = localStorage.getItem(`builder_env_NEXT_PUBLIC_APP_VERSION`) || "SAAS";

    // Get the window.envMaps safely with a default empty array
    const envMaps = (window as any).envMaps || [];

    if (appVersion === "SAAS") {
      const subdomain = window.location.hostname.replace(/(^\w+:|^)\/\//, "").split(".")[0];

      // Now we can safely iterate over envMaps
      for (const envMap of envMaps) {
        const value = localStorage.getItem(`builder_env_${envMap.name}`) ?? "";
        envs[envMap.name] = value.replace("<subdomain>", subdomain);
      }

      return envs;
    }

    // Use the same envMaps variable here
    for (const envMap of envMaps) {
      envs[envMap.name] = localStorage.getItem(`builder_env_${envMap.name}`);
    }
  }

  return envs;
};

export const templateUrl = (slug: string) => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop(); // Assumes `id` is the last segment of the path
    const templateId = url.searchParams.get("template");
    const sanitizedSlug = slug.replace(/^\//, "");
    if (sanitizedSlug === "") {
      return `/dashboard/projects/${id}?template=${templateId}&pageName=home`;
    }
    return `/dashboard/projects/${id}?template=${templateId}&pageName=${sanitizedSlug}`;
  }
  throw new Error("window is undefined");
};

export const getFileUrl = (url: string) => {
  const env = getEnv();
  if (!url) return "";
  return `${env.NEXT_PUBLIC_API_DOMAIN}/read-file?key=${url}`;
};
