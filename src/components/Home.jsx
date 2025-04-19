import React from "react";
import PostAction from "./PostAction";
import Posts from "./Posts";

export default function Home({ currentUser }) {
  return (
    <div>
      <PostAction currentUser={currentUser} />
      <Posts />
    </div>
  );
}
