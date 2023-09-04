import React from "react";
import "./Posts.css";

import { PostData } from "../../Data/postData";
import Post from "../post/Post";

function Posts() {
  return (
    <div className="Post">
      {PostData.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
}

export default Posts;
