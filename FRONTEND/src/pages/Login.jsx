import { useState, useEffect } from "react";
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
    <div className="h-full bg-white">
      <Hamburger home={true} urlpage={false} signin={false} />
      <div className="p-4 h-2/3">
        <h1 className="text-4xl mb-4 text-black">Log in</h1>
        <p className="text-black">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
        <p>continue with</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label htmlFor="username">Email</label>
            <input
              className="border p-2 block w-full text-lg mt-1 rounded-md"
              type="email"
              placeholder="Enter email"
              value={email}
              name="username"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="border w-full flex justify-between mt-0.5 rounded-md">
              <input
                className="w-5/6 p-2 text-lg"
                type={togglePassword ? "text" : "password"}
                placeholder="Enter password"
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
            <label htmlFor="checkbox" className="ml-2">
              Keep me logged in
            </label>
            <Link to="/forgetpassword" className="text-blue-300 ml-2">
              Forgot password?
            </Link>
          </div>
          <button
            className="bg-blue-600  px-4 py-2 rounded-md text-white w-full"
            type="submit"
          >
            Log In
          </button>
          {error && <p className="text-red-500">{error}</p>}
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
};

export default Login;
