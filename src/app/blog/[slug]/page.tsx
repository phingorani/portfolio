import { getPostData, getAllPostSlugs, Post } from '@/lib/posts';
import { notFound } from 'next/navigation';
import BlogRenderer from './BlogRenderer';

interface BlogPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map(p => ({ slug: p.params.slug }));
}

export default async function PostPage({ params }: BlogPageProps) {
  const slug = (await params).slug;
  const postData: Post = getPostData(slug);

  if (!postData) {
    return notFound();
  }

  return <BlogRenderer postData={postData} />;
}
