import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/vehicles`, {
          withCredentials: true,
        });
        setVehicles(response.data.list || []);
      } catch (err) {
        setError("Failed to fetch vehicles");
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Vehicles</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Link // Use Link for navigation
            key={vehicle.id}
            to={`/upload/${vehicle.id}`} // Define the route with vehicle ID
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
          >
            <img src="/car.png" alt="Vehicle" className="w-20 h-20 mb-2" />
            <span className="text-lg font-semibold">{vehicle.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;