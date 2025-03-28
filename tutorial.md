# Training Exercise: Changes in Develop Branch

## 1. Setting Up

### Get hold of the starting GitHub Repo
[GitHub Repo](https://github.com/RayCoulstock/interview-project-nextjs/tree/main) Take a fork of this repo and use what ever branching strategy you fell comfortable with. Make sure that you commit your changes regularly.

### Read through the Exercise summary and instructions
Follow the instruction the [README.md](./README.md) to get started and for a list of broad instruction.


## Step-by-Step Coding Instructions

### 1. Refactor index.js to hide the secret API code and call getBlogPosts.ts

- Make a request to `/api/getBlogPosts` to fetch blog posts content and render it on the page. 
- Make sure that the "secret123" token value for this request is not exposed publicly in the browser.

<table>
<tr>
<th><h4>the old ../pages/index.js</h4></th>
<th><h4>the new ../pages/index.js</h4></th>
</tr>
<tr>
<td>

```jsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`max-w-screen-lg mx-auto my-8 ${inter.className}`}
    >
      <div>
        Waiting for blog content ...
      </div>
    </main>
  );
}
```

</td>
<td>

```jsx
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
```

</td>
</tr>
</table>


### 2. Refector the LikePost.jsx to add a visual delay and correct info

- For each post, display the following content:
    1. The `title` as a heading
    1. The `author`
    1. The `description` HTML, properly formatted
    1. The existing `LikePost` button component
- Modify `components/LikePost.jsx` to introduce a visual "pending"/"loading" state when the fake network request is in progress.

<table>
<tr>
<th><h4>the old ../components/LikePost.jsx</h4></th>
<th><h4>the new ../components/LikePost.jsx</h4></th>
</tr>
<tr>
<tr>
<td>

```jsx
import sleep from "@/lib/sleep";

const LikePost = () => {
  const likePost = async () => {
    // Faking a long API request here
    await sleep(3000);
    console.log('Liked blog post');
  };

  return (
    <button className="bg-slate-700 text-white p-4 rounded-md hover:bg-slate-600"
      onClick={likePost}
    >
      Like this post
    </button>
  )
}

export default LikePost
```

</td>
<td>

```jsx
import { useState } from "react";
import sleep from "../lib/sleep";

const LikePost = () => {
  const [loading, setLoading] = useState(false);

  const likePost = async () => {
    setLoading(true);
    await sleep(3000);
    console.log("Liked blog post");
    setLoading(false);
  };

  return (
    <button
      className={`bg-slate-700 text-white p-4 rounded-md hover:bg-slate-600 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={likePost}
      disabled={loading}
    >
      {loading ? "Liking..." : "Like this post"}
    </button>
  );
};

export default LikePost;
```
</td>
</tr>
</table>





## Summary and Extra Reading
- Next.js API Routes Documentation
- React useEffect Hook
By following these steps, you will replicate the changes introduced in the pull request. If you have any issues or need further assistance, feel free to ask!