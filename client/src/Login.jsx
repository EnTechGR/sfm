import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
const API_URL = import.meta.env.VITE_API_BASE_URL; // Read from environment variable

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true } // Enable cookies
      );

      if (response.data.success) {
        navigate("/dashboard"); // Redirect on successful login
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background gradient inspired by FleetSimple colors */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
        {/* White card container */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          {/* Optional: Add your FleetSimple logo here */}
          <div className="flex justify-center mb-4">
            {/* <img src="/path/to/fleetsimple-logo.png" alt="FleetSimple Logo" className="w-40" /> */}
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center mb-4 text-[#1B5EA8]">
            Login
          </h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-[#1B5EA8]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-[#1B5EA8]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F05323] text-white p-2 rounded-md hover:bg-[#e04a20] transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;