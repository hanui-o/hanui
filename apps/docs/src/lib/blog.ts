import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  image?: string;
  canonicalUrl?: string;
};

export type BlogPostWithContent = BlogPost & {
  content: string;
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      author: data.author ?? 'odada',
      image: data.image,
      canonicalUrl: data.canonicalUrl,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    author: data.author ?? 'odada',
    image: data.image,
    canonicalUrl: data.canonicalUrl,
    content,
  };
}
