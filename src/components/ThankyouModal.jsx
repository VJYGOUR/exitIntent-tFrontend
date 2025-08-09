import { useState } from "react";

function ThankyouModal() {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) return;
  return (
    <div className="fixed z-[2000] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6 sm:w-auto">
      <div className="relative">
        <button
          className="absolute top-1 cursor-pointer text-3xl right-3"
          onClick={() => setIsOpen(true)}
        >
          &times;
        </button>
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank you!</h2>
          <p className="text-gray-700">
            Your feedback has been submitted successfully.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThankyouModal;
