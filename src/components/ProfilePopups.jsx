"use client";

import { useState } from "react";
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
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PostVacancy = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = {
      jobTitle: e.target.jobTitle.value,
      company: e.target.company.value,
      location: e.target.location.value,
      type: e.target.type.value,
      mode: e.target.mode.value,
      description: e.target.description.value,
      contact: e.target.contact.value,
      applyLink: e.target.applyLink.value,
    };
    if (
      !formData.jobTitle ||
      !formData.company ||
      !formData.location ||
      !formData.type ||
      !formData.mode ||
      !formData.description ||
      !formData.contact ||
      !formData.applyLink
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/jobs`, formData, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        toast.success("");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {true && (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative w-full px-4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div
                  className="flex justify-end mx-3 mt-3 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <RxCross1 className="" />
                </div>
                <div className="bg-white pb-4 sm:px-6 sm:pb-4">
                  <h1 className="text-2xl font-medium text-center mt-5">
                    Post a Vacancy
                  </h1>
                  <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="jobTitle"
                      >
                        Job Title
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="jobTitle"
                        type="text"
                        placeholder="Enter job title"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="company"
                      >
                        Company
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="company"
                        type="text"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="location"
                      >
                        Location
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location"
                        type="text"
                        placeholder="Enter job location"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="location"
                      >
                        Type
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="type"
                        placeholder="Enter job type"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="location"
                      >
                        Mode
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mode"
                        placeholder="Enter job mode"
                      >
                        <option value="onsite">On-site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="description"
                      >
                        Job Description
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Enter job description"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="description"
                      >
                        Contact(Email or Phone)
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="contact"
                        placeholder="Enter contact information"
                      ></input>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="description"
                      >
                        Apply Link
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="applyLink"
                        placeholder="Enter apply link"
                      ></input>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer"
                        type="submit"
                      >
                        Post Vacancy
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer"
                        type="button"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export const CreatePost = ({ open, setOpen, editData }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      postTitle: e.target.postTitle.value,
      description: e.target.description.value,
    };
    console.log(formData);
    if (!formData.postTitle || !formData.description) {
      alert("Please fill all the fields");
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {true && (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-2 lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform w-full px-4 overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div
                  className="flex justify-end mx-3 mt-3 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <RxCross1 className="" />
                </div>
                <div className="bg-white pb-4 sm:px-6 sm:pb-4">
                  <h1 className="text-2xl font-medium text-center mt-5">
                    Create a Post
                  </h1>
                  <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="jobTitle"
                      >
                        Post Title
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="postTitle"
                        placeholder="Enter post title"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="description"
                      >
                        Post Description
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Enter post description"
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer"
                        type="submit"
                      >
                        Create Post
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer"
                        type="button"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
