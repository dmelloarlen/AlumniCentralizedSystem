import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    about: "",
    firstName: "",
    lastName: "",
    department: "",
    graduationYear: "",
  });

  const [experience, setExp] = useState([
    {
      company: "",
      designation: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [edu, setEdu] = useState([
    {
      institution: "",
      course: "",
      branch: "",
      status: "",
      yearofPassing: "",
    },
  ]);

  const [currentDetails, setCurrentDetails] = useState({
    company: "",
    role: "",
    designation: "",
    location: "",
    joinedOn: "",
  });

  const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(
        "http://localhost:5000/user/profile",
        {
          headers: {
            Authorization: token
          }
        }
      )

      const user = res.data

      setProfile({
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        about: user.about || "",
        department: user.department || "",
        graduationYear: user.graduationYear || "",
      })

      setExp(
        user.experience?.length
          ? user.experience
          : [{
              company: "",
              designation: "",
              description: "",
              startDate: "",
              endDate: "",
            }]
      )

      setEdu(
        user.education?.length
          ? user.education
          : [{
              institution: "",
              course: "",
              branch: "",
              status: "",
              yearofPassing: "",
            }]
      )

      setCurrentDetails({
        company: user.currentdetails?.company || "",
        designation: user.currentdetails?.designation || "",
        role: user.currentdetails?.role || "",
        location: user.currentdetails?.location || "",
        joinedOn: user.currentdetails?.joinedOn
          ? user.currentdetails.joinedOn.slice(0, 10)
          : "",
      })

      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  fetchProfile()
}, [])

const handleSave = async () => {
  try {
    const token = localStorage.getItem("token")

    const payload = {
      name: profile.firstName + " " + profile.lastName,
      about: profile.about,
      department: profile.department,
      graduationYear: profile.graduationYear,
      experience: experience,
      education: edu,
      currentdetails: currentDetails,
    }

    const res = await axios.patch(
      "http://localhost:5000/user/profile",
      payload,
      {
        headers: {
          Authorization: token
        }
      }
    )
    navigate('/profile')
    toast.success("Profile Updated")
  } catch (error) {
    console.log(error)
    toast.error("Failed to update profile")
  }
}

  if (false) return <h1 className="p-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-8">Manage Profile</h1>

        {/* PROFILE */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-3 rounded-lg"
              placeholder="First Name"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Last Name"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Department"
              value={profile.department}
              onChange={(e) =>
                setProfile({ ...profile, department: e.target.value })
              }
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Graduation Year"
              value={profile.graduationYear}
              onChange={(e) =>
                setProfile({ ...profile, graduationYear: e.target.value })
              }
            />

            <textarea
              className="border p-3 rounded-lg md:col-span-2"
              placeholder="About"
              rows="4"
              value={profile.about}
              onChange={(e) =>
                setProfile({ ...profile, about: e.target.value })
              }
            />
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>

          {experience.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-4 border p-4 rounded-xl mb-4"
            >
              <input
                className="border p-3 rounded-lg"
                placeholder="Company"
                value={item.company || ""}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[index].company = e.target.value;
                  setExp(updated);
                }}
              />

              <input
                className="border p-3 rounded-lg"
                placeholder="Designation"
                value={item.designation || ""}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[index].designation = e.target.value;
                  setExp(updated);
                }}
              />

              <input
                type="date"
                className="border p-3 rounded-lg"
                value={item.startDate?.slice(0, 10) || ""}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[index].startDate = e.target.value;
                  setExp(updated);
                }}
              />

              <input
                type="date"
                className="border p-3 rounded-lg"
                value={item.endDate?.slice(0, 10) || ""}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[index].endDate = e.target.value;
                  setExp(updated);
                }}
              />

              <textarea
                className="border p-3 rounded-lg md:col-span-2"
                rows="3"
                placeholder="Description"
                value={item.description || ""}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[index].description = e.target.value;
                  setExp(updated);
                }}
              />

              <button
                onClick={() =>
                  setExp(experience.filter((_, i) => i !== index))
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              setExp([
                ...experience,
                {
                  company: "",
                  designation: "",
                  description: "",
                  startDate: "",
                  endDate: "",
                },
              ])
            }
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            + Add Experience
          </button>
        </div>

        {/* EDUCATION */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Education</h2>

          {edu.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-4 border p-4 rounded-xl mb-4"
            >
              <input
                className="border p-3 rounded-lg"
                placeholder="Institution"
                value={item.institution || ""}
                onChange={(e) => {
                  const updated = [...edu];
                  updated[index].institution = e.target.value;
                  setEdu(updated);
                }}
              />

              <input
                className="border p-3 rounded-lg"
                placeholder="Course"
                value={item.course || ""}
                onChange={(e) => {
                  const updated = [...edu];
                  updated[index].course = e.target.value;
                  setEdu(updated);
                }}
              />

              <input
                className="border p-3 rounded-lg"
                placeholder="Branch"
                value={item.branch  || ""}
                onChange={(e) => {
                  const updated = [...edu];
                  updated[index].branch = e.target.value;
                  setEdu(updated);
                }}
              />

              <select
                className="border p-3 rounded-lg"
                value={item.status || ""}
                onChange={(e) => {
                  const updated = [...edu];
                  updated[index].status = e.target.value;
                  setEdu(updated);
                }}
              >
                <option value="">Select Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>

              <input
                className="border p-3 rounded-lg"
                placeholder="Year Of Passing"
                value={item.yearofPassing || ""}
                onChange={(e) => {
                  const updated = [...edu];
                  updated[index].yearofPassing = e.target.value;
                  setEdu(updated);
                }}
              />

              <button
                onClick={() => setEdu(edu.filter((_, i) => i !== index))}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              setEdu([
                ...edu,
                {
                  institution: "",
                  course: "",
                  branch: "",
                  status: "",
                  yearofPassing: "",
                },
              ])
            }
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            + Add Education
          </button>
        </div>

        {/* CURRENT DETAILS */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Current Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-3 rounded-lg"
              placeholder="Company"
              value={currentDetails.company || ""}
              onChange={(e) =>
                setCurrentDetails({
                  ...currentDetails,
                  company: e.target.value,
                })
              }
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Role"
              value={currentDetails.role || ""}
              onChange={(e) =>
                setCurrentDetails({
                  ...currentDetails,
                  role: e.target.value,
                })
              }
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Designation"
              value={currentDetails.designation || ""}
              onChange={(e) =>
                setCurrentDetails({
                  ...currentDetails,
                  designation: e.target.value,
                })
              }
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Location"
              value={currentDetails.location || ""}
              onChange={(e) =>
                setCurrentDetails({
                  ...currentDetails,
                  location: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="border p-3 rounded-lg"
              value={currentDetails.joinedOn || ""}
              onChange={(e) =>
                setCurrentDetails({
                  ...currentDetails,
                  joinedOn: e.target.value,
                })
              }
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfile;