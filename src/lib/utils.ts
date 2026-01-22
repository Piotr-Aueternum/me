import { getCollection, type CollectionEntry } from "astro:content";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SlugUtils = {
  yearSlug: (date: Date) => date.getFullYear().toString(),
  monthSlug: (date: Date) =>
    date.toLocaleDateString("en-GB", {
      month: "2-digit",
    }),
};

class LinksBuilder<const T> {
  root: T;

  constructor(root: T) {
    this.root = root;
  }
  year = (date: Date) => `${this.root}/${SlugUtils.yearSlug(date)}` as const;
  month = (date: Date) =>
    `${this.year(date)}/${SlugUtils.monthSlug(date)}` as const;
  slug = (date: Date, slug: string) => `${this.month(date)}/${slug}` as const;
}

export const galleryLinks = new LinksBuilder("/gallery");
export const blogLinks = new LinksBuilder("/blog");

function getAvailable<T>(
  data: (T extends CollectionEntry<"blog" | "gallery"> ? T : never)[],
): T[] {
  return data
    .filter(({ data }) => data.publishDate.valueOf() <= new Date().valueOf())
    .toSorted(
      (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
    );
}

export const availableGallery =
  await getCollection("gallery").then(getAvailable);

export const availableBlog = await getCollection("blog").then(getAvailable);

export const getDatesCount = (data: (readonly [string, Date])[]) => {
  const dateMap = new Map<string, Date[]>();
  data.forEach(([key, date]) => {
    dateMap.set(key, [...(dateMap.get(key) ?? []), date]);
  });

  const dates = [...dateMap.values()]
    .toSorted(([a], [b]) => b?.valueOf()! - a?.valueOf()!)
    .map((dates) => [dates[0]!, dates.length] as const);
  return dates;
};
