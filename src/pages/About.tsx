import Navbar from "@/components/Navbar";
import { Sprout, Users, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Sprout,
    title: "Sustainable Growth",
    description: "We believe in eco-friendly solutions that minimize water usage and maximize yield.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your success is our success. We provide hands-on support every step of the way.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Premium NFT systems designed for optimal plant growth and longevity.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Fresh, pesticide-free produce for healthier living.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              About HydroGrow
            </h1>
            <p className="text-xl text-muted-foreground">
              Pioneering indoor hydroponic solutions for sustainable urban farming
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-20 animate-fade-in-up">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--card-shadow)]">
              <h2 className="text-3xl font-bold mb-6 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  HydroGrow was founded with a simple yet powerful vision: to make fresh, healthy produce 
                  accessible to everyone, regardless of space or climate constraints. Our journey began when 
                  we realized the potential of NFT (Nutrient Film Technique) systems to revolutionize indoor farming.
                </p>
                <p>
                  Today, we help homes and businesses across the region grow their own vegetables—from crisp 
                  lettuce and nutrient-packed spinach to aromatic herbs—all year round. Our comprehensive AMC 
                  services ensure that your hydroponic garden thrives with minimal effort on your part.
                </p>
                <p>
                  We're more than just a supplier; we're your partner in sustainable, healthy living. Every 
                  system we install is backed by expert knowledge and ongoing support to guarantee your success.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={index}
                    className="text-center animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
