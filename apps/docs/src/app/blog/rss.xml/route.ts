import { getAllPosts } from '@/lib/blog';

export function GET() {
  const posts = getAllPosts();
  const baseUrl = 'https://hanui.io';

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HANUI Blog</title>
    <description>HANUI 개발 과정, KRDS 활용 팁, React 컴포넌트 설계 등 공공 웹 개발에 관한 이야기</description>
    <link>${baseUrl}/blog</link>
    <language>ko</language>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
