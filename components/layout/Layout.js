import React from "react";
import LeftBar from "../leftbar/LeftBar";
import Navbar from "../navbar/Navbar";
import Rightbar from "../rightbar/RightBar";

const Layout = ({ children, socket }) => {
  return (
    <>
      <Navbar />
      <main className="flex">
        <LeftBar />
        <div className="flex-[95%]  p-4 bg-gray-100 lg:pl-20 lg:pr-20  lg:pb-10">
          {children}
        </div>
        <Rightbar />
      </main>
    </>
  );
};

export default Layout;
