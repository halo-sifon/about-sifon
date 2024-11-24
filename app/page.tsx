import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { Post } from "@/types";

export default function Home() {
  const posts: Partial<Post>[] = getAllPosts(); // 在服务端读取所有文章数据

  return (
    <main>
      <h1>博客首页</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title} - {post.date}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
