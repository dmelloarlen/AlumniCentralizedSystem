import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BATCHES = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

const InputField = ({ label, id, type = "text", placeholder, value, onChange, error, icon, rightEl, focused, onFocus, onBlur }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700 tracking-wide">
      {label}
    </label>
    <div
      className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 bg-white transition-all duration-200
        ${focused === id ? "border-[#1a4fba] shadow-[0_0_0_3px_rgba(26,79,186,0.12)]" : "border-gray-200"}
        ${error ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.10)]" : ""}
      `}
    >
      {icon && <span className="text-gray-400 text-base">{icon}</span>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onFocus(id)}
        onBlur={() => onBlur("")}
        className="flex-1 bg-transparent outline-none text-gray-800 text-[15px] placeholder:text-gray-400"
      />
      {rightEl}
    </div>
    {error && (
      <p className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
        <span>⚠</span>{error}
      </p>
    )}
  </div>
);

export default function Signup() {
  const [role, setRole] = useState("alumni");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    graduationYear: "",
    about:""
  });

  const navigate = useNavigate();

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const e = {};
    if (form.fullName.trim().length === 0) e.fullName = "Full name is required";
    if (form.email.trim().length === 0) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email format";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.about.trim().length === 0) e.about = "About is required";
    if (role === "alumni") {
      if (form.department.trim().length === 0) e.department = "Department is required for alumni";
      if (form.graduationYear.trim().length === 0) e.graduationYear = "Graduation year is required for alumni";
    } else if (role === "student") {
      if (form.department.trim().length === 0) e.department = "Department is required for students";
      if (form.graduationYear.trim().length === 0) e.graduationYear = "Graduation year is required for students";
      else if (!/^\d{4}$/.test(form.graduationYear)) e.graduationYear = "Graduation year must be a 4-digit number";
    }
    return e;
  };

const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    } 

    const payload = {
      name: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        role,
        department: form.department.trim(),
        graduationYear: form.graduationYear,
        about: form.about
    }
    console.log(payload)

    try {
      await axios.post(`${BASE_URL}/auth/signup`, payload);
      alert("Signup Successful");
      navigate('/')
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.error || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2fb] via-[#f0f6ff] to-[#e8f4f8] flex items-center justify-center p-4 font-sans">
      <div className="w-full">

        <div className="bg-gradient-to-r from-[#1a4fba] to-[#2563eb] rounded-3xl p-6 mb-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#f97316]/20 rounded-full translate-y-10 -translate-x-6" />
          <div className="relative z-10 flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
              </svg>
            </div>
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase">Alumni Platform</span>
          </div>
          <h1 className="text-white text-2xl font-extrabold leading-tight relative z-10">
            Create Your Account
          </h1>
          <p className="text-blue-100 text-sm mt-1 relative z-10">Connect with your alumni network</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex gap-4 mb-6">
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${role === "alumni" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setRole("alumni")}
            >
              Alumni
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${role === "student" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
          </div>
          <InputField
            label="Full Name"
            id="fullName"
            placeholder="John Doe"
            value={form.fullName}
            onChange={(v) => update("fullName", v)}
            error={errors.fullName}
            focused={focused}
            onFocus={setFocused}
            onBlur={setFocused}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            focused={focused}
            onFocus={setFocused}
            onBlur={setFocused}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(v) => update("password", v)}
            error={errors.password}
            focused={focused}
            onFocus={setFocused}
            onBlur={setFocused}
          />
          <InputField
            label="Department"
            id="department"
            placeholder="Computer Science"
            value={form.department}
            onChange={(v) => update("department", v)}
            error={errors.department}
            focused={focused}
            onFocus={setFocused}
            onBlur={setFocused}
          />
          <InputField
            label="Graduation Year"
            id="graduationYear"
            placeholder="2024"
            value={form.graduationYear}
            onChange={(v) => update("graduationYear", v)}
            error={errors.graduationYear}
            focused={focused}
            onFocus={setFocused}
            onBlur={setFocused}
          />
          <InputField
            label="About"
            id="about"
            placeholder=""
            value={form.about}
            onChange={(v) => update("about", v)}
            error={errors.about}
            focused={focused}
            onFocus={setFocused}
            onBlur={setFocused}
          />
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-blue-700 transition-colors"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};