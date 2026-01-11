import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import AMCShowcase from "@/components/AMCShowcase";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div>
        <ProductCarousel />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
