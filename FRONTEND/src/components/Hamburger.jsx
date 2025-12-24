import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Hamburger({ home, urlpage }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { token, setToken } = useAuth();

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/check`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setIsAuthenticated(false);
          setUser(null);
        }

        const dataResponse = await res.json();

        if (dataResponse.success) {
          setIsAuthenticated(true);
          setUser(dataResponse.data.user.username);
          setToken(dataResponse.data.token);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUserStatus();
  }, [token, setToken]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        setToken("");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-5 px-2 bg-[#031f39]">
      <div className="bg-[#FF5F1F] text-white p-1">SMALLURL</div>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-white"></span>
            <span className="block h-0.5 w-8 bg-white"></span>
            <span className="block h-0.5 w-8 bg-white"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/about" className="text-white">
                  About
                </Link>
              </li>
              {home && (
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link to="/" className="text-white">
                    Home
                  </Link>
                </li>
              )}

              {/* Show "My URLs" only if authenticated */}
              {isAuthenticated && urlpage ? (
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link to="/shorten/urls" className="text-white">
                    My URLs
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="border-b border-gray-400 my-8 uppercase">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm text-white">
                      Welcome, {user?.email || user?.username || "User"}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="hover:text-amber-600"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-white">
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <Link to="/about">About</Link>
          </li>

          {/* Show "My URLs" only if authenticated */}
          {isAuthenticated && (
            <li>
              <Link to="/shorten/urls">My URLs</Link>
            </li>
          )}

          <li>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white">
                  {user?.email || user?.username || "User"}
                </span>
                <button onClick={handleLogout} className="hover:text-amber-600">
                  Log Out
                </button>
              </div>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background:  #031f39;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
