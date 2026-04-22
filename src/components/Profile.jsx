import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreatePost, PostVacancy } from "./ProfilePopups";
import { use } from "react";
import { useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const [jobOpen, setJobOpen] = React.useState(false);
  const [createPostOpen, setCreatePostOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [selectedAlumni, setSelectedAlumni] = React.useState(null);
  const [alumni, setAlumni] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;

        if (id) {
          res = await axios.get(`${BASE_URL}/user/profile/${id}`);
        } else {
          const token = localStorage.getItem("token");

          res = await axios.get(`${BASE_URL}/user/profile`, {
            headers: {
              Authorization: token,
            },
          });
        }

        setAlumni(res.data);
        const token = localStorage.getItem("token");

        if (!id && token) {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          setCurrentUser(decoded.id);
        }
      } catch (error) {
        console.log("Error fetching alumni:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex justify-center">
      {(alumni && (
        <div className="container lg:w-6xl">
          <section className="flex p-3 m-3 gap-20 lg:gap-50">
            <div className="sm:mt-5 flex flex-col lg:flex-row lg:items-center lg:gap-10 lg:justify-center">
              <div>
                <img
                  src={
                    alumni.profileImage ||
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  }
                  alt="Alumni"
                  className="h-25 w-25 lg:h-40 lg:w-40 rounded-full hover:scale-200 hover:translate-15 transition-transform duration-800 cursor-pointer"
                />
              </div>
              <div className="p-4">
                <h4 className="text-md lg:text-6xl">{alumni.name}</h4>
                <p className="text-md hidden lg:block mt-1">
                  Branch: {alumni.department}
                </p>
                <p className="text-md hidden lg:block mt-2">
                  Graduation Year: {alumni.graduationYear}
                </p>
                {alumni.currentdetails?.company && (
                  <p className="text-md hidden lg:block mt-1">
                    Current Company: {alumni.currentdetails.company}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:mt-5 flex flex-row items-center gap-10 lg:gap-30 justify-center">
              <div
                className="lg:p-4 cursor-pointer"
                onClick={() => navigate("/follow")}
              >
                <h4 className="text-xl font-bold">Followers</h4>
                {alumni.followers ? alumni.followers.length : 0}
              </div>
              <div
                className="lg:p-4 cursor-pointer"
                onClick={() => navigate("/follow")}
              >
                <h4 className="text-xl font-bold">Following</h4>
                {alumni.following ? alumni.following.length : 0}
              </div>
            </div>
          </section>
          <hr />
          {alumni?._id === currentUser && (
            <div className=" m-3  flex gap-2 justify-end">
              {alumni?.isApproved == "approved" && (
                <>
                  <button
                    type="button"
                    className=" justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  mx-3 cursor-pointer"
                    onClick={() => setJobOpen(true)}
                  >
                    Post Vacancy
                  </button>
                  <button
                    type="button"
                    className=" justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  mx-3 cursor-pointer"
                    onClick={() => setCreatePostOpen(true)}
                  >
                    Create Post
                  </button>
                </>
              )}
              <button
                type="button"
                className=" justify-center rounded-md bg-green-500 hover:bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  mx-3 cursor-pointer"
                onClick={() => navigate("/editprofile")}
              >
                Edit Profile
              </button>
            </div>
          )}
          <section className="p-6">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4  pb-2">
              About
            </h4>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {alumni.about ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </p>
            <h4 className="text-2xl font-semibold text-gray-800 mb-4  pb-2">
              Experience
            </h4>
            <ul className="text-gray-700 list-disc list-inside mb-6 space-y-2">
              {alumni.experience?.map((exp, index) => (
                <li key={index}>
                  <span className="font-semibold text-blue-600">
                    {exp.designation} at {exp.company}:
                  </span>{" "}
                  {exp.description}
                </li>
              ))}
            </ul>
            <h4 className="text-2xl font-semibold text-gray-800 mb-4  pb-2">
              Education
            </h4>
            <ul className="text-gray-700 list-disc list-inside mb-6 space-y-2">
              {alumni.education?.map((edu, index) => (
                <li key={index}>
                  <span className="font-semibold text-blue-600">
                    {edu.course} in {edu.branch}:
                  </span>{" "}
                  Graduated from {edu.institution} in {edu.yearofPassing}.
                </li>
              ))}
            </ul>
            <h4 className="text-2xl font-semibold text-gray-800 mb-4  pb-2">
              Current Details
            </h4>
            <ul className="text-gray-700 list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold text-blue-600">
                  Current Position:
                </span>{" "}
                {alumni.currentdetails?.role || "Not specified"} at{" "}
                {alumni.currentdetails?.company || "Not specified"}
              </li>
              <li>
                <span className="font-semibold text-blue-600">
                  Designation:
                </span>{" "}
                {alumni.currentdetails?.designation || "Not specified"}
              </li>
              <li>
                <span className="font-semibold text-blue-600">Location:</span>{" "}
                {alumni.currentdetails?.location || "Not specified"}
              </li>
            </ul>
          </section>
          <hr />
          <section className="m-3">
            <h4 className="text-2xl font-medium mb-4">Posts</h4>
            <div className="bg-white shadow-xl rounded-xl p-6 mb-4 hover:scale-102 transition-transform duration-300">
              <h5 className="text-lg font-medium mb-2">Post Title</h5>
              <p className="text-sm mb-4">
                This is a sample post description. It can be about an
                internship, job, or any other update.
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditData({});
                    setCreatePostOpen(true);
                  }}
                  className=" bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-lg font-medium  rounded-4xl text-xs px-3 py-1.5"
                >
                  Edit Post
                </button>
                <button
                  type="button"
                  className=" bg-red-500 hover:bg-red-600 text-white cursor-pointer shadow-lg font-medium  rounded-4xl text-xs px-3 py-1.5"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>
        </div>
      )) || <p>Loading...</p>}

      <PostVacancy open={jobOpen} setOpen={setJobOpen} />
      <CreatePost
        open={createPostOpen}
        setOpen={setCreatePostOpen}
        editData={editData}
      />
    </div>
  );
}
  