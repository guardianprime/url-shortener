import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import API_BASE_URL from "../config/api";

function QrForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [aliasInput, setAliasInput] = useState("");
  const { token } = useAuth();

  async function handleSubmit() {
    const url = urlInput.trim();

    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      setError("URL must start with http:// or https://");
      return;
    }

    const alias = aliasInput.trim();

    try {
      setLoading(true);
      setError("");
      setShortenedUrl("");

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/shorten`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ url, alias: alias || undefined }),
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (res.status === 400) {
          throw new Error(errorData.error || "Invalid URL or alias provided");
        } else if (res.status === 409) {
          throw new Error(errorData.error || "This alias is already taken");
        } else if (res.status === 401 || res.status === 403) {
          throw new Error("Authentication required. Please log in.");
        } else if (res.status >= 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(errorData.error || "Failed to shorten URL");
        }
      }

      const reply = await res.json();

      setOriginalUrl(url);
      setShortenedUrl(reply.data.shortUrl);
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleShare() {
    console.log("sharing btn is working");
    setDownloading(true);
  }

  function handleReset() {
    console.log("handle reset btn is working");
  }

  return (
    <div className="p-2.5 bg-white rounded-b-md">
      {loading && <p>⏳ QR code is being generated...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {downloading && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-4 py-2 rounded-sm">
          Qr code downloading...
        </div>
      )}

      {shortenedUrl ? (
        <div>
          <label htmlFor="longUrl" className="text-sm text-gray-600">
            Original URL
          </label>
          <input
            id="longUrl"
            className="text-green-600 block border-2 rounded-sm w-full h-10 p-2 mt-2"
            readOnly
            value={originalUrl}
          />
          <label
            htmlFor="shortenedUrl"
            className="text-sm text-gray-600 mt-4 block"
          >
            Shortened URL
          </label>
          <input
            id="shortenedUrl"
            className="text-green-600 block border-2 rounded-sm w-full h-10 p-2 mt-2"
            readOnly
            value={shortenedUrl}
          />
          <div className="flex justify-between w-2/3 mx-auto">
            <button
              className="border-2 mt-7 p-2 rounded-sm hover:bg-gray-100 transition-colors"
              onClick={handleShare}
              type="button"
            >
              share
            </button>
            <button
              className="border-2 mt-7 p-2 rounded-sm hover:bg-gray-100 transition-colors"
              onClick={handleReset}
              type="button"
            >
              Generate Another Qrcode
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="url" className="text-lg">
            Destination url
          </label>
          <input
            type="text"
            id="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="block border-2 rounded-sm w-full h-10 p-2 mt-2"
            placeholder="Enter a long link here"
          />
          <label htmlFor="alias" className="mt-4 text-lg block">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>Alias (optional)</span>
          </label>
          <input
            type="text"
            id="alias"
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
            className="block border-2 rounded-sm w-full h-10 p-2 mt-2"
            placeholder="Enter alias (optional)"
          />
          <p className="italic text-sm">must be at least 5 letters</p>
          <button
            onClick={handleSubmit}
            className="border-2 mt-7 p-2 rounded-sm block mx-auto hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate QR code"}
          </button>
          <p className="text-sm italic text-center mt-3">
            By clicking shorten url you agree to our terms of service, privacy
            policy and Use of Cookies.
          </p>
        </div>
      )}
    </div>
  );
}

export default QrForm;
