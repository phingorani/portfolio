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
  console.log('ProjectPage: Received slug:', slug); // Re-add debug log
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    console.log(`ProjectPage: Project not found for slug: ${slug}`); // Re-add debug log
    notFound();
  }
  console.log('ProjectPage: Found project:', project.title); // Re-add debug log

  return <ProjectDetailClient project={project} />;
}

// NOTE: generateStaticParams is now in ./generateStaticParams.ts
// No fallback summarization; value proposition must be provided via
// shortValueProposition (and optionally longValueProposition).