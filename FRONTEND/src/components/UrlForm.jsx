import { useState } from "react";
import API_BASE_URL from "../config/api.js";

function UrlForm({ setHiddenToggle, hiddenToggle }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [data, setData] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get("url");
    if (!url || url.trim() === "") {
      setError("Please enter a valid URL.");
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      setError("URL must start with http:// or https://");
      return;
    }

    const alias = formData.get("alias");

    try {
      setLoading(true);
      setError("");
      setShortenedUrl("");

      const res = await fetch(`${API_BASE_URL}/api/v1/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ url, alias }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const reply = await res.json();
      setData(reply);
      setShortenedUrl(reply.shortUrl || "Shortened URL received");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full p-2.5 bg-white rounded-xs">
      {loading && <p>⏳ URL is being shortened...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}
      {shortenedUrl ? (
        <form onSubmit={(e) => e.preventDefault()} id="shortenForm">
          <input
            className=""
            name="longUrl "
            readOnly
            value={data.originalUrl}
          />
          <input
            className="text-green-600 block border-2 rounded-sm w-full h-10 p-2 mt-2"
            readOnly
            value={shortenedUrl}
            name="shortenedUrl"
          />
          <div className="flex justify-between w-2/3 mx-auto">
            <button
              className="border-2 mt-7 p-2 rounded-sm"
              onClick={() => {
                navigator.clipboard.writeText(shortenedUrl);
                setHiddenToggle(!hiddenToggle);
                setTimeout(() => {
                  setHiddenToggle(false);
                }, 2000);
              }}
            >
              Copy
            </button>
            <button
              className="border-2 mt-7 p-2 rounded-sm"
              onClick={() => {
                setShortenedUrl("");
                setError("");
              }}
            >
              Shorten Another
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} id="shortenForm">
          <label htmlFor="url" className="text-lg">
            Shorten your link
          </label>
          <input
            type="text"
            id="url"
            name="url"
            required
            className="block border-2 rounded-sm w-full h-10 p-2 mt-2"
            placeholder="Enter a long link here"
          />
          <label htmlFor="alias" className="mt-4 text-lg">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span> Customize your link</span>
          </label>
          <input
            type="text"
            id="alias"
            name="alias"
            className="block border-2  rounded-sm w-full h-10 p-2 mt-2"
            placeholder="Enter alias (optional)"
          />
          <button
            type="submit"
            className="border-2 mt-7 p-2 rounded-sm block mx-auto"
          >
            Shorten URL
          </button>
        </form>
      )}
    </div>
  );
}

export default UrlForm;
