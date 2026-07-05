import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate password match
    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("https://api.elhachimivisionlab.com/api/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });

      // Handle successful signup
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Signup success:", res.data);
        setSuccess("Account created successfully!");
        
        // Redirect to admin or login after short delay
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        // If no token, redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("Signup error:", err);

      if (err.response?.data?.errors) {
        // Handle validation errors
        const errors = err.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(" ");
        setError(errorMessages);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0b0908] flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-md">

        {/* Signup Card */}
        <div className="relative bg-[#111111] border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden">

          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />

          {/* Header */}
          <div className="relative z-10 text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/30 mb-3">
              Get Started
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-white/40 text-sm mt-3 max-w-xs mx-auto">
              Join us to manage your projects and categories
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-5 bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-3 rounded-xl">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full bg-[#0b0908] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full bg-[#0b0908] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full bg-[#0b0908] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black transition-all duration-300"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-[#0b0908] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black transition-all duration-300"
              />
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center gap-2 text-sm">
              <label className="flex items-center gap-2 text-white/40 cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  required
                  className="accent-white"
                />
                I agree to the{" "}
                <button
                  type="button"
                  className="text-white/60 hover:text-white transition"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold border border-white transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white/60 hover:text-white transition"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}