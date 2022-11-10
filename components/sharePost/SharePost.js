import React from "react";
import Image from "next/image";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import FilterIcon from "@mui/icons-material/Filter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../lib/axios";

const SharePost = () => {
  const { currentUser } = useContext(AuthContext);
  const [description, setDesc] = useState("");
  const [file, setFile] = useState();
  const inputRef = useRef(null);

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/image", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const QueryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/post", newPost);
    },
    {
      onSuccess: () => {
        QueryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await uploadImage();
    mutation.mutate({ description, img: imgUrl });
    inputRef.current.value = "";
    setFile(null);
  };

  return (
    <div className="bg-white p-4 rounded-md mt-10">
      <div className="  flex justify-between items-center mt-4 ">
        <div className="flex w-full">
          <Image
            src={
              currentUser?.profilepic
                ? `/uploads/${currentUser?.profilepic}`
                : "/no-avatar.png"
            }
            width={50}
            height={50}
            alt="profile image"
            className=" rounded-full ml-3"
          />
          <input
            type="text"
            className="ml-2 w-full outline-none bg-gray-100 rounded-xl text-gray-600 p-2"
            placeholder={`whats on your mind ${
              currentUser?.name?.split(" ")[0]
            }?`}
            onChange={(e) => setDesc(e.target.value)}
            ref={inputRef}
          />
        </div>
      </div>
      <div className=" pl-4 pt-4 ml-14  flex justify-between items-center  ">
        <div className="flex items-center">
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <FilterIcon className="cursor-pointer mr-2" />
          </label>
          <p>Add Photo</p>
        </div>

        <button
          onClick={handleSubmit}
          className=" bg-blue-400 text-white w-28 p-1 rounded-lg hover:bg-blue-500"
        >
          Post
        </button>
      </div>
      <div className=" pl-4 pt-4 ml-14  flex justify-between items-center  ">
        {file && (
          <div className="relative">
            <Image
              src={URL.createObjectURL(file)}
              alt="dropzone image"
              width={1000}
              height={100}
            />
            <button
              onClick={() => setFile(null)}
              className="text-xs absolute top-2 right-2 bg-red-500 text-white p-1 rounded-lg"
            >
              Cancel Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePost;
