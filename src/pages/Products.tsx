import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import lettuceImg from "@/assets/product-lettuce.jpg";
import spinachImg from "@/assets/product-spinach.jpg";
import herbsImg from "@/assets/product-herbs.jpg";

const products = [
  {
    name: "Hydroponic Lettuce",
    category: "Leafy Greens",
    description: "Crispy, fresh lettuce varieties grown in our NFT systems. Perfect for salads and sandwiches.",
    features: ["High yield", "Fast growing", "Multiple varieties"],
    image: lettuceImg,
  },
  {
    name: "Organic Spinach",
    category: "Leafy Greens",
    description: "Nutrient-dense spinach packed with vitamins and minerals. Ideal for healthy eating.",
    features: ["Iron-rich", "Year-round harvest", "Pesticide-free"],
    image: spinachImg,
  },
  {
    name: "Fresh Herbs",
    category: "Herbs",
    description: "A variety of aromatic herbs including basil, mint, cilantro, and more.",
    features: ["Aromatic", "Versatile use", "Continuous harvest"],
    image: herbsImg,
  },
];

const Products = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground">
              Fresh, healthy produce grown with our advanced hydroponic NFT systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={index}
                className="border-0 shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">{product.category}</span>
                  <h3 className="text-2xl font-semibold mt-2 mb-3 text-foreground">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 text-center bg-muted/50 rounded-2xl p-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Want to grow your own?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our NFT systems make it easy to grow these fresh vegetables and herbs right in your home or office. 
              Get started with our comprehensive AMC service today.
            </p>
            <Link to="/contact">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
