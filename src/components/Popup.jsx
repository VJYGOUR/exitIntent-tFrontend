import React, { useState, useEffect } from "react";
import "../css/popup.css"; // Make sure to create this CSS file
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios";

const Popup = () => {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(58);
  const [showPopup, setShowPopup] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Show popup after 2 seconds (only once)
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []); // 👈 Runs only once on mount

  // Countdown timer (starts only when popup is shown)
  useEffect(() => {
    if (!showPopup) return;

    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        setShowPopup(false);
        clearInterval(timer);
      } else if (seconds === 0) {
        setMinutes((m) => m - 1);
        setSeconds(59);
      } else {
        setSeconds((s) => s - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showPopup, minutes, seconds]);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/api/subscription/addmail", {
        email: data.email,
      });

      setShowPopup(false);
      reset();
    } catch (error) {
      console.error(`Error submiting email:`, error.message);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={() => setShowPopup(false)}>
          &times;
        </button>
        <div className="countdown">
          <div className="timer-box">
            <span>{String(minutes).padStart(2, "0")}</span>
            <p>Minutes</p>
          </div>
          <span className="colon">:</span>
          <div className="timer-box">
            <span>{String(seconds).padStart(2, "0")}</span>
            <p>Seconds</p>
          </div>
        </div>
        <h2>
          WAIT! GET <span className="text-[#ff4500]">40%</span> OFF
        </h2>
        <p className="subtitle">
          Enter your email and get a discount coupon.
          <br />
          The offer will disappear in...
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container text-black bg-white"
        >
          <input
            type="email"
            placeholder="Email:"
            required
            {...register("email")}
          />
          <button type="submit">YES! I WANT A COUPON</button>
        </form>
        <p className="min-order">( No Minimum order amount)</p>
      </div>
    </div>
  );
};

export default Popup;
