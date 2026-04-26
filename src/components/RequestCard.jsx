import React, { useState } from "react";
import API from "../api";

export default function RequestCard({ data, refresh, currentUserId }) {
  const [newTime, setNewTime] = useState("");

  const isSender = data.senderId?._id === currentUserId;
  const isReceiver = data.receiverId?._id === currentUserId;

  const accept = async () => {
    await API.post("/meetings/accept", { meetingId: data._id });
    refresh();
  };

  const reject = async () => {
    await API.post("/meetings/reject", { meetingId: data._id });
    refresh();
  };

  const reschedule = async () => {
    if (!newTime) return;
    await API.post("/meetings/reschedule", {
      meetingId: data._id,
      newTime,
    });
    refresh();
  };

  const revoke = async () => {
    await API.delete(`/meetings/${data._id}`);
    refresh();
  };

  return (
    <div className="bg-white border border-blue-100 shadow-md rounded-2xl p-5 mb-4 hover:shadow-lg transition">
      
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-blue-700">
          {data.senderId?.name} → {data.receiverId?.name}
        </p>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 capitalize">
          {data.status}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-2">
        {new Date(data.proposedTime).toLocaleString()}
      </p>

      {data.message && (
        <p className="text-gray-700 text-sm mb-3">{data.message}</p>
      )}

      {isReceiver &&
        (data.status === "pending" || data.status === "rescheduled") && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={accept}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm"
            >
              Accept
            </button>
            <button
              onClick={reject}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm"
            >
              Reject
            </button>
          </div>
        )}

      {isReceiver &&
        data.status !== "confirmed" &&
        data.status !== "rejected" && (
          <div className="mt-3 flex gap-2">
            <input
              type="datetime-local"
              onChange={(e) => setNewTime(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={reschedule}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-lg text-sm"
            >
              Reschedule
            </button>
          </div>
        )}

      {isSender && data.status === "pending" && (
        <button
          onClick={revoke}
          className="mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm"
        >
          Revoke
        </button>
      )}
    </div>
  );
}