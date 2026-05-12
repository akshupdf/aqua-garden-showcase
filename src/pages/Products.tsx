import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import nft from "../assets/nftout.jpeg";
import indoornft from "../assets/nftin.jpeg";
import flatbed from "../assets/flatbednft.jpeg";
import dutchbucket from "../assets/dutch_bucket.jpg";
import aeroponics from "../assets/tower.jpg";
import pineappletower from "../assets/pine_tower.jpg";
import homeaquaponics from "../assets/aqua.png";

import {
  Leaf,
  Droplets,
  Wind,
  Sprout,
  Warehouse,
  Home,
  Sun,
  ChevronRight,
  X,
  Check,
  Star,
  Fish,
  Zap,
} from "lucide-react";

const categoryData = {
  nft: {
    name: "NFT Systems",
    icon: Wind,
    description:
      "Nutrient Film Technique systems for leafy greens, herbs, and commercial cultivation",
    color: "from-green-500 to-emerald-500",
    products: [
      {
        id: 1,
        name: "A-Frame NFT System",
        shortDesc: "Space-efficient vertical NFT growing solution",
        description:
          "Multi-level A-frame hydroponic NFT system designed for balconies, patios, terraces, and protected farming environments.",
        features: [
          "Double layered NFT channels",
          "Openable lid for easy cleaning",
          "MS powder coated modular frame",
          "Level adjustment legs",
          "Optional movable rollers",
        ],
        specs: {
          capacity: "100 - 280 plants",
          size: "5 x 6 ft to 10 x 6.5 ft",
          production: "12 - 35 kg/month",
        },
        idealFor: "Lettuce, Spinach, Kale, Bok Choy, Basil, Mint, Coriander",
        image: nft,
        tag: "Popular",
        price: "₹35,000 - ₹75,000",
      },

      {
        id: 2,
        name: "Flat Bed NFT System",
        shortDesc: "Commercial horizontal NFT growing bed",
        description:
          "Flat bed NFT hydroponic system ideal for leafy vegetables and herbs with modular expandable design.",
        features: [
          "Double layered NFT channels",
          "Openable maintenance lid",
          "Powder coated frame",
          "Uniform water flow design",
          "Expandable structure",
        ],
        specs: {
          capacity: "15 - 200 plants",
          size: "3 x 2 ft to 10 x 6 ft",
          production: "2.5 - 25 kg/month",
        },
        idealFor: "Lettuce, Celery, Kale, Parsley, Basil, Mint",
        image: flatbed,
        price: "₹25,000 - ₹55,000",
      },

      {
        id: 3,
        name: "Indoor Multi Rack NFT System",
        shortDesc: "Vertical indoor hydroponic farming system",
        description:
          "Multi-layer indoor NFT setup designed for controlled environment agriculture and vertical farming.",
        features: [
          "Multi-level rack design",
          "Indoor optimized setup",
          "LED grow light compatible",
          "High density planting",
          "Commercial vertical farming support",
        ],
        specs: {
          capacity: "24 - 450 plants",
          size: "4 x 2 ft to 10 x 4 ft",
          production: "3.5 - 70 kg/month",
        },
        idealFor: "Leafy greens, herbs, indoor farming, commercial cultivation",
        image: indoornft,
        tag: "Commercial",
        price: "₹45,000 - ₹1,20,000",
      },
    ],
  },

  dutch: {
    name: "Dutch Bucket Systems",
    icon: Sprout,
    description: "Hydroponic bucket systems for fruiting and vine crops",
    color: "from-orange-500 to-amber-500",
    products: [
      {
        id: 4,
        name: "Dutch Bucket Hydroponic System",
        shortDesc: "Efficient drip irrigation hydroponic setup",
        description:
          "Professional Dutch bucket hydroponic system suitable for tomatoes, cucumbers, peppers, and vine crops.",
        features: [
          "Food-grade Dutch buckets",
          "Drip irrigation support",
          "MS powder coated structure",
          "Expandable modular design",
          "Efficient drainage system",
        ],
        specs: {
          capacity: "5 - 50 buckets",
          size: "6 ft to 58 ft length",
          production: "50 - 500 kg/cycle",
        },
        idealFor: "Tomatoes, Cucumbers, Capsicum, Brinjal, Okra",
        image: dutchbucket,
        tag: "Best Seller",
        price: "₹28,000 - ₹65,000",
      },
    ],
  },

  aeroponics: {
    name: "Aeroponics Systems",
    icon: Zap,
    description:
      "High-tech aeroponic systems for maximum oxygenation and rapid growth",
    color: "from-purple-500 to-pink-500",
    products: [
      {
        id: 6,
        name: "Aeroponics Tower System",
        shortDesc: "Vertical tower with nutrient mist delivery",
        description:
          "Innovative vertical aeroponics tower that delivers nutrient-rich mist directly to plant roots suspended in air. Maximum oxygenation for accelerated growth rates.",
        features: [
          "Vertical tower design for space efficiency",
          "High-pressure misting nozzles",
          "Automated nutrient delivery system",
          "Root chamber with 90% less water usage",
          "Modular stackable growing sections",
          "Easy harvesting and maintenance",
        ],
        specs: {
          capacity: "20 - 60 plants/tower",
          size: "2 x 2 ft footprint",
          production: "8 - 15 kg/cycle",
        },
        idealFor: "Lettuce, Herbs, Microgreens, Strawberries, Small vegetables",
        image: aeroponics,
        tag: "Innovative",
        price: "₹45,000 - ₹85,000",
      },
      {
        id: 7,
        name: "Pineapple Tower Aeroponics System",
        shortDesc: "Specialized tower for tropical and larger plants",
        description:
          "Premium pineapple tower designed specifically for larger plants and tropical varieties. Enhanced misting system and larger growing chambers for substantial root development.",
        features: [
          "Pineapple-shaped tower design",
          "Enhanced misting coverage zones",
          "Larger growing chambers for big plants",
          "Support structure for heavy crops",
          "Climate-controlled root environment",
          "Commercial-grade durability",
        ],
        specs: {
          capacity: "15 - 40 plants/tower",
          size: "3 x 3 ft footprint",
          production: "10 - 25 kg/cycle",
        },
        idealFor: "Pineapples, Tomatoes, Peppers, Eggplant, Larger vegetables",
        image: pineappletower,
        tag: "Premium",
        price: "₹65,000 - ₹1,20,000",
      },
    ],
  },

  aquaponics: {
    name: "Aquaponics Systems",
    icon: Fish,
    description:
      "Integrated fish and plant farming systems for sustainable food production",
    color: "from-blue-500 to-cyan-500",
    products: [
      {
        id: 8,
        name: "Home Aquaponics System",
        shortDesc: "Complete integrated fish and plant ecosystem",
        description:
          "Perfect home aquaponics system combining fish farming with hydroponic vegetable production. Natural fertilizer from fish feeds your plants while plants filter water for fish.",
        features: [
          "Integrated fish tank and grow beds",
          "Natural biological filtration system",
          "Water-efficient closed-loop design",
          "Grow organic vegetables and fish together",
          "Low maintenance ecosystem",
          "Educational and sustainable",
        ],
        specs: {
          capacity: "50-100 fish + 20-40 plants",
          size: "6 x 4 ft footprint",
          production: "30-50 kg fish + 15-25 kg vegetables/year",
        },
        idealFor: "Tilapia farming, Leafy greens, Herbs, Kitchen vegetables",
        image: homeaquaponics,
        tag: "Sustainable",
        price: "₹55,000 - ₹95,000",
      },
    ],
  },
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof categoryData>("nft");
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof categoryData.nft.products)[0] | null
  >(null);

  const currentCategory = categoryData[selectedCategory];
  const CategoryIcon = currentCategory.icon;

  return (
    <Layout>
      <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <section className="pt-4 pb-24 relative">
        <div className="container mx-auto px-6">
          {/* Compact Header */}
          <div className="max-w-xl mx-auto text-center mb-6 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Our Product Catalog
            </h1>
            <p className="text-sm text-muted-foreground">
              Premium hydroponic systems for every growing need
            </p>
          </div>

          {/* Main Content with Vertical Tabs */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Vertical Tabs Sidebar */}
            <div className="lg:w-1/5 animate-fade-in-left">
              <div className="sticky top-24 space-y-2">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  Categories
                </h3>
                {Object.entries(categoryData).map(([key, category]) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setSelectedCategory(key as keyof typeof categoryData)
                      }
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 group ${
                        isActive
                          ? `bg-gradient-to-r ${category.color} text-white shadow-md scale-105`
                          : "bg-white/80 backdrop-blur-sm hover:bg-white border border-green-200 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-green-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isActive ? "text-white" : "text-foreground"
                          }`}
                        >
                          {category.name}
                        </span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-white ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-4/5">
              {/* Products */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentCategory.products.map((product) => (
                  <Card
                    key={product.id}
                    className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-scale-in bg-white/90 backdrop-blur-sm hover:scale-[1.02] cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Tags */}
                      {product.tag && (
                        <div className="absolute top-2 left-2">
                          <span
                            className={`inline-block bg-gradient-to-r ${currentCategory.color} text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1`}
                          >
                            <Star className="w-3 h-3" />
                            {product.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Content */}
                    <div className="p-4">
                      <h3 className="text-base font-bold mb-1 text-foreground group-hover:text-green-600 transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {product.shortDesc}
                      </p>

                      {/* Quick Specs */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="text-xs text-muted-foreground">
                            Capacity
                          </div>
                          <div className="text-xs font-semibold text-green-700">
                            {product.specs.capacity}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="text-xs text-muted-foreground">
                            Area
                          </div>
                          <div className="text-xs font-semibold text-green-700">
                            {product.specs.size}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="text-xs text-muted-foreground">
                            Yield
                          </div>
                          <div className="text-xs font-semibold text-green-700">
                            {product.specs.production}
                          </div>
                        </div>
                      </div>

                      {/* View Details */}
                      <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Tag & Price */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  {selectedProduct.tag && (
                    <span
                      className={`inline-block bg-gradient-to-r ${currentCategory.color} text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-2`}
                    >
                      <Star className="w-4 h-4" />
                      {selectedProduct.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="grid md:grid-cols-3 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Leaf className="w-3 h-3 text-green-600" />
                      Capacity
                    </div>
                    <div className="text-base font-bold text-green-700">
                      {selectedProduct.specs.capacity}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Home className="w-3 h-3 text-green-600" />
                      Area Required
                    </div>
                    <div className="text-base font-bold text-green-700">
                      {selectedProduct.specs.size}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Star className="w-3 h-3 text-green-600" />
                      Expected Yield
                    </div>
                    <div className="text-base font-bold text-green-700">
                      {selectedProduct.specs.production}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 bg-green-50/50 rounded-lg"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Perfect For Growing
                  </h3>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
                    <div className="text-sm text-green-900 font-medium">
                      {selectedProduct.idealFor}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" onClick={() => setSelectedProduct(null)}>
                    <Button
                      size="default"
                      className={`bg-gradient-to-r ${currentCategory.color} hover:opacity-90 text-white font-medium px-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      Get Quote
                    </Button>
                  </Link>
                  <Button
                    size="default"
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium px-6"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default Products;
