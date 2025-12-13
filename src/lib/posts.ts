import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    [key: string]: unknown;
}

export function getSortedPostsData(): Post[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      ...(matterResult.data as { title: string; date: string; excerpt: string; [key: string]: unknown }),
      content: matterResult.content,
    };
  });

  const staticPosts: Post[] = [
    {
      slug: 'ai-innovations-newsletter',
      title: 'AI in Action: How New Tools Reshaped Industries in November 2025',
      date: '2025-10-12',
      excerpt: 'A monthly briefing on how AI tools are moving beyond simple assistance to become powerful, proactive partners in software development, creative design, and customer experience.',
      content: '',
    }
  ];

  const allPosts = [...allPostsData, ...staticPosts];

  // Sort posts by date
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getPostData(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id and content
  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; excerpt: string; [key: string]: unknown }),
  };
}