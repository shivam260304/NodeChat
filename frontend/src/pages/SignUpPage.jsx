import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signUp} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signUp(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Create an Account
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Full Name</span>
            </label>
            <input
              type="text"
              className="input mt-1 w-full p-3 rounded-lg border-gray-300 outline focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              className="input mt-1 input-bordered w-full p-3 rounded-lg border-gray-300 outline focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Password</span>
            </label>
            <input
              type="password"
              className="input mt-1 input-bordered w-full p-3 rounded-lg border-gray-300 outline focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;