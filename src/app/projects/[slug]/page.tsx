import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient'; // Import the new client component

export const dynamic = 'force-static'; // Force static rendering

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

// NOTE: generateStaticParams is now in ./generateStaticParams.ts
// No fallback summarization; value proposition must be provided via
// shortValueProposition (and optionally longValueProposition).