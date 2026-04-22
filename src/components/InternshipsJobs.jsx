import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function InternshipsJobs() {
  const [filterItem, setFilterItem] = React.useState("");
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/jobs`);

        if (res.status === 200) {
          setJobs(res.data || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  const filterInternshipsJobs = (filterItem) => {
    if (!jobs) return [];

    return jobs.filter(
      (job) =>
        job.jobTitle?.toLowerCase().includes(filterItem.toLowerCase()) ||
        job.company?.toLowerCase().includes(filterItem.toLowerCase()),
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-medium text-center mt-10">
        Internships / Jobs
      </h1>
      <div className="mx-10 sticky top-17 z-50 blur-[0.4px]">
        <form className="max-w-md mx-auto">
          <label
            for="search"
            className="block mb-2.5 text-sm font-medium text-heading sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-3 ps-9 text-sm rounded-base shadow-lg rounded-2xl focus:outline-none"
              placeholder="Search"
              onChange={(e) => setFilterItem(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute end-1.5 bottom-1.5  bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-lg font-medium  rounded-4xl text-xs px-3 py-1.5"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <section className="mt-8 display flex gap-6 flex-wrap justify-center">
        {filterInternshipsJobs(filterItem).length > 0 ? (
          filterInternshipsJobs(filterItem).map((job, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 mb-4 hover:scale-105 transition-transform shadow-xl duration-300 w-80"
            >
              <div
                className="flex items-center justify-end mb-4 cursor-pointer"
                onClick={() => navigate(`/profile/${job.userId._id}`)}
              >
                <img
                  src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                  alt={`${job.name} Logo`}
                  className="h-6 w-6 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/64?text=No+Logo";
                  }}
                />
                {job.userId && (
                  <span className="text-xs text-gray-500 ms-2">
                    {job.userId.name}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-1">Company: {job.company}</p>
                <p className="text-gray-600 mb-1">Location: {job.location}</p>
                <p className="text-gray-600 mb-1">Type: {job.type}</p>
                <p className="text-gray-600 mb-1">Mode: {job.mode}</p>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Get Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center w-full">
            No internships or jobs found matching your search criteria.
          </p>
        )}
      </section>
    </div>
  );
}
