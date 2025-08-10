import useExitIntent from "../modules/useExitintentLogic";
import LandingPage from "../components/LandingPage";
import FeedbackForm from "../components/FeedbackForm";
import Popup from "../components/Popup";
import AdminButton from "../components/AdminButton";

function HomePage() {
  return (
    <>
      <div className="relative h-screen">
        <LandingPage />
        <Popup />
        <FeedbackForm />
        <AdminButton />
      </div>
    </>
  );
}

export default HomePage;
