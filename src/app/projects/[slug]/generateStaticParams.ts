import { projects } from '@/lib/projects';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
