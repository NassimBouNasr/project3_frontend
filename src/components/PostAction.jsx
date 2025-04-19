import { useState } from "react";

export default function PostAction({ currentUser }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send session
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setContent(""); // clear after post
        alert("Post submitted!");
      } else {
        alert("Error submitting post.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          What's on your mind, {currentUser?.name}?
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Post your thoughts</p>
        </div>
        <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
          <div className="w-full sm:max-w-xs">
            <input
              type="text"
              name="post"
              id="post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="type your post"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
