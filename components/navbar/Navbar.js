import React, { useCallback, useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Link from "next/link";
import MobileSideBar from "../mobileSideBar/MobileSideBar";
import { SocketContext } from "../../context/socketContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [openNotification, setOpenNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    return () => {
      socket?.off("getNotification");
    };
  }, [socket]);

  return (
    <div className="flex items-center justify-between p-4 border-b-2 sticky top-0 bg-white z-20 ">
      <div className="flex items-center">
        {!isOpen && (
          <Link href="/">
            <h1 className=" lg:text-3xl text-2xl font-bold text-blue-400 ">
              Reach Social
            </h1>
          </Link>
        )}

        {isOpen && (
          <input
            placeholder="Search"
            className=" outline-none border p-1 w-44  "
          />
        )}

        <div className="relative bg-gray-100 p-1  ml-3 rounded-md flex-1 hidden lg:flex ">
          <SearchOutlinedIcon className="absolute left-0 text-gray-500 " />
          <input
            placeholder="Search"
            className=" outline-none ml-6 bg-gray-100 "
          />
        </div>
      </div>

      <div className="flex items-center">
        <SearchOutlinedIcon
          className="cursor-pointer flex lg:invisible"
          onClick={() => setIsOpen(!isOpen)}
        />
        <PersonOutlineOutlinedIcon className="ml-3 cursor-pointer " />
        <EmailOutlinedIcon className="ml-3 cursor-pointer" />

        <div className="relative">
          {notifications?.length > 0 && (
            <>
              <p className=" z-30 absolute bg-red-500 h-4 w-4 flex justify-center items-center rounded-full left-6 text-sm text-white">
                {notifications?.length}
              </p>
            </>
          )}
          <NotificationsNoneOutlinedIcon
            className="ml-3 cursor-pointer relative"
            onClick={() => setOpenNotification(!openNotification)}
          />
          {openNotification && (
            <div className=" bg-white  flex-col items-center shadow-xl absolute top-7 w-80 h-34 p-4 flex justify-center -right-28 rounded-lg">
              {notifications.slice(0, 3).map((n, i) => (
                <div key={n.senderName} className="mt-1 ">
                  <p>
                    {n.senderName}
                    {n.type === 1
                      ? " liked your post"
                      : n.type === 2
                      ? " commented on your post"
                      : ""}
                  </p>
                </div>
              ))}
              <button className=" bg-blue-400 p-2 rounded-lg text-xs mt-2 text-white">
                See All Notifications
              </button>
            </div>
          )}
        </div>

        <Link href={`/profile/${currentUser.id}`}>
          <div className="flex items-center">
            <Image
              src={
                currentUser?.profilepic
                  ? `/uploads/${currentUser?.profilepic}`
                  : "/no-avatar.png"
              }
              width={35}
              height={35}
              alt="profile image"
              className=" rounded-full ml-2"
            />
            <span className="ml-1 hidden lg:block">{currentUser?.name}</span>
          </div>
        </Link>
        {!isOpenMenu && (
          <MenuIcon
            className="ml-3 cursor-pointer lg:invisible"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
        )}
        {isOpenMenu && (
          <CloseOutlinedIcon
            className="hover:cursor-pointer ml-2"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
        )}
      </div>

      {isOpenMenu && <MobileSideBar />}
    </div>
  );
};

export default Navbar;
