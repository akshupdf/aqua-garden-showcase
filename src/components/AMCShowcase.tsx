import { Button } from "@/components/ui/button";
import { CheckCircle2, Leaf, Droplets, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import amcImage from "@/assets/amc-service.jpg";

const features = [
  {
    icon: Leaf,
    title: "Complete Setup",
    description: "Professional installation of NFT systems tailored to your space",
  },
  {
    icon: Droplets,
    title: "Nutrient Management",
    description: "Regular monitoring and optimization of nutrient solutions",
  },
  {
    icon: Sun,
    title: "Year-Round Support",
    description: "Comprehensive maintenance and technical assistance",
  },
];

const benefits = [
  "Grow fresh vegetables like spinach and lettuce indoors",
  "Zero soil, minimal water usage",
  "Year-round harvests regardless of season",
  "Expert guidance and maintenance",
];

const AMCShowcase = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="text-primary font-medium text-sm tracking-wide uppercase">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Annual Maintenance Contract
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let us handle the complexity while you enjoy fresh, homegrown produce. Our AMC service ensures 
              your hydroponic NFT system runs perfectly all year long.
            </p>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h4 className="font-semibold mb-4 text-foreground">What You'll Get:</h4>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to="/contact">
              <Button size="lg">Request AMC Service</Button>
            </Link>
          </div>
          
          <div className="animate-scale-in">
            <div className="rounded-2xl overflow-hidden shadow-[var(--card-hover-shadow)]">
              <img 
                src={amcImage} 
                alt="AMC Service"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AMCShowcase;
