import { useEffect, useState } from "react";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((res) => {
        console.log("Fetched data:", res.data); // See what's actually returned
        const fetchedPosts = Array.isArray(res.data)
          ? res.data
          : res.data.posts;

        if (Array.isArray(fetchedPosts)) {
          const sortedPosts = fetchedPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts);
        } else {
          console.error("Unexpected format:", fetchedPosts);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  }, []);

  // Helper to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {posts.map((post) => (
        <li key={post.id} className="py-5">
          <div className="flex items-baseline justify-between gap-x-4">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {post.author?.username || "Unknown Author"}
            </p>
            <p className="flex-none text-xs text-gray-600">
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">{post.content}</p>
        </li>
      ))}
    </ul>
  );
}
