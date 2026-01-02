import { useState, useEffect } from "react";
import Hamburger from "../components/Hamburger";
import API_BASE_URL from "../config/api.js";
import { useAuth } from "../contexts/AuthContext.jsx";

function MyUrls() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState({});
  const [copied, setCopied] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/shorten/urls`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const backendReply = await res.json();
        console.log("Fetched URLs:", backendReply);
        if (!res.ok) {
          setError(backendReply?.error || "Unknown error from server");
          return;
        }

        setData(backendReply.data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [token]);

  const handleCopy = async (urlId, shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied((prev) => ({ ...prev, [urlId]: true }));

      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [urlId]: false }));
      }, 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.body.removeChild(textArea);
      setError(err);

      setCopied((prev) => ({ ...prev, [urlId]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [urlId]: false }));
      }, 2000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;

    setDeleting((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/shorten/url/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const reply = await res.json();
        alert(reply?.error || "Failed to delete.");
        return;
      }
      setData((prev) => ({
        ...prev,
        urls: prev.urls.filter((url) => url._id !== id),
      }));
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setDeleting((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data || !data.urls || data.urls.length === 0) {
    return (
      <>
        <Hamburger home={true} urlpage={false} />
        <p className="text-center text-white mt-8 text-lg">No URLs found.</p>
        <p className="text-center text-white mt-8 text-lg">
          Create or shorten urls to see your saved the urls
        </p>
      </>
    );
  }

  return (
    <>
      <Hamburger home={true} urlpage={false} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Your Shortened URLs
        </h1>
        <ul className="space-y-4">
          {data.urls.map((url) => {
            const shortUrl = `${data.protocol}://${data.host}/${url.shortCode}`;

            return (
              <li
                key={url._id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="mb-1 text-sm text-white">Original URL:</p>
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 break-words hover:underline"
                >
                  {url.originalUrl}
                </a>

                <p className="mt-2 mb-1 text-sm text-white">Shortened URL:</p>
                <div className="flex items-center gap-2 mb-2">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex-1"
                  >
                    {shortUrl}
                  </a>
                  <button
                    onClick={() => handleCopy(url._id, shortUrl)}
                    className={`px-3 py-1 text-sm rounded transition ${
                      copied[url._id]
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {copied[url._id] ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-white">
                    📊 Clicks:{" "}
                    <span className="font-semibold">{url.clicks}</span>
                  </p>

                  <button
                    onClick={() => handleDelete(url._id)}
                    disabled={deleting[url._id]}
                    className="text-red-600 text-sm border border-red-600 px-3 py-1 rounded hover:bg-red-100 transition disabled:opacity-50"
                  >
                    {deleting[url._id] ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MyUrls;
