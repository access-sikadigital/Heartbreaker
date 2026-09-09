import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import { services, getService } from "@/data/services";

type Params = { params: Promise<{ service: string }> };

/** Prerender every service at build time — the set is fixed and small. */
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/fine-line-tattoos/${service.slug}/` },
    openGraph: { title: service.title, description: service.description },
  };
}

export default async function ServicePage({ params }: Params) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return <ServiceTemplate service={service} />;
}
