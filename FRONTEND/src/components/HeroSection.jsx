import UrlForm from "./UrlForm";
import { useState } from "react";

function Herosection() {
  const [hiddenToggle, setHiddenToggle] = useState(false);
  return (
    <section className="h-2/5 bg-[#f9cff2] p-5 relative">
      {hiddenToggle && (
        <div
          className={`bg-green-100 text-white p-2 rounded-md absolute bottom-0 `}
        >
          text copied to clipboard
        </div>
      )}
      <UrlForm setHiddenToggle={setHiddenToggle} hiddenToggle={hiddenToggle} />
    </section>
  );
}

export default Herosection;
