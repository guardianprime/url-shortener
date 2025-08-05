// pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.redirected) {
        navigate("/"); // Redirected successfully (optional)
      } else if (res.ok) {
        navigate("/"); // Also works if status 200
      } else {
        setError("Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="username">Username:</label>
        <input
          className="border p-2 block w-full"
          type="text"
          placeholder="Username"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="border p-2 block w-full"
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Log In
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 underline">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
