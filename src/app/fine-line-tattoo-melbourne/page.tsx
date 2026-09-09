import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationTemplate } from "@/components/templates/LocationTemplate";
import { getLocation } from "@/data/locations";

const SLUG = "fine-line-tattoo-melbourne";
const location = getLocation(SLUG);

export const metadata: Metadata = {
  title: location?.title,
  description: location?.description,
  alternates: { canonical: `/${SLUG}/` },
};

export default function LocationPage() {
  if (!location) notFound();
  return <LocationTemplate location={location} />;
}
