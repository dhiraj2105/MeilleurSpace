import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";

function Posts() {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  }, []);

  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userid === params.id);
  return (
    <div className="Post">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
}

export default Posts;
