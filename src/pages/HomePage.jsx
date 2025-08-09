import useExitIntent from "../modules/useExitintentLogic";
import LandingPage from "../components/LandingPage";
import FeedbackForm from "../components/FeedbackForm";
import Popup from "../components/Popup";
import AdminButton from "../components/AdminButton";

function HomePage() {
  const [popup] = useExitIntent();
  return (
    <>
      <div className="relative h-screen">
        <LandingPage />
        <Popup />
        {popup && <FeedbackForm />}
        <AdminButton />
      </div>
    </>
  );
}

export default HomePage;
