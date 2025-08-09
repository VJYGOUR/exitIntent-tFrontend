import { useEffect, useState } from "react";

function useExitIntent() {
  const [popup, setPopup] = useState(false);
  const [popupShownOnce, setPopupShownOnce] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const handleMobileBack = (event) => {
      if (!popupShownOnce) {
        setPopup(true);
        setPopupShownOnce(true);
        // Create new history entry without triggering navigation
        window.history.pushState({ trigger: "exit-trap" }, "");
      }
    };

    const handleDesktopMouseLeave = (event) => {
      if (event.clientY <= 0 && !popupShownOnce) {
        setPopup(true);
        setPopupShownOnce(true);
      }
    };

    if (isMobile) {
      // Initial history entry
      window.history.replaceState({ trigger: "initial" }, "");
      window.addEventListener("popstate", handleMobileBack);
    } else {
      document.addEventListener("mouseleave", handleDesktopMouseLeave);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("popstate", handleMobileBack);
      } else {
        document.removeEventListener("mouseleave", handleDesktopMouseLeave);
      }
    };
  }, [popupShownOnce]);

  return [popup, () => setPopup(false)];
}
export default useExitIntent;
