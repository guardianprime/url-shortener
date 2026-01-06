import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api.js";
import Hamburger from "../components/Hamburger.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const backendReply = await res.json();

      if (res.ok) {
        setToken(backendReply.data.token);
        navigate("/");
      } else {
        setError(backendReply.error);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  function handleToggle() {
    setTogglePassword(true);
    setTimeout(() => {
      setTogglePassword(false);
    }, 1000);
  }

  return (
    <div className="h-full bg-white">
      <Hamburger home={true} urlpage={false} />
      <div className="p-4 h-2/3">
        <h1 className="text-4xl mb-4 text-black">Log in</h1>
        <p className="text-black">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label htmlFor="username">Email:</label>
            <input
              className="border p-2 block w-full text-lg mt-1"
              type="email"
              placeholder="Email"
              value={email}
              name="username"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="border w-full flex justify-between pr-2 mt-0.5">
              <input
                className="w-5/6 p-2 text-lg"
                type={togglePassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
              <button type="button" onClick={handleToggle} className="w-1/6">
                {togglePassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>
          <div>
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">Keep me logged in</label>
            <Link to="/forgetpassword" className="text-blue-300">
              Forgot password?
            </Link>
          </div>
          <button
            className="bg-blue-600  px-4 py-2 rounded text-white w-full"
            type="submit"
          >
            Log In
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
