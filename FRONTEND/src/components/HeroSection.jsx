import UrlForm from "./UrlForm";

function Herosection() {
  return (
    <section className="h-full w-full bg-[#031f39] p-5 ">
      <div className="text-white">
        <h1 className="text-4xl font-bold">
          URL shortener, QR code and link analytics
        </h1>
        <div className="text-lg mt-4 max-w-xl">
          <p>
            Shorten, brand, and manage your links with our all-in-one URL
            shortening platform.
          </p>
          <p className="mt-3">
            Create custom short URLs and QR codes to boost your brand visibility
            and track link performance with detailed analytics.
          </p>
        </div>
        <div className="flex w-full h-30 justify-between flex-col mt-2">
          <button className="p-3 h-2/5 outline-white w-full outline-1">
            Create free account
          </button>
          <button className="p-3 h-2/5 w-full bg-white text-[#031f39]">
            Test for free
          </button>
        </div>
      </div>
      <UrlForm />
    </section>
  );
}

export default Herosection;
