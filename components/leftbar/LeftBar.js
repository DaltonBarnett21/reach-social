import React from "react";
import Image from "next/image";
import Link from "next/link";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useRouter } from "next/router";

const LeftBar = () => {
  const router = useRouter();

  const logout = async () => {
    await axios.get("http://localhost:3000/api/auth/logout");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="hidden lg:flex sticky top-20 h-[calc(100vh-95px)] p-4 flex-[30%] bg-white flex-col justify-between ">
      <div>
        <div className="flex items-center mt-4=2 cursor-pointer">
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

      <div onClick={logout} className="flex items-center mt-8 cursor-pointer">
        <LogoutIcon className="text-blue-400" />
        <p className="ml-1">Logout</p>
      </div>
    </div>
  );
};

export default LeftBar;
