import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import AMCShowcase from "@/components/AMCShowcase";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ProductCarousel />
    </main>
  );
};

export default Home;
