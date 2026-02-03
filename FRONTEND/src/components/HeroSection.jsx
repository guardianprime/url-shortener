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
    <section className="h-full w-full bg-[#031f39] p-5 lg:flex lg:justify-between lg:gap-2.5 lg:px-18 lg:py-10">
      <div className="text-white lg:w-120 lg:mt-13">
        <h1 className="text-4xl font-bold">
          URL Shortener, QR code and Link Analytics
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
        <div className="flex w-full h-30 justify-between flex-col mt-2 lg:flex-row lg:w-3/4 lg:h-13">
          <button
            className="p-3 h-2/5 outline-white w-full font-bold hover:cursor-pointer outline-1 rounded-lg lg:w-max lg:h-full lg:p-3"
            onClick={handleRedirect}
          >
            Create free account
          </button>
          <button
            className="p-3 h-2/5 w-full font-bold  hover:cursor-pointer bg-white text-[#031f39] rounded-lg lg:w-max lg:h-full lg:p-3"
            onClick={handleTestbtn}
          >
            Test qrCode for free
          </button>
        </div>
      </div>
      <div className="lg:w-110">
        <div className="mt-5 text-white text-2xl flex h-15">
          <button
            className="w-3/5 rounded-t-xl h-full  hover:cursor-pointer"
            style={
              formToggle
                ? { backgroundColor: "#004799", color: "white" }
                : { backgroundColor: "white", color: "black" }
            }
            onClick={() => setFormToggle(false)}
          >
            Shorten a Link
          </button>
          <button
            className="w-2/5 rounded-t-xl h-full  hover:cursor-pointer"
            style={
              formToggle
                ? { backgroundColor: "white", color: "black" }
                : { backgroundColor: "#004799", color: "white" }
            }
            onClick={() => setFormToggle(true)}
          >
            QR Code
          </button>
        </div>
        {formToggle ? <QrForm /> : <UrlForm />}
      </div>
    </section>
  );
}

export default Herosection;
