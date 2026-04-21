import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password.trim()) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const payload = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      const res = await axios.post("http://localhost:5000/auth/login", payload)
      console.log(res)
      if(res){
        localStorage.setItem("token",res.data.token)
        alert("login in sucessfull")
        navigate('/')
      }

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2fb] via-[#f0f6ff] to-[#e8f4f8] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">

        {/* Header */}
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
            Log In to Your Account
          </h1>
          <p className="text-blue-100 text-sm mt-1 relative z-10">Welcome back!</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          <div className="flex flex-col gap-5">

            {/* Email */}
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
              focused={focused}
              onFocus={setFocused}
              onBlur={setFocused}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            {/* Password */}
            <InputField
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
              focused={focused}
              onFocus={setFocused}
              onBlur={setFocused}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              rightEl={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-gray-400 hover:text-[#1a4fba] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              }
            />

            {/* Forgot password */}
            <div className="-mt-2 text-right">
              <span className="text-xs text-[#1a4fba] font-semibold hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 accent-[#1a4fba] flex-shrink-0 cursor-pointer"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                By logging in, you agree to our{" "}
                <span className="text-[#1a4fba] font-semibold hover:underline cursor-pointer">Terms of Service</span>{" "}
                and{" "}
                <span className="text-[#1a4fba] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
              </span>
            </label>

            {/* Log In Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#1a4fba] hover:bg-[#163fa0] active:scale-[0.98] text-white font-bold py-4 rounded-xl text-base tracking-wide transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300"
            >
              Log In
            </button>

            {/* Sign Up link */}
            <p className="text-center text-sm text-gray-500">
              New here?{" "}
              <Link to="/signup" className="text-[#1a4fba] font-bold hover:underline cursor-pointer">
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}