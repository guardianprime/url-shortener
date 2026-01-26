import { useState } from "react";
import API_BASE_URL from "../config/api.js";
import { useAuth } from "../contexts/AuthContext.jsx";

function UrlForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [aliasInput, setAliasInput] = useState("");
  const [showCopyNotification, setShowCopyNotification] = useState(false);
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
      let generateQrCode = false;

      const res = await fetch(`${API_BASE_URL}/api/v1/shorten`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          url,
          alias: alias || undefined,
          generateQrCode,
        }),
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

  function handleCopy() {
    navigator.clipboard.writeText(shortenedUrl);

    setShowCopyNotification(true);
    setTimeout(() => {
      setShowCopyNotification(false);
    }, 2000);
  }

  function handleReset() {
    setShortenedUrl("");
    setOriginalUrl("");
    setUrlInput("");
    setAliasInput("");
    setError("");
    setShowCopyNotification(false);
  }

  return (
    <div className="p-2.5 bg-white rounded-b-md">
      {loading && <p>⏳ URL is being shortened...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {showCopyNotification && (
        <p className="top-2 right-2 bg-green-500 text-white px-4 py-2 rounded-sm">
          ✓ Copied to clipboard!
        </p>
      )}

      {shortenedUrl ? (
        <div>
          <label htmlFor="longUrl" className="text-sm text-gray-600">
            Original URL
          </label>
          <input
            id="longUrl"
            className="text-green-600 block border-[#333333] border-1 rounded-sm w-full h-10 p-2 mt-2"
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
            className="text-green-600 block border-[#333333] border-1 rounded-sm w-full h-10 p-2 mt-2"
            readOnly
            value={shortenedUrl}
          />
          <div className="flex justify-between w-2/3 mx-auto">
            <button
              className="border-2 mt-7 p-2 rounded-sm hover:bg-gray-100 transition-colors"
              onClick={handleCopy}
              type="button"
            >
              Copy
            </button>
            <button
              className="border-2 mt-7 p-2 rounded-sm hover:bg-gray-100 transition-colors"
              onClick={handleReset}
              type="button"
            >
              Shorten Another
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="url" className="text-lg">
            Long URL
          </label>
          <input
            type="text"
            id="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="block border-[#333333] border-1 rounded-sm w-full h-10 p-2 mt-2"
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
            className="block border-[#333333] border-1 rounded-sm w-full h-10 p-2 mt-2"
            placeholder="Enter alias (optional)"
          />
          <p className="text-sm italic">must be atleast 5 letters</p>
          <button
            onClick={handleSubmit}
            className="bg-[#004799] text-white font-bold mt-7 p-2 rounded-sm block mx-auto hover:bg-gray-100 w-full"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
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

export default UrlForm;
