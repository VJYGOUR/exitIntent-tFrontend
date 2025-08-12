import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function AdminData() {
  const [emailData, setEmailData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEmail, resFeedback] = await Promise.all([
          axiosInstance.get("/api/subscription/getmails"),
          axiosInstance.get("/api/feedback/get"),
        ]);
        setEmailData(resEmail.data);
        setFeedbackData(resFeedback.data);
      } catch (err) {
        console.error("Error fetching emails:", err);
        setError("Failed to fetch emails.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/feedback/delete/${id}`);
      const updatedFeedback = feedbackData.filter((item) => item._id !== id);
      setFeedbackData(updatedFeedback);
      console.log(`Feedback with id ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback. Please try again.");
    }
  };
  const handleDeleteEmail = async (id) => {
    try {
      await axiosInstance.delete(`/api/subscription/delete/${id}`);
      const updatedEmailData = emailData.filter((item) => item._id !== id);
      setEmailData(updatedEmailData);
      console.log(`email with id ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting email:", error);
      alert("Failed to delete email. Please try again.");
    }
  };
  if (loading)
    return <p className="text-center text-gray-500 mt-8">Loading emails...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 mt-8 font-semibold">{error}</p>
    );
  if (emailData.length === 0)
    return <p className="text-center text-gray-700 mt-8">No emails found.</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Subscribed Emails
      </h2>
      <ul className="space-y-2">
        {emailData.map(({ email, _id, createdAt }) => (
          <>
            <li
              key={_id || email}
              className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              <span className="text-gray-900 font-medium">{email}</span>
              {createdAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Subscribed on {new Date(createdAt).toLocaleString()}
                </p>
              )}
            </li>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              onClick={() => handleDeleteEmail(_id)}
            >
              Delete
            </button>
          </>
        ))}
      </ul>
      <div className="mt-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Feedback</h2>

        {feedbackData.length === 0 ? (
          <p className="text-gray-600">No feedback found.</p>
        ) : (
          <ul className="space-y-4">
            {feedbackData.map((feedback) => (
              <>
                <li
                  key={feedback._id}
                  className="p-4 bg-gray-100 rounded-md shadow-sm"
                >
                  <p className="text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </p>

                  {/* Show each reason inside this feedback */}
                  <ul className="mt-2 list-disc list-inside text-gray-800">
                    {feedback.reason.map((r, index) => (
                      <li key={index}>{r}</li>
                    ))}
                  </ul>
                </li>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </button>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminData;
