import React from "react";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../lib/axios";
import Link from "next/link";

const Posts = ({ socket }) => {
  const { isLoading, error, data } = useQuery(["posts"], async () => {
    const res = await makeRequest.get("/post");

    return res.data;
  });

  return (
    <>
      {isLoading ? (
        <p>LOADING...</p>
      ) : error ? (
        <p>ERROR...</p>
      ) : (
        data.map((p, i) => <Post socket={socket} key={i} postdata={p} />)
      )}
    </>
  );
};

export default Posts;
