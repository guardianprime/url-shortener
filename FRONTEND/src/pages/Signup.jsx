import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../config/api.js";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        credentials: "include", // keep for cookie-based auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
