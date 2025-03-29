import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Dashboard</h1>
      <button
        onClick={() => navigate("/vehicles")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Go to Vehicles
      </button>
    </div>
  );
};

export default Dashboard;
