import React from "react";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";

const MobileSideBar = () => {
  return (
    <div className=" absolute bg-white top-16 right-0 p-4 w-60 h-[calc(100vh-60px)] border flex flex-col justify-between mt-1">
      <div>
        <div className="flex items-center mt-8 cursor-pointer">
          <Link href="/">
            <div className="flex items-center">
              <HomeOutlinedIcon className="text-blue-400" />
              <p className="ml-1">Home</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center mt-8 cursor-pointer">
          <Link href="/friends">
            <div className="flex items-center">
              <PeopleOutlineOutlinedIcon className="text-blue-400" />
              <p className="ml-1">Friends</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center mt-8 cursor-pointer">
          <GroupsOutlinedIcon className="text-blue-400" />
          <p className="ml-1">Groups</p>
        </div>
        <div className="flex items-center mt-8 cursor-pointer">
          <StorefrontOutlinedIcon className="text-blue-400" />
          <p className="ml-1">Marketplace</p>
        </div>
      </div>
      <div className="flex items-center mt-8 cursor-pointer">
        <LogoutOutlinedIcon className="text-blue-400" />
        <p className="ml-1">Logout</p>
      </div>
    </div>
  );
};

export default MobileSideBar;
