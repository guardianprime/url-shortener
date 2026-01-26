import Footer from "../components/Footer";
import Hamburger from "../components/Hamburger";
import HeroSection from "../components/HeroSection";
import ExplainSection from "../components/ExplainSection";

function Homepage() {
  return (
    <>
      <Hamburger urlpage={true} about={true} signin={true} />
      <HeroSection />
      <ExplainSection />
      <Footer />
    </>
  );
}

export default Homepage;
