import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNode, getNodesByCategory } from "@/config/seo-matrix";
import { SITE_URL } from "@/lib/seo/jsonld";
import UniversalSeoTemplate from "@/components/seo/UniversalSeoTemplate";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getNodesByCategory("bilkjop").map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const node = getNode("bilkjop", slug);
  if (!node) return {};

  const canonical = `${SITE_URL}/bilkjop/${node.slug}`;
  const title = `${node.title} | HarJegKravPå.no`;
  const description = `${node.desc} Få juridisk rapport og kravbrev for 99 kr.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "HarJegKravPå.no",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: node.title,
      description,
    },
  };
}

export default async function BilkjopSlugPage({ params }: Props) {
  const { slug } = await params;
  const node = getNode("bilkjop", slug);
  if (!node) notFound();

  return <UniversalSeoTemplate node={node} />;
}
