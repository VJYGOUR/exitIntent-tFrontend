import { useState } from "react";
import { useForm } from "react-hook-form";
import ThankyouModal from "./ThankyouModal";
import axiosInstance from "../api/axios";

import { useUserStore } from "../store/userStore";
import Spinner from "./Spinner";

function FeedbackForm() {
  const { isOpen, setIsOpen, loading, setIsLoading } = useUserStore();
  // Start open
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading();
    try {
      await axiosInstance.post("/api/feedback", {
        checkbox: data.reason, // this will be an array
      });

      setIsSubmitted(true);
      reset();
      setIsLoading();
    } catch (error) {
      console.error("Submission error:", error.message);
    }
  };

  // If closed, hide the form
  if (!isOpen) return null;
  if (isSubmitted) {
    return <ThankyouModal />;
  }

  return (
    <div className="fixed z-[2000] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6 sm:w-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white relative shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6"
      >
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-1 right-3 text-3xl cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-[#ff4500]">
          Hold on! PLEASE 🥺
        </h2>
        <p className="text-gray-500 text-lg">
          Please tell us why you're leaving
        </p>

        {/* Checkbox group */}
        <div className="space-y-4">
          <Checkbox
            id="not-need"
            label="I don't need this"
            register={register}
            value="I don't need this"
          />
          <Checkbox
            id="not-like"
            label="I don't like this product"
            register={register}
            value="I don't like this product"
          />
          <Checkbox
            id="expensive"
            label="Product is expensive"
            register={register}
            value="Product is expensive"
          />
          <Checkbox
            id="better-option"
            label="I found a better option"
            register={register}
            value="I found a better option"
          />
        </div>

        {/* Error message if none selected */}
        {errors.reason && (
          <p className="text-red-500 text-sm">
            Please select at least one reason.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ff4500] hover:bg-[#cc3700] text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer relative px-4  focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center"
        >
          {loading ? <Spinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

// ✅ Reusable Checkbox component
function Checkbox({ id, label, register, value }) {
  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        id={id}
        value={value}
        {...register("reason", { required: true })}
        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="text-gray-700 text-[1rem]">
        {label}
      </label>
    </div>
  );
}

export default FeedbackForm;
