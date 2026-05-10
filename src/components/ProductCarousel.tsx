import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import nftin from "../assets/nftin.jpeg";
import nftout from "../assets/nftout.jpeg";
import dutch from "../assets/dutch.jpg";
import tower from "../assets/tower.jpg";
import Hero from "./Hero";
import AMCShowcase from "./AMCShowcase";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "NFT Channel Indoor System",
    img: nftin,
    description:
      "Nutrient Film Technique for controlled indoor environments. Perfect for leafy greens and herbs with continuous nutrient flow.",
    features: [
      "Space-efficient design",
      "Low water consumption",
      "Year-round production",
      "Easy maintenance",
    ],
    idealFor: "Lettuce, Spinach, Basil, Mint",
    categoryId: "nft",
  },
  {
    name: "NFT Channel Outdoor System",
    img: nftout,
    description:
      "Weather-resistant NFT setup for outdoor cultivation. Maximizes natural sunlight while maintaining precise nutrient delivery.",
    features: [
      "UV-resistant materials",
      "Climate adaptable",
      "High yield potential",
      "Natural light integration",
    ],
    idealFor: "Tomatoes, Peppers, Cucumbers, Herbs",
    categoryId: "nft",
  },
  {
    name: "Dutch Bucket System",
    img: dutch,
    description:
      "Versatile drip irrigation system ideal for larger fruiting plants. Individual bucket control for customized growing.",
    features: [
      "Individual plant control",
      "Scalable design",
      "Excellent drainage",
      "Supports heavy crops",
    ],
    idealFor: "Tomatoes, Peppers, Eggplant, Zucchini",
    categoryId: "dutch",
  },
  {
    name: "Aeroponics Tower System",
    img: tower,
    description:
      "Vertical growing solution that maximizes space efficiency. Roots suspended in air with nutrient mist delivery.",
    features: [
      "Maximum space efficiency",
      "Faster growth rates",
      "Superior oxygenation",
      "Minimal water usage",
    ],
    idealFor: " Lettuce, Herbs, Microgreens",
    categoryId: "aeroponics",
  },
];

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % products.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);

  const getPositionStyles = (position, total) => {
    switch (position) {
      case 0:
        return {
          transform: "translateX(-50%) scale(1) rotateY(0deg) translateZ(0)",
          zIndex: 40,
          opacity: 1,
        };
      case -1:
        return {
          transform:
            "translateX(-140%) scale(0.92) rotateY(35deg) translateZ(-60px)",
          zIndex: 30,
          opacity: 0.9,
        };
      case 1:
        return {
          transform:
            "translateX(40%) scale(0.92) rotateY(-35deg) translateZ(-60px)",
          zIndex: 30,
          opacity: 0.9,
        };
      case -2:
        return {
          transform:
            "translateX(-230%) scale(0.85) rotateY(50deg) translateZ(-180px)",
          zIndex: 20,
          opacity: 0.6,
        };
      case 2:
        return {
          transform:
            "translateX(130%) scale(0.85) rotateY(-50deg) translateZ(-180px)",
          zIndex: 20,
          opacity: 0.6,
        };
      default:
        return {
          opacity: 0,
          pointerEvents: "none",
          zIndex: 0,
        };
    }
  };

  return (
    <div className="relative w-full">
      <div className="fixed inset-0 -z-10">
        <Hero />
      </div>
      <div className="relative z-10 mt-[100vh] py-12 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="lg:max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🌿</span>
              <span>Our Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Systems We Handle with Care
            </h2>
            <p className="text-center text-gray-600 text-base mb-6 max-w-2xl mx-auto">
              Professional hydroponic solutions designed for optimal growth and
              maximum yields
            </p>

            {/* View All Products Button */}
            <Link to="/products">
              <Button
                size="default"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div
            className="relative flex items-center justify-center"
            style={{ perspective: "2000px", minHeight: "550px" }}
          >
            <div className="relative w-full max-w-2xl flex items-center justify-center">
              {products.map((product, index) => {
                let relativePosition = index - currentSlide;
                if (relativePosition < -2) relativePosition += products.length;
                if (relativePosition > 2) relativePosition -= products.length;

                const { transform, zIndex, opacity } = getPositionStyles(
                  relativePosition,
                  products.length
                );

                return (
                  <div
                    key={index}
                    className="absolute left-1/2 transition-all duration-700 ease-out"
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      pointerEvents: relativePosition === 0 ? "auto" : "none",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div
                      className={`bg-white rounded-3xl overflow-hidden shadow-2xl`}
                      style={{ width: "380px" }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                            Key Features
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <span className="w-1 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                                <span className="text-xs text-gray-600">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-green-700 font-medium mb-1">
                            Ideal for:
                          </p>
                          <p className="text-xs text-gray-600">
                            {product.idealFor}
                          </p>
                        </div>

                        {/* Link to Product Category */}
                        <div className="mt-4">
                          <Link to={`/products?category=${product.categoryId}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold text-sm"
                            >
                              Learn More
                              <ArrowRight className="ml-2 w-3 h-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={prevSlide}
              className="lg:flex hidden absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur p-3 rounded-full shadow-xl hover:bg-green-50 hover:shadow-2xl transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 text-green-700" />
            </button>
            <button
              onClick={nextSlide}
              className="lg:flex hidden absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur p-3 rounded-full shadow-xl hover:bg-green-50 hover:shadow-2xl transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 text-green-700" />
            </button>
          </div>

          <div className="flex justify-center mt-10 mb-4 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 w-10 h-2.5"
                    : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <AMCShowcase />
      </div>
    </div>
  );
};

export default ProductCarousel;
