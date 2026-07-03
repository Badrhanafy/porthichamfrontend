import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email: form.email,
        password: form.password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      console.log("Login success:", res.data);

      window.location.href = "/admin";
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0b0908] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="relative bg-[#111111] border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden">

          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />

          {/* Header */}
          <div className="relative z-10 text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/30 mb-3">
              Secure Access
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Admin Login
            </h1>

            <p className="text-white/40 text-sm mt-3 max-w-xs mx-auto">
              Sign in to manage your projects and categories
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">

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
                className="w-full bg-[#0b0908] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black transition-all duration-300"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/40 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="accent-white"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-white/30 hover:text-white transition"
              >
                Forgot?
              </button>
              
              <Link to="/signup">Sign Up</Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold border border-white transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}