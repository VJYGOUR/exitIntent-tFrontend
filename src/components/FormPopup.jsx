import { useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FormPopup() {
  const { adminbtn, securityKey, authenticate } = useUserStore();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    if (data.password === securityKey) {
      authenticate(); // mark logged in
      navigate("/admin");
      reset();
    } else {
      setError("Incorrect password");
    }
  };

  if (!adminbtn) return null;

  return (
    <form
      className="form-container text-black bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="name"
        placeholder="Password"
        required
        autoComplete="off"
        {...register("password")}
      />
      <button type="submit">Enter Password</button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}

export default FormPopup;
