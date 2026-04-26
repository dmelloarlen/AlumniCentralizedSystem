import React from "react";
import heroImg from "../assets/hero.png";
import AlumniDetails from "./AlimniDetails";
import { CiShare1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Alumnis() {
  const [open, setOpen] = React.useState(false);
  const [selectedAlumni, setSelectedAlumni] = React.useState(null);
  const [filterItem, setFilterItem] = React.useState("");
  const [alumnis, setAlumnis] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${BASE_URL}/user/allprofile`, {
          headers: {
            Authorization: token,
          },
        });

        setAlumnis(res.data);
      } catch (error) {
        console.log("Error fetching alumni:", error);
      }
    };

    const fetchSuggestions = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/user/suggestions`, {
        headers: { Authorization: token },
      });

      setSuggestions(res.data);
    };

    fetchSuggestions();
    fetchAlumni();
  }, []);

  const filteredAlumnis = (filter) => {
    return alumnis.filter((alumni) => {
      const searchString =
        `${alumni.fullName} ${alumni.graduationYear} ${alumni.currentPosition} ${alumni.email}`.toLowerCase();

      return (
        searchString.includes(filter.toLowerCase()) &&
        alumni.role == "alumni" &&
        alumni.isApproved == "approved"
      );
    });
  };
  console.log(suggestions)

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">Alumni List</h1>
      <div className="mx-10 sticky top-17 z-50">
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
      {!filterItem && <>
        <h1 className="text-xl font-bold my-10 ml-5 lg:ml-20">Suggestions</h1>
        <section className="mt-8 display flex gap-6 flex-wrap justify-center">
          {suggestions.length > 0 ? (
            suggestions.map((alumni, i) => (
              <div
                onClick={() => navigate(`/profile/${alumni.user._id}`)}
                key={i}
                className="bg-white rounded-lg p-6 mb-4 hover:scale-105 shadow-xl transition-transform duration-300 w-80 cursor-pointer"
              >
                <div className="flex justify-end">
                  <CiShare1 onClick={() => navigate(`/profile/${alumni.user._id}`)} />
                </div>
                <img
                  src=" https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Alumni"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{alumni.user.name}</h2>
                <p className="text-gray-600 mb-1">
                  Graduated: {alumni.user.graduationYear}
                </p>
                {alumni.user.currentdetails && (
                  <p className="text-gray-600 mb-1">
                    Current Position:{" "}
                    {alumni.user.currentdetails.designation +
                      " at " +
                      alumni.user.currentdetails.company}
                  </p>
                )}
                <p className="text-gray-600">
                  Email:
                  <a
                    href={`mailto:${alumni.user.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {alumni.user.email}
                  </a>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">
              No alumni found matching your search criteria.
            </p>
          )}
        </section>
      </>}
      <h1 className="text-xl font-bold my-10 ml-5 lg:ml-20">All</h1>
      <section className="mt-8 display flex gap-6 flex-wrap justify-center">
        {filteredAlumnis(filterItem).length > 0 ? (
          filteredAlumnis(filterItem).map((alumni, i) => (
            <div
              onClick={() => {
                setSelectedAlumni(alumni);
                setOpen(true);
              }}
              key={i}
              className="bg-white rounded-lg p-6 mb-4 hover:scale-105 shadow-xl transition-transform duration-300 w-80 cursor-pointer"
            >
              <div className="flex justify-end">
                <CiShare1 onClick={() => navigate(`/profile/${alumni._id}`)} />
              </div>
              <img
                src=" https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Alumni"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{alumni.name}</h2>
              <p className="text-gray-600 mb-1">
                Graduated: {alumni.graduationYear}
              </p>
              {alumni.currentdetails && (
                <p className="text-gray-600 mb-1">
                  Current Position:{" "}
                  {alumni.currentdetails.designation +
                    " at " +
                    alumni.currentdetails.company}
                </p>
              )}
              <p className="text-gray-600">
                Email:
                <a
                  href={`mailto:${alumni.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {alumni.email}
                </a>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center w-full">
            No alumni found matching your search criteria.
          </p>
        )}
      </section>
      <AlumniDetails open={open} setOpen={setOpen} alumni={selectedAlumni} />
    </div>
  );
}
