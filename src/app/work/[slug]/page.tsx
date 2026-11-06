import React from "react";
import { notFound } from "next/navigation";
import { PROJECTS_DATA, getProjectBySlug } from "@/data/portfolio-data";
import { CaseStudyView } from "@/components/work/CaseStudyView";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found | Sangheon Kwon" };
  }
  const canonicalUrl = `https://kwsahe.github.io/kwsahe/work/${project.slug}/`;
  return {
    title: `${project.name} — Case Study | 권상헌 (Sangheon Kwon)`,
    description: `${project.oneLiner.ko} (${project.oneLiner.en})`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.name} — Engineering Case Study | 권상헌`,
      description: project.oneLiner.ko,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyView project={project} />;
}
