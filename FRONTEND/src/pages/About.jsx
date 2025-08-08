import Hamburger from "../components/Hamburger";
function Details() {
  return (
    <>
      <Hamburger home={true} />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">How It Works</h1>
        <p className="mb-4">
          Our URL shortener takes long, unwieldy web addresses and converts them
          into short, easy-to-share links.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          🔗 Step 1: Enter Your URL
        </h2>
        <p className="mb-4">
          You start by entering the long URL you want to shorten into the form
          on the homepage. Optionally, you can provide a custom alias.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          ⚙️ Step 2: We Generate a Short Link
        </h2>
        <p className="mb-4">
          Our backend generates a unique identifier (or uses your alias) and
          stores it in our database along with your original URL. This short ID
          is combined with our domain to create your shortened link.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          🚀 Step 3: Share Your Link
        </h2>
        <p className="mb-4">
          Once your short link is generated, you can copy it and share it
          anywhere — on social media, in emails, or in text messages.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          🔁 Step 4: Redirection
        </h2>
        <p className="mb-4">
          When someone clicks the short link, our server instantly looks up the
          original URL from the database and redirects the visitor there.
        </p>

        <p className="mt-6 italic text-sm text-gray-600">
          Built for speed, simplicity, and reliability — this tool helps you
          share cleaner links with ease.
        </p>
      </div>
    </>
  );
}

export default Details;
