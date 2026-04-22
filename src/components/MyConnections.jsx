import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import axios from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import ToolTip from "./UI/ToolTip";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function MyConnections() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${BASE_URL}/user/connect/requests`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const allConnections = res.data || [];

        const pending = allConnections.filter((c) => c.status !== "accepted");

        const accepted = allConnections.filter((c) => c.status === "accepted");

        setPendingRequests(pending);
        setAcceptedConnections(accepted);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchConnections();
  }, []);

  const handleRespond = async (senderId, action) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${BASE_URL}/user/connect/respond`,
        {
          senderId,
          action,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (res.status === 200) {
        console.log(res.data);

        setPendingRequests((prev) =>
          prev.filter((req) => req.userId._id !== senderId),
        );

        if (action === "accepted") {
          const acceptedUser = pendingRequests.find(
            (req) => req.userId._id === senderId,
          );

          if (acceptedUser) {
            setAcceptedConnections((prev) => [
              ...prev,
              { ...acceptedUser, status: "accepted" },
            ]);
          }
        }
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        {pendingRequests.length > 0 && (
          <h3 className="text-2xl mt-10">Requestes</h3>
        )}
        {pendingRequests.map((data, i) => (
          <div
            key={i}
            className="container w-sm lg:w-6xl my-10 p-2 flex justify-between gap-2 shadow-lg rounded-lg hover:scale-102 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate(`/profile/${data?.userId._id}`)}
          >
            <div className="flex gap-2">
              <img
                src={
                  data.profilePicture ||
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }
                alt="Alumni"
                className="h-15 w-15 rounded-full"
              />
              <h4 className="text-md lg:text-2xl mt-4">{data.userId.name}</h4>
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
                    onClick={() => handleRespond(data?.userId._id, "accepted")}
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
                    onClick={() => handleRespond(data?.userId._id, "rejected")}
                  />
                </ToolTip>
              </div>
            </div>
          </div>
        ))}
        {acceptedConnections.length > 0 ? (
          <>
            <h3 className="text-2xl mt-10">Connected</h3>
            {acceptedConnections.map((data, i) => (
              <div
                key={i}
                className="container w-sm lg:w-6xl my-10 p-2 flex justify-between gap-2 shadow-lg rounded-lg hover:scale-102 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate(`/profile/${data?.userId._id}`)}
              >
                <div className="flex gap-2">
                  <img
                    src={
                      data.profilePicture ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }
                    alt="Alumni"
                    className="h-15 w-15 rounded-full"
                  />
                  <h4 className="text-md lg:text-2xl mt-4">
                    {data.userId.name}
                  </h4>
                </div>
                <div className="mt-4">
                  <CiChat1
                    className="text-2xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/chat");
                    }}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="mt-10">No Connections Yet</div>
        )}
      </div>
    </div>
  );
}
