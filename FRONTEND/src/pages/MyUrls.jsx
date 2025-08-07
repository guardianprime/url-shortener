import { useState, useEffect } from "react";

function MyUrls() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/shorten/urls", {
          credentials: "include",
        });

        const backendReply = await res.json();

        if (!res.ok) {
          setError(backendReply?.error || "Unknown error from server");
          return; // ⛔ Don't continue to set data
        }

        setData(backendReply);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ✅ Run only on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data || !data.urls) return <p>No URLs found.</p>;

  return (
    <div>
      <ul>
        {data.urls.map((url) => (
          <li key={url._id}>
            <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
              {url.originalUrl}
            </a>{" "}
            →{" "}
            <a
              href={`${data.protocol}://${data.host}/${url.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.protocol}://{data.host}/{url.shortCode}
            </a>{" "}
            — {url.clicks} clicks
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyUrls;
