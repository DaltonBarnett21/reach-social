import React from "react";
import PortraitIcon from "@mui/icons-material/Portrait";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { makeRequest } from "../../lib/axios";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
const UpdateProfile = ({
  openProfileModel,
  setOpenProfileModel,
  currentUser,
}) => {
  const [updatedInfo, setUpdatedInfo] = useState({
    email: currentUser.email,
    password: currentUser.password,
    name: currentUser.name,
    city: currentUser.city,
    about: currentUser.about,
  });
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/image", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newState = {};
    newState[name] = value;

    setUpdatedInfo((prev) => ({ ...prev, ...newState }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/user", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userProfile"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : currentUser.coverpic;
    profileUrl = profile ? await upload(profile) : currentUser.profilepic;

    mutation.mutate({
      ...updatedInfo,
      coverPic: coverUrl,
      profilePic: profileUrl,
    });

    setOpenProfileModel(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className=" absolute bg-white top-32 w-[400px] md:w-[500px] h-[620px] rounded-lg shadow-xl p-5 ">
      <div className="w-full p-5">
        <div
          onClick={() => setOpenProfileModel(!openProfileModel)}
          className="flex justify-end text-xl cursor-pointer text-red-500 font-bold"
        >
          X
        </div>
        <h2 className=" text-xl font-semibold">Update Profile</h2>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col w-[320px]">
          <input
            type="file"
            className=" hidden"
            id="profilePic"
            onChange={(e) => setProfile(e.target.files[0])}
          />

          <input
            type="file"
            className=" hidden"
            id="coverPic"
            onChange={(e) => setCover(e.target.files[0])}
          />

          <label
            htmlFor="profilePic"
            className="flex items-center text-gray-500 mb-5"
          >
            <PortraitIcon fontSize="large" className="cursor-pointer mr-1" />
            <p>Update Cover Picture</p>
            <Image
              alt=""
              height={50}
              width={50}
              src={
                profile
                  ? URL.createObjectURL(profile)
                  : "/uploads/" + currentUser.coverpic
              }
              className="ml-10 rounded-lg border border-gray-500"
            />
          </label>

          <label
            htmlFor="coverPic"
            className="flex items-center text-gray-500 mb-5"
          >
            <CropOriginalIcon
              fontSize="large"
              className="cursor-pointer mr-1"
            />
            <p>Update Profile Picture</p>
            <Image
              alt=""
              height={50}
              width={50}
              src={
                cover
                  ? URL.createObjectURL(cover)
                  : "/uploads/" + currentUser.profilepic
              }
              className="ml-11 rounded-lg border border-gray-500"
            />
          </label>

          <input
            type="text"
            name="email"
            placeholder="Update Email"
            className=" outline-none bg-gray-100 p-2 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Update Password"
            className=" outline-none bg-gray-100 p-2 rounded-lg mt-5"
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Update Name"
            className=" outline-none bg-gray-100 p-2 rounded-lg mt-5"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Update City"
            className=" outline-none bg-gray-100 p-2 rounded-lg mt-5"
            onChange={handleChange}
          />
          <textarea
            onChange={handleChange}
            name="about"
            className="outline-none bg-gray-100 p-2 rounded-lg mt-5"
            placeholder="update about"
          />
          <button
            type="submit"
            className=" self-start mt-5 bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
