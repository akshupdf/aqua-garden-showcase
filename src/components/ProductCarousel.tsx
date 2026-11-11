import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import nftin from "../assets/nftin.jpeg";
import nftout from "../assets/nftout.jpeg";
import dutch from "../assets/dutch.jpg";
import tower from "../assets/tower.jpg";
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
    idealFor: "Lettuce, Herbs, Microgreens",
    categoryId: "aeroponics",
  },
];

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getPositionStyles = (position: number) => {
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
            "translateX(-130%) scale(0.9) rotateY(25deg) translateZ(-40px)",
          zIndex: 30,
          opacity: 0.85,
        };
      case 1:
        return {
          transform:
            "translateX(30%) scale(0.9) rotateY(-25deg) translateZ(-40px)",
          zIndex: 30,
          opacity: 0.85,
        };
      case -2:
        return {
          transform:
            "translateX(-190%) scale(0.8) rotateY(40deg) translateZ(-120px)",
          zIndex: 20,
          opacity: 0.4,
        };
      case 2:
        return {
          transform:
            "translateX(90%) scale(0.8) rotateY(-40deg) translateZ(-120px)",
          zIndex: 20,
          opacity: 0.4,
        };
      default:
        return {
          opacity: 0,
          pointerEvents: "none" as const,
          zIndex: 0,
        };
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm">
            <span>🌿</span>
            <span>Our Expertise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight">
            Systems We Handle with Care
          </h2>
          <p className="text-center text-gray-600 text-xs sm:text-sm md:text-base mb-6 max-w-2xl mx-auto px-4">
            Professional hydroponic solutions designed for optimal growth and maximum yields
          </p>

          <Link to="/products">
            <Button
              size="default"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl h-auto"
            >
              View All Products
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* 3D Carousel Viewport */}
        <div
          className="relative flex items-center justify-center overflow-hidden py-4 select-none"
          style={{ perspective: "1500px", minHeight: "520px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full max-w-2xl flex items-center justify-center">
            {products.map((product, index) => {
              let relativePosition = index - currentSlide;
              if (relativePosition < -2) relativePosition += products.length;
              if (relativePosition > 2) relativePosition -= products.length;

              const { transform, zIndex, opacity, pointerEvents } =
                getPositionStyles(relativePosition);

              return (
                <div
                  key={index}
                  className="absolute left-1/2 transition-all duration-700 ease-out"
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    pointerEvents: relativePosition === 0 ? "auto" : pointerEvents || "none",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="w-[86vw] sm:w-[350px] md:w-[380px] max-w-[380px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
                    <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1.5 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3.5 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mb-3.5">
                          <h4 className="text-[11px] font-semibold text-green-700 uppercase tracking-wide mb-1.5">
                            Key Features
                          </h4>
                          <div className="grid grid-cols-2 gap-1.5">
                            {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-1.5 mt-1 flex-shrink-0"></span>
                                <span className="text-[11px] sm:text-xs text-gray-600 line-clamp-1">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-gray-100">
                          <p className="text-[11px] font-semibold text-green-700 mb-0.5">
                            Ideal for:
                          </p>
                          <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1">
                            {product.idealFor}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link to={`/products?category=${product.categoryId}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold text-xs sm:text-sm rounded-xl py-2 h-auto"
                          >
                            Learn More
                            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow Button (Accessible across all screen sizes) */}
          <button
            onClick={prevSlide}
            className="flex items-center justify-center absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-md p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-green-50 transition-all hover:scale-105 active:scale-95 text-green-700 border border-gray-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-green-700" />
          </button>

          {/* Right Arrow Button (Accessible across all screen sizes) */}
          <button
            onClick={nextSlide}
            className="flex items-center justify-center absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-md p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-green-50 transition-all hover:scale-105 active:scale-95 text-green-700 border border-gray-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-green-700" />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center mt-6 mb-2 space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 w-8 h-2"
                  : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16">
        <AMCShowcase />
      </div>
    </section>
  );
};

export default ProductCarousel;
