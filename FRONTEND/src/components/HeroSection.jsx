import UrlForm from "./UrlForm";

function Herosection() {
  return (
    <section className="h-full w-full bg-[#f9cff2] p-5">
      <div>
        <h1>Url shortener, QR code and link analytics</h1>
        <div className="text-lg mt-4 max-w-xl">
          <p>
            Shorten, brand, and manage your links with our all-in-one URL
            shortening platform. Create custom short URLs and QR codes to boost
            your brand visibility and track link performance with detailed
            analytics.
          </p>
        </div>
        <div>
          <button>Create free account</button>
        </div>
      </div>
      <UrlForm />
    </section>
  );
}

export default Herosection;
