import { useEffect, useState } from "react";

function useExitIntent() {
  const [popup, setPopup] = useState(false);
  const [popupShownOnce, setPopupShownOnce] = useState(false);
  useEffect(
    function () {
      const isMobile = window.innerWidth < 768;

      const handleMobilePopState = (event) => {
        if (
          event.state &&
          event.state.page === "exit-popup-trap" &&
          !popupShownOnce
        ) {
          setPopup(true);
          setPopupShownOnce(true);
          window.history.pushState(
            { page: "exit-popup-trap" },
            "",
            window.location.href
          );
        }
      };

      const handleDesktopMouseLeave = (event) => {
        if (event.clientY <= 0 && !popupShownOnce) {
          setPopup(true);
          setPopupShownOnce(true);
        }
      };

      if (isMobile) {
        window.history.pushState(
          { page: "exit-popup-trap" },
          "",
          window.location.href
        );
        window.addEventListener("popstate", handleMobilePopState);
      } else {
        document.documentElement.addEventListener(
          "mouseleave",
          handleDesktopMouseLeave
        );
      }
      return () => {
        if (isMobile) {
          window.removeEventListener("popstate", handleMobilePopState);
        } else {
          document.documentElement.removeEventListener(
            "mouseleave",
            handleDesktopMouseLeave
          );
        }
      };
    },
    [popupShownOnce]
  );

  return [popup, () => setPopup(false)];
}
export default useExitIntent;
