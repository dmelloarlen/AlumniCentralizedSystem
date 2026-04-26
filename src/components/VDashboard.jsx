import React, { useEffect, useState } from "react";
import API from "../api";
import RequestCard from "./RequestCard";
import { useNavigate, useParams } from "react-router-dom";

export default function VDashboard() {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [form, setForm] = useState({
    receiverId: "",
    proposedTime: "",
    message: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const s = await API.get("/meetings/sent");
    const r = await API.get("/meetings/received");
    const u = await API.get("/meetings/upcoming");

    setSent(s.data);
    setReceived(r.data);
    setUpcoming(u.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createMeeting = async () => {
    await API.post("/meetings/create", {
      receiverId: id,
      proposedTime: form.proposedTime,
      message: form.message,
    });
    fetchData();
  };

  const canJoin = (time) => {
    const meetingTime = new Date(time);
    return new Date(meetingTime.getTime() - 5 * 60000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Meeting Dashboard
      </h1>

      {/* CREATE MEETING */}
      <div className="bg-white border border-blue-100 shadow-md rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Create Meeting
        </h2>

        <label className="text-gray-600 text-sm">Set Time</label>
        <input
          type="datetime-local"
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, proposedTime: e.target.value })
          }
        />

        <label className="text-gray-600 text-sm">
          Description (Optional)
        </label>
        <input
          placeholder="Message"
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button
          onClick={createMeeting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Send Request
        </button>
      </div>

      {/* RECEIVED */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Received Requests
      </h2>
      <div className="space-y-3">
        {received.map((m) => (
          <RequestCard key={m._id} data={m} refresh={fetchData} />
        ))}
      </div>

      {/* SENT */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
        Sent Requests
      </h2>
      <div className="space-y-3">
        {sent.map((m) => (
          <RequestCard key={m._id} data={m} refresh={fetchData} />
        ))}
      </div>

      {/* UPCOMING */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
        Upcoming Meetings
      </h2>

      <div className="space-y-3">
        {upcoming.map((m) => (
          <div
            key={m._id}
            className="bg-white border border-green-100 shadow-md rounded-2xl p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-700 text-sm">
                {new Date(m.confirmedTime).toLocaleString()}
              </p>
            </div>

            {new Date() > canJoin(m.confirmedTime) ? 
              <button
                onClick={() => navigate(`/meet/${m.roomId}`)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Join
              </button>:
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Disabled
              </button>
            }
          </div>
        ))}
      </div>

    </div>
  );
}