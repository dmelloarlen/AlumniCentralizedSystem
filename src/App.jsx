import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alumnis from "./components/Alumnis";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import InternshipsJobs from "./components/InternshipsJobs";
import Profile from "./components/Profile";
import MyConnections from "./components/MyConnections";
import Follow from "./components/Follow";
import Protected from "./components/Protected";
import Dashboard from "./components/admin/Dashboard";
import AlumniRequests from "./components/admin/AlumniRequests";
import EditProfile from "./components/EditProfile";
import Chat from "./components/Chat";
import Posts from "./components/Posts";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import VideoChat from "./components/VideoChat";
import VDashboard from "./components/VDashboard";
import VideoRoom from "./components/VideoRoom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [count, setCount] = useState(0);
  const [alumni, setAlumni] = useState()

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${BASE_URL}/user/Profile`, {
          headers: {
            Authorization: token,
          },
        });

        setAlumni(res.data);
      } catch (error) {
        console.log("Error fetching alumni:", error);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alumnis" element={<Alumnis />} />
          <Route path="/internships-jobs" element={<InternshipsJobs />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/connections" element={<MyConnections />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/follow/:id" element={<Follow />} />
          <Route path="/follow/:id/:type" element={<Follow />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/requests" element={<AlumniRequests />} />
          <Route path="/video-chat" element={<VideoChat/>}/>
          <Route path="/schedule/:id" element={<VDashboard/>}/>
          <Route path="/meet/:roomId" element={<VideoRoom/>}/>
          
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <Protected userType={alumni?.role}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/admin/alumnirequests"
            element={
              <Protected userType={alumni?.role}>
                <AlumniRequests />
              </Protected>
            }
          />
        </Routes>
        <Toaster position="top-center"/>
      </BrowserRouter>
    </>
  );
}

export default App;
