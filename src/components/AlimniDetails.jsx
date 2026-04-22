"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AlumniDetails({
  open,
  setOpen,
  alumni,
  target = true,
}) {
  const [current, setCurrent] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${BASE_URL}/user/Profile`, {
          headers: {
            Authorization: token,
          },
        });

        setCurrent(res.data);
      } catch (error) {
        console.log("Error fetching alumni:", error);
      }
    };

    fetchAlumni();
  }, []);

  const updateConnection = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${BASE_URL}/user/connect`,
        { receiverId: id },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (res.status === 200) {
        alert("Success:", res.data);
      }
    } catch (err) {
      alert(err.response?.data.error || err.message);
    }
  };

  const isUserConnected = (targetUserId) => {
    if (!current.connections || !current.connections.length) return false;

    return current.connections.some((c) => c.userId._id === targetUserId);
  };

  return (
    <div>
      {alumni && (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div
                  className="flex justify-end mx-3 mt-3 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <RxCross1 className="" />
                </div>
                <div className="bg-white pb-4 sm:px-6 sm:pb-4">
                  <div className="">
                    <div className="sm:mt-5 flex flex-row items-center gap-4 flex-wrap justify-center">
                      <div className="mt-2">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                          alt="Alumni"
                          className="mx-auto h-24 w-24 rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className=" text-4xl font-medium">{alumni.name}</h4>
                        <p className="text-sm  mt-1">
                          Department: {alumni.department}
                        </p>
                        <p className="text-sm  mt-2">
                          Graduation Year: {alumni.graduationYear}
                        </p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <h5 className=" text-lg font-medium mb-2"> About </h5>
                      <p className="text-sm ">{alumni.about}</p>
                    </div>
                    {alumni.currentdetails && (
                      <div className="mt-4">
                        <h5 className=" text-lg font-medium mb-2">
                          {" "}
                          Current details{" "}
                        </h5>
                        <ul className="text-sm  list-disc list-inside">
                          <li>
                            <b>Company:</b> {alumni.currentdetails.company}
                          </li>
                          <li>
                            <b>Designation:</b>{" "}
                            {alumni.currentdetails.designation}
                          </li>
                          <li>
                            <b>Location:</b> {alumni.currentdetails.location}
                          </li>
                        </ul>
                      </div>
                    )}
                    <div className="mt-4">
                      <h5 className=" text-lg text-center font-medium mb-4">
                        {" "}
                        Social Media{" "}
                      </h5>
                      <div className="flex flex-row gap-4 justify-center">
                        <FaInstagram
                          size={30}
                          className="mx-auto cursor-pointer"
                          onClick={() =>
                            window.open(alumni.instagram, "_blank")
                          }
                        />
                        <FaLinkedin
                          size={30}
                          className="mx-auto cursor-pointer"
                          onClick={() => window.open(alumni.linkedin, "_blank")}
                        />
                        <FaSquareXTwitter
                          size={30}
                          className="mx-auto cursor-pointer"
                          onClick={() => window.open(alumni.twitter, "_blank")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {target && (
                  <>
                    <div className="text-center text-sm text-gray-500">
                      ---------------- or ----------------
                    </div>
                    <div className="py-3 flex justify-around sm:flex ">
                      <button
                        type="button"
                        className=" w-full justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  mx-3 cursor-pointer"
                        onClick={() => {
                          updateConnection(alumni?._id);
                        }}
                        disabled={isUserConnected(alumni?._id)}
                        >
                        {isUserConnected(alumni?._id)
                          ? "Connect +"
                          : "Conected"}
                      </button>
                      <button
                        type="button"
                        className=" w-full justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  mx-3 cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        Follow +
                      </button>
                    </div>
                  </>
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
