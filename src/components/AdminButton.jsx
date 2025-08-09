import { useUserStore } from "../store/userStore";
import FormPopup from "./FormPopup";

function AdminButton() {
  const { adminbtn, adminbtnUpdater } = useUserStore();

  return (
    <>
      <button
        onClick={adminbtnUpdater}
        disabled={adminbtn}
        className="px-5 py-2 bg-gray-900 text-white rounded-lg text-base font-semibold hover:bg-red-500 transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        Admin
      </button>
      <FormPopup />
    </>
  );
}

export default AdminButton;
