import React, { use, useEffect } from "react";
import AlimniDetails from "../AlimniDetails";
import ToolTip from "../UI/ToolTip";
import { CircleCheckBig } from 'lucide-react';
import { CircleX } from 'lucide-react';
import toast from "react-hot-toast";
import axios from "axios";

export default function AlumniRequests() {
  const [filterItem, setFilterItem] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedAlumni, setSelectedAlumni] = React.useState(null);
  const [alumnis, setAlumnis] = React.useState([]);


  useEffect(() => {
    
    try {
      const fetchAlumniRequests = async () => {
        const res = await axios.get("http://localhost:5000/api/user");
        setAlumnis(res.data);
      };

      fetchAlumniRequests();
    } catch (error) {
      console.log("Error fetching alumni requests:", error);
    }
  }, []);

  const filteredAlumnis = (filter) => {
  return alumnis.filter((alumni) => {
    const searchString =
      `${alumni.fullName} ${alumni.graduationYear} ${alumni.currentPosition} ${alumni.email}`.toLowerCase();

    return (
      searchString.includes(filter.toLowerCase()) &&
      alumni.role !== "admin" &&
      alumni.isApproved === "pending"
    );
  });
};

const handleApproval = async (uid, remark) => {
  try {
    const res = await axios.patch(
      `http://localhost:5000/api/user/toggle-approve/${uid}/${remark}`
    );
    toast.success(`Alumni request ${remark}!`);
    setOpen(false);
  } catch (error) {
    console.log("Error toggling approval:", error);
    toast.error("Failed to update alumni request.");
  }
};

  return (
    <div>
      <div className="mx-10 mt-10 sticky top-17 z-50">
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
      <section className="mt-8 display flex gap-3 flex-wrap justify-center">
        {filteredAlumnis(filterItem).length > 0 ? (
          filteredAlumnis(filterItem).map((alumni, i) => (
              <div
              key={i}
                className="container w-sm lg:w-6xl my-2 p-2 flex justify-between gap-2 shadow-lg rounded-lg hover:scale-102 transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedAlumni(alumni);
                  setOpen(true);
                }}
              >
                <div className="flex gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Alumni"
                    className="h-15 w-15 rounded-full"
                  />
                  <h4 className="text-md lg:text-2xl mt-4">{alumni.fullName}</h4>
                  </div>

                <div className="flex gap-4">
                  <div className="mt-4">
                    <ToolTip
                      className="tooltip"
                      data-tip="Accept request"
                      dataTip={"Accept request"}
                    >
                      <CircleCheckBig
                        className="text-2xl cursor-pointer text-green-500"
                        onClick={() => handleApproval(alumni._id, "approved")}
                      />
                    </ToolTip>
                  </div>
                  <div className="mt-4">
                    <ToolTip
                      className="tooltip"
                      data-tip="Reject request"
                      dataTip={"Reject request"}
                    >
                      <CircleX
                        className="text-2xl cursor-pointer text-red-500"
                        onClick={() => handleApproval(alumni._id, "rejected")}
                      />
                    </ToolTip>
                  </div>
                </div>
              </div>
          ))
        ) : (
          <p className="text-gray-600 text-center w-full">
            No alumni found matching your search criteria.
          </p>
        )}
      </section>
      <AlimniDetails
        open={open}
        setOpen={setOpen}
        alumni={selectedAlumni}
        approve={handleApproval}
        type="request"
      />
    </div>
  );
}
