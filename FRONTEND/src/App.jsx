import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Homepage from "./pages/Homepage";

import About from "./pages/About";
import MyUrls from "./pages/MyUrls";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ForgetPassword from "./pages/ForgetPassword";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/myurls" element={<MyUrls />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
