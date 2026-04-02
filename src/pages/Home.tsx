import Navbar from "@/components/Navbar";
import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductCarousel />
      <Footer />
    </main>
  );
};

export default Home;
