import Navbar from "@/components/Navbar";
import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductCarousel />

      {/* Contact Form Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your hydroponic journey? Send us a message and we'll get back to you!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm
              showTitle={false}
              whatsappNumber="919876543210"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
