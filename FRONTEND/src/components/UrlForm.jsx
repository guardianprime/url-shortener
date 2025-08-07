import { useState } from "react";

function UrlForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get("url");
    const alias = formData.get("alias");

    try {
      setLoading(true);
      setError("");
      setShortenedUrl("");

      const res = await fetch("/shorten", {
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

      const data = await res.json();
      setShortenedUrl(data.shortenedUrl || "Shortened URL received");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-2 border-violet-900 h-full p-2.5">
      <form onSubmit={handleSubmit} id="shortenForm">
        <label htmlFor="url" className="text-lg">
          Shorten your link
        </label>
        <input
          type="text"
          id="url"
          name="url"
          required
          className="block border-2 border-amber-500 rounded-sm w-full h-10 p-2 mt-2"
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
          className="block border-2 border-amber-500 rounded-sm w-full h-10 p-2 mt-2"
          placeholder="Enter alias (optional)"
        />
        <button
          type="submit"
          className="border-2 border-amber-600 mt-7 p-2 rounded-sm block mx-auto"
        >
          Shorten URL
        </button>
      </form>

      {loading && <p>⏳ URL is being shortened...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}
      {shortenedUrl && (
        <p className="text-green-600">
          ✅ Shortened URL:{" "}
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default UrlForm;
