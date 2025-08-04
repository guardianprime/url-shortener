import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

// Import your other pages
import About from "./pages/About";
import MyUrls from "./pages/MyUrls";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/shorten/urls" element={<MyUrls />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
