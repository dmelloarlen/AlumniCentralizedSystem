import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import axios from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import ToolTip from "./UI/ToolTip";
import { IoVideocamOutline } from "react-icons/io5";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MyConnections() {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/user/connect/requests",
        {
          headers: { Authorization: token },
        }
      );
      console.log(res.data)
      setPending(res.data.pending || []);
      setAccepted(res.data.accepted || []);
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

    const getConnectionStatus = (userId) => {
  const conn = [...pending, ...accepted].find(
    (c) => c.userId._id === userId
  );

  if (!conn) return "none";

  if (conn.status === "accepted") return "connected";

  if (conn.type === "sent") return "pending_sent";

  if (conn.type === "received") return "pending_received";
  };

  return (
    <div className="flex justify-center">
      <div>
        {pending.length > 0 && (
          <h3 className="text-2xl mt-10">Requestes</h3>
        )}
        {pending.map((data, i) => (
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
              {data?.type === "received" && <div className="mt-4">
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
              </div>}
              <div className="mt-4">
                <ToolTip
                  className="tooltip"
                  data-tip={data?.type === "received" ? "Reject request":"Revoke request"}
                  dataTip={data?.type === "received" ? "Reject request":"Revoke request"}
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
        {accepted.length > 0 ? (
          <>
            <h3 className="text-2xl mt-10">Connected</h3>
            {accepted.map((data, i) => (
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
                <div className="flex gap-4">
                  <div className="mt-4">
                    <ToolTip
                      className="tooltip"
                      data-tip="Chat"
                      dataTip={"Chat"}
                    >
                      <CiChat1
                        className="text-2xl cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/chat");
                        }}
                      />
                    </ToolTip>
                  </div>
                  <div className="mt-4">
                    <ToolTip
                      className="tooltip"
                      data-tip="Start a video call"
                      dataTip={"request a call"}
                    >
                      <IoVideocamOutline
                        className="text-2xl cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/schedule/${data.userId?._id}`);
                        }}
                      />
                    </ToolTip>
                  </div>
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
