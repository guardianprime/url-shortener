import Footer from "../components/Footer";
import Hamburger from "../components/Hamburger";
import HeroSection from "../components/HeroSection";

function Homepage() {
  return (
    <>
      <Hamburger urlpage={true} />
      <HeroSection />
      <Footer />
    </>
  );
}

export default Homepage;
