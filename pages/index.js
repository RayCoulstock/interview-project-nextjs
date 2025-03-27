import { Inter } from "next/font/google";
import LikePost from "../components/LikePost";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ posts }) {
  return (
    <main className={`max-w-screen-lg mx-auto my-8 ${inter.className}`}>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <article key={index} className="mb-8 p-4 border rounded-md">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-600">By {post.author}</p>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
            <LikePost />
          </article>
        ))
      ) : (
        <div>No blog posts available.</div>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/getBlogPosts", {
    headers: {
      "X-Auth": "secret123",
    },
  });

  const posts = res.ok ? await res.json() : [];

  return {
    props: {
      posts,
    },
  };
}
