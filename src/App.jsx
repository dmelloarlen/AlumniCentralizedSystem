import { useState } from "react";
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

function App() {
  const [count, setCount] = useState(0);

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/connections" element={<MyConnections />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/requests" element={<AlumniRequests />} />
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <Protected userType={"admin"}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/admin/alumnirequests"
            element={
              <Protected userType={"admin"}>
                <AlumniRequests />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
