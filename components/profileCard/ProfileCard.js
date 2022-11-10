import React from "react";
import Image from "next/image";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ProfileCard = ({ isOnline, isAddFriend }) => {
  if (isOnline) {
    return (
      <div className="flex items-center mt-6 cursor-pointer relative bg-white">
        <Image
          src="/aboutImage.jpg"
          width={35}
          height={35}
          alt="profile image"
          className=" rounded-full"
        />
        <p className="ml-2">Dalton Barnett</p>
        <span className="h-3 w-3 bg-green-500 rounded-full absolute left-5 top-4"></span>
      </div>
    );
  } else if (isAddFriend) {
    return (
      <div className="flex items-center mt-6 cursor-pointer bg-white">
        <Image
          src="/aboutImage.jpg"
          width={35}
          height={35}
          alt="profile image"
          className=" rounded-full"
        />
        <div className="ml-2">
          <p className="">Dalton Barnett</p>
          <p className=" text-xs text-gray-500">DaltonBarnett21</p>
        </div>
        <PersonAddOutlinedIcon className=" text-blue-400 ml-5" />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between mt-3 cursor-pointer bg-white p-4 shadow-md">
        <div className="flex items-center">
          <Image
            src="/aboutImage.jpg"
            width={45}
            height={45}
            alt="profile image"
            className=" rounded-full"
          />
          <div className="ml-2">
            <p className="">Dalton Barnett</p>
            <p className=" text-xs text-gray-500">DaltonBarnett21</p>
          </div>
        </div>

        <MoreVertIcon />
      </div>
    );
  }
};

export default ProfileCard;
