import React from "react";
import Image from "next/image";
import Comment from "../comment/Comment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { makeRequest } from "../../lib/axios";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { SocketContext } from "../../context/socketContext";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [description, setDesc] = useState("");
  const inputRef = useRef(null);

  const { isLoading, error, data } = useQuery(["comments"], async () => {
    const res = await makeRequest.get(`/post/${postId}`);
    return res.data;
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comment", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ description, postId });
    socket.emit("sendNotification", {
      senderName: currentUser.name,
      receiverName: data[0]?.name,
      type: 2,
    });
    inputRef.current.value = "";
  };

  return (
    <div className="ml-4 mr-4">
      <div className=" flex mt-10 mb-8">
        <Image
          src={
            currentUser.profilepic
              ? "/uploads/" + currentUser.profilepic
              : "/no-avatar.png"
          }
          width={40}
          height={40}
          alt="profile image"
          className=" rounded-full"
        />
        <input
          type="text"
          placeholder="Write a comment"
          className="border border-gray-300 w-full ml-2 outline-none pl-2 rounded-md text-gray-600"
          onChange={(e) => setDesc(e.target.value)}
          ref={inputRef}
        />
        <button
          onClick={handleSubmit}
          className=" bg-blue-400 ml-4 w-32 text-white rounded-md hover:bg-blue-500"
        >
          Send
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data?.map((c, i) => <Comment key={i} commentData={c} />)
      )}
    </div>
  );
};

export default Comments;
