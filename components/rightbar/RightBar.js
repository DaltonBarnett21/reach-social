import React from "react";
import Image from "next/image";
import ProfileCard from "../profileCard/ProfileCard";

const RightBar = () => {
  return (
    <div className="hidden lg:block sticky top-20 h-[calc(100vh-95px)] p-4 flex-[30%] bg-white">
      <p className=" text-gray-500 mb-2">Friend Suggestions</p>
      <div className="shadow-md p-6">
        <ProfileCard isAddFriend={true} />
        <ProfileCard isAddFriend={true} />
        <ProfileCard isAddFriend={true} />
      </div>
      <p className=" text-gray-500 mb-4 mt-10">Online Friends</p>
      <div className="shadow-md p-6 ">
        <ProfileCard isOnline={true} />
        <ProfileCard isOnline={true} />
        <ProfileCard isOnline={true} />
      </div>
    </div>
  );
};

export default RightBar;
