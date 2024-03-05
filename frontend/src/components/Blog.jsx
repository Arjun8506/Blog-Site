import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogbgimage, setblogbgimage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
  );

  return (
    <div
      className="w-[30%] h-[80vh] bg-zinc-400 rounded-lg border-4 border-purple-600 bg-contain bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${blogbgimage})`,
        backgroundSize: "fill",
        backgroundPosition: "center",
      }}
    >
      <div className=" relative w-[100%] h-[80vh] bg-zinc-900/25 px-5 mb-4">
        <div className="absolute bottom-5 ">
          <div className="flex items-center mb-4 justify-between">
            <p className="capitalize text-white font-extralight text-md">
              05/03/2024
            </p>
            <div className="flex items-center gap-1">
              <img
                className="rounded-full w-8"
                src="../../defaultImage.jpg"
                alt="profile image"
              />
              <h1 className="capitalize text-white font-extralight text-md">
                arjun nagar
              </h1>
            </div>
          </div>
          <Link className=" mt-2 capitalize text-white font-extralight text-md">
          Windows: Using Alt key: type 24 (up), 25 (down), 26 (right), or 27 (left), and release Alt to create the arrow.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
