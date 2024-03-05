import React, { useState } from "react";

const CreateBlog = () => {
  const [blogImage, setblogImage] = useState("../../defaultImage.jpg");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setblogImage(reader.result);

        console.log(blogImage);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-[80vh]  py-14 px-20">
      <div className="w-full min-h-[80vh] flex flex-col items-center">
        <h1 className="text-1xl mb-4 capitalize font-semibold text-zinc-800">
          <span className="uppercase mx-2 text-purple-950 font-extrabold text-2xl">
            create
          </span>
          your blog here and don't worry you can
          <span className="uppercase mx-2 text-purple-950 font-extrabold text-2xl">
            edit
          </span>
          it any time...
        </h1>

        <form className="w-[100%] flex flex-col mx-auto gap-5 items-center">
          <img
            className="w-[80%] h-[80vh]  border-4 border-purple-900 rounded-lg mb-4"
            style={{ objectFit: "contain" }}
            src={blogImage}
            alt=""
          />
          <input
            className=""
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <input
            className="w-[80%] rounded-lg border-2 border-purple-600 "
            type="text"
            name="title"
            id="title"
            placeholder="Title Goes Here...."
          />

          <textarea
            rows={10}
            className="w-[80%] rounded-lg border-2 border-purple-600 "
            type=""
            name="content"
            id="Content"
            placeholder="Content Goes Here...."
          />

          <input
            className="bg-purple-200 font-semibold py-2 px-4 border-2 border-purple-600 rounded-lg hover:text-purple-950 hover:font-bold hover:bg-purple-100 cursor-pointer"
            type="submit"
            value="Create Blog"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
