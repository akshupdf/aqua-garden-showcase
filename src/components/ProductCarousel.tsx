import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import nftin from "../assets/nftin.jpeg";
import nftout from "../assets/nftout.jpeg";
import dutch from "../assets/dutch.jpg";
import tower from "../assets/tower.jpg";
import Hero from "./Hero";
import AMCShowcase from "./AMCShowcase";

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
    <div className="relative   w-full">
      <div className="fixed inset-0 -z-10">
        <Hero />
      </div>
      <div className="relative z-10 mt-[100vh] py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="lg:max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-green-900 mb-4">
            Systems We Handle with Care
          </h2>
          <p className="text-center text-gray-600 text-lg mb-4 max-w-2xl mx-auto">
            Professional hydroponic solutions designed for optimal growth and
            maximum yields
          </p>

          <div
            className="relative flex items-center justify-center"
            style={{ perspective: "2000px", minHeight: "750px" }}
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
                      className={`bg-white rounded-3xl overflow-hidden `}
                      style={{ width: "450px" }}
                    >
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      </div>

                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-green-900 mb-3">
                          {product.name}
                        </h3>
                        <p className="text-gray-700 text-base mb-5 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                            Key Features
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                <span className="text-sm text-gray-600">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm text-green-700 font-medium mb-1">
                            Ideal for:
                          </p>
                          <p className="text-sm text-gray-600">
                            {product.idealFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={prevSlide}
              className="lg:flex hidden absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur p-4 rounded-full shadow-xl hover:bg-green-50 hover:shadow-2xl transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-7 h-7 text-green-700" />
            </button>
            <button
              onClick={nextSlide}
              className="lg:flex hidden absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur p-4 rounded-full shadow-xl hover:bg-green-50 hover:shadow-2xl transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-7 h-7 text-green-700" />
            </button>
          </div>

          <div className="flex justify-center mt-16 space-x-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "bg-green-600 w-12 h-3"
                    : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
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
