import { useState, useEffect } from "react";
import Hamburger from "../components/Hamburger";

function MyUrls() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState({}); // track deletion state

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await fetch("/shorten/urls", {
        credentials: "include",
      });

      const backendReply = await res.json();
      if (!res.ok) {
        setError(backendReply?.error || "Unknown error from server");
        return;
      }

      setData(backendReply);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;

    setDeleting((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(`/shorten/urls/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const reply = await res.json();
        alert(reply?.error || "Failed to delete.");
        return;
      }

      // Remove the deleted URL from state
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
  if (!data || !data.urls || data.urls.length === 0)
    return <p className="text-center text-gray-500">No URLs found.</p>;

  return (
    <>
      <Hamburger home={true} urlpage={false} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Your Shortened URLs
        </h1>
        <ul className="space-y-4">
          {data.urls.map((url) => (
            <li
              key={url._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="mb-1 text-sm text-gray-500">Original URL:</p>
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 break-words hover:underline"
              >
                {url.originalUrl}
              </a>

              <p className="mt-2 mb-1 text-sm text-gray-500">Shortened URL:</p>
              <a
                href={`${data.protocol}://${data.host}/${url.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                {data.protocol}://{data.host}/{url.shortCode}
              </a>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  📊 Clicks: <span className="font-semibold">{url.clicks}</span>
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
          ))}
        </ul>
      </div>
    </>
  );
}

export default MyUrls;
