import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useUserStore } from "./store/userStore";
import AdminData from "./components/AdminData";
import { useEffect } from "react";
import axiosInstance from "./api/axios";

function App() {
  const { securityKeyUpdater, isAuthenticated } = useUserStore();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/api/subscription/getmails");
        securityKeyUpdater(res.data);
      } catch (error) {
        console.error("Failed to fetch mails:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/admin"
        element={isAuthenticated ? <AdminData /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
