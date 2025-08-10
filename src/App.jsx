import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useUserStore } from "./store/userStore";
import AdminData from "./components/AdminData";
import { useEffect } from "react";
import axiosInstance from "./api/axios";

// ✅ Helper to send pageviews to GA
const sendPageview = (path) => {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};

function App() {
  const { securityKeyUpdater, isAuthenticated } = useUserStore();
  const location = useLocation();
  // ✅ Track route changes for Google Analytics
  useEffect(() => {
    sendPageview(location.pathname + location.search);
  }, [location]);
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
