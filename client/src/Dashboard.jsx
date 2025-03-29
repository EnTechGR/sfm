import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // User icon from react-icons
import vehicleImage from "./assets/vehicle_fleet.jpg"; // Ensure you have an image in /src/assets

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user email from localStorage
    setUserEmail(localStorage.getItem("userEmail") || "Guest");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Header with user icon */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-gray-700" />
          <span className="text-lg font-medium">{userEmail}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex justify-center items-center flex-grow">
        <button
          onClick={() => navigate("/vehicles")}
          className="relative w-80 h-40 rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105"
        >
          <img
            src={vehicleImage}
            alt="Vehicles"
            className="w-full h-full object-cover opacity-80"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-50">
            Vehicles
          </span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
