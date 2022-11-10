import React, { useState } from "react";
import Image from "next/image";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comments from "../comments/Comments";
import { format } from "timeago.js";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../lib/axios";
import { SocketContext } from "../../context/socketContext";

const Post = ({ postdata }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVertOpen, setIsVertOpen] = useState(false);
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", postdata?.id], () =>
    makeRequest.get(`/like/${postdata?.id}`).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const likeMutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete(`/like/${postdata?.id}`);
      return makeRequest.post(`/like`, { postId: postdata?.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete(`/post?postId=${postId}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    socket.emit("sendNotification", {
      senderName: currentUser.name,
      receiverName: postdata.name,
      type: 1,
    });
    likeMutation.mutate(data.includes(currentUser?.id));
  };

  const handlePostDeletion = () => {
    deleteMutation.mutate(postdata?.id);
  };

  return (
    <div className="bg-white p-4 rounded-md mt-10">
      <div className="  flex justify-between items-center ">
        <Link href={`http://localhost:3000/profile/${postdata?.userid}`}>
          <div className="flex">
            <Image
              src={
                postdata?.profilepic
                  ? `/uploads/${postdata?.profilepic}`
                  : "/no-avatar.png"
              }
              width={50}
              height={50}
              alt="profile image"
              className=" rounded-full ml-3"
            />
            <div className="ml-2">
              <p>{postdata?.name}</p>
              <p className="text-gray-500">{format(postdata?.timestamp)}</p>
            </div>
          </div>
        </Link>

        <div className="relative w-10">
          <MoreVertOutlinedIcon
            className=" hover:cursor-pointer"
            onClick={() => setIsVertOpen(!isVertOpen)}
          />
          {isVertOpen &&
            (postdata?.userid === currentUser.id ? (
              <div
                onClick={handlePostDeletion}
                className=" absolute bottom-0 right-0 bg-white border h-10 pl-5 pr-5 shadow-md flex items-center  rounded-md top-7 hover:bg-gray-100"
              >
                <p className=" text-red-500 cursor-pointer ">Delete</p>
              </div>
            ) : (
              <div className=" absolute bottom-0 right-0 bg-white border h-10 pl-5 pr-5 shadow-md flex items-center  rounded-md top-7 hover:bg-gray-100">
                <p className=" text-red-500 cursor-pointer ">Report</p>
              </div>
            ))}
        </div>
      </div>
      <div className="pt-2 pb-2">
        <p className="ml-4 mt-4">{postdata?.description}</p>
      </div>

      {postdata?.img && (
        <Image
          src={`/uploads/${postdata?.img}`}
          width={1000}
          height={100}
          className="rounded-md p-4"
          alt="post"
        />
      )}

      <div className="mt-3 ml-3 mb-2 flex">
        <div className="flex items-center">
          {isLoading ? (
            <p>Loading</p>
          ) : data?.includes(currentUser.id) ? (
            <FavoriteIcon
              className=" hover:cursor-pointer mr-1 text-red-400"
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              className=" hover:cursor-pointer mr-1"
              onClick={handleLike}
            />
          )}

          <p>{data?.length} Likes</p>
        </div>
        <div
          className="flex items-center  hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageOutlinedIcon className=" ml-4 mr-1" />
          <p>View Comments</p>
        </div>
      </div>
      {isOpen && <Comments postId={postdata.id} />}
    </div>
  );
};

export default Post;
