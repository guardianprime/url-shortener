import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../config/api.js";
import Hamburger from "../components/Hamburger.jsx";
import Footer from "../components/Footer.jsx";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        navigate("/");
      } else {
        const data = await res.json();
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleGoogleLogin() {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/myurls");
    }
  }, [navigate]);

  return (
    <div className="h-full">
      <Hamburger home={true} urlpage={false} />
      <div className="p-4 h-2/3">
        <h1 className="text-4xl mb-4 text-black">Sign Up</h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label htmlFor="username">Username</label>
            <input
              className="border p-2 block w-full"
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="border p-2 block w-full"
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="border p-2 block w-full"
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <h3 className="text-center mt-3">Or Sign in using</h3>
        <button
          className="border-1 border-black h-12 mt-2 rounded-md w-1/3 mx-auto flex justify-between p-2 items-center"
          onClick={handleGoogleLogin}
        >
          <img
            src="/icons/google-icon.svg"
            alt="google logo"
            style={{ width: "24px", height: "24px" }}
          />
          <span className="text-xl mb-0.5">Google</span>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
