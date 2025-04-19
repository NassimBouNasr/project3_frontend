import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function SignUp() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
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
          Create a new account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#16425b] mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81c3d7] text-[#16425b]"
              placeholder="John Doe"
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#16425b]">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-[#3a7ca5] hover:text-[#2f6690]"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
