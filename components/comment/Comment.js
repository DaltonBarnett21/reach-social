import React from "react";
import Image from "next/image";
import { format } from "timeago.js";

const Comment = ({ commentData }) => {
  return (
    <div className="mt-4 flex pb-5 ">
      <div className=" flex-shrink-0">
        <Image
          src={
            commentData?.profilepic
              ? `/uploads/${commentData?.profilepic}`
              : `/no-avatar.png`
          }
          width={40}
          height={40}
          alt="profile image"
          className=" rounded-full mr-2 "
        />
      </div>

      <div>
        <p className=" font-semibold">{commentData?.name}</p>
        <p className=" text-gray-500 flex-shrink-0 text-xs ">
          {format(commentData?.timestamp)}
        </p>
        <p className="mt-1 text-gray-600">{commentData?.description}</p>
      </div>
    </div>
  );
};

export default Comment;
