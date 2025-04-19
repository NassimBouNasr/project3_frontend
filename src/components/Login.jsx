import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Login({ setLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setLoggedIn(true);
        setUser(userData);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#d9dcd6] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 w-20 h-20 cursor-pointer"
          />
        </Link>
        <h2 className="text-3xl font-bold text-center text-[#2f6690] mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#16425b] mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81c3d7] text-[#16425b]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#16425b] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81c3d7] text-[#16425b]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2f6690] hover:bg-[#3a7ca5] text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#16425b]">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#3a7ca5] hover:text-[#2f6690]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
