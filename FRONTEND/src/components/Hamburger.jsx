import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hamburger({ home, urlpage }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const res = await fetch("/auth/check", {
          credentials: "include", // Important for cookies/sessions
        });

        const data = await res.json();
        console.log(data);

        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setError("Failed to check authentication");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        // Optionally redirect or show success message
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-5 px-2">
      <div className="bg-amber-400 text-white p-1">SMALLURL</div>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
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
                <Link to="/about">About</Link>
              </li>
              {home && (
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link to="/">Home</Link>
                </li>
              )}

              {/* Show "My URLs" only if authenticated */}
              {isAuthenticated && (
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link to="/shorten/urls">My URLs</Link>
                </li>
              )}

              <li className="border-b border-gray-400 my-8 uppercase">
                {loading ? (
                  <span>Loading...</span>
                ) : error ? (
                  <span className="text-red-500">Error</span>
                ) : isAuthenticated ? (
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm text-gray-600">
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
                  <Link to="/login">Sign In</Link>
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
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span className="text-red-500">Error</span>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
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
        background: white;
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
