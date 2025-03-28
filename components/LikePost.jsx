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
