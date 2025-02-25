import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFileUrl = (url: string) => {
  if (!url) return "";
  return `${process.env.ERXES_FILE_URL}${url}`;
};
