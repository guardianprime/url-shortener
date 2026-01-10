import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UrlForm from "./UrlForm";
import QrForm from "./qrForm";

function Herosection() {
  const navigate = useNavigate();
  const [formToggle, setFormToggle] = useState(false);

  function handleRedirect() {
    navigate("/signup");
  }

  function handleTestbtn() {
    navigate("/about");
  }

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
          <button
            className="p-3 h-2/5 outline-white w-full outline-1"
            onClick={handleRedirect}
          >
            Create free account
          </button>
          <button
            className="p-3 h-2/5 w-full bg-white text-[#031f39]"
            onClick={handleTestbtn}
          >
            Test qrCode for free
          </button>
        </div>
      </div>
      <div className="mt-5 text-white text-2xl flex h-15">
        <button
          className="w-3/5 rounded-t-xl h-full "
          style={
            formToggle
              ? { backgroundColor: "red" }
              : { backgroundColor: "blue" }
          }
          onClick={() => setFormToggle(false)}
        >
          shorten a link
        </button>
        <button
          className="w-2/5 rounded-t-xl h-full"
          style={
            formToggle
              ? { backgroundColor: "blue" }
              : { backgroundColor: "red" }
          }
          onClick={() => setFormToggle(true)}
        >
          QR code
        </button>
      </div>
      {formToggle ? <QrForm /> : <UrlForm />}
    </section>
  );
}

export default Herosection;
