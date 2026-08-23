import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { User, Lock, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    if (username === "admin" && password === "admin123") {
      dispatch(login(username));
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  const fillCredentials = () => {
    setUsername("admin");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] px-4">
      {/* Decorative blurred circles in background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-75"></div>

      <div className="relative w-full max-w-md glass-panel p-8 md:p-10 rounded-2xl shadow-2xl border border-white/40">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Access your secure login dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 ml-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full bg-white/60 hover:bg-white/80 focus:bg-white border border-slate-200 focus:border-blue-500 pl-11 pr-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-800 text-sm font-medium"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full bg-white/60 hover:bg-white/80 focus:bg-white border border-slate-200 focus:border-blue-500 pl-11 pr-11 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-800 text-sm font-medium"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-fadeIn">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform active:scale-[0.98] transition-all duration-150 outline-none focus:ring-2 focus:ring-blue-200"
          >
            Sign In
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 flex flex-col items-center">
          <p className="text-xs text-slate-400 font-medium mb-2.5">
            Trouble signing in? Use the demo account:
          </p>
          <button
            type="button"
            onClick={fillCredentials}
            className="group inline-flex items-center gap-2 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-600 text-xs font-semibold py-2 px-4 rounded-full transition-all duration-200"
          >
            <span>Auto-fill Demo Details</span>
            <span className="text-slate-300 group-hover:text-blue-300">|</span>
            <span className="text-slate-500 font-mono group-hover:text-blue-500">
              admin / admin123
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;