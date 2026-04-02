import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  Star
} from "lucide-react";

// Best systems for each category
const categoryData = {
  dwc: {
    name: "DWC Systems",
    icon: Droplets,
    description: "Deep Water Culture - plants suspended in nutrient-rich oxygenated water",
    color: "from-blue-500 to-cyan-500",
    products: [
      {
        id: 1,
        name: "Trolley Microgreen System",
        shortDesc: "Multi-tier commercial microgreens production",
        description: "Multi-tier trolley system perfect for commercial microgreens production. Maximizes space efficiency with stackable trays and deep water culture technology.",
        features: [
          "3-5 tier stackable design",
          "Air pump with stone diffusers",
          "Food-grade HDPE trays",
          "UV-resistant structure",
          "Easy mobility with casters"
        ],
        specs: { capacity: "50-100 trays", area: "6x4 ft", yield: "2-3 kg/cycle" },
        idealFor: "Microgreens, Wheatgrass, Baby Greens",
        price: "₹45,000 - ₹85,000",
        tag: "Best Seller",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
      },
      {
        id: 2,
        name: "DWC Raft System",
        shortDesc: "Floating raft system for leafy greens",
        description: "Floating raft system for leafy greens. Plants float on Styrofoam rafts with roots suspended in nutrient solution.",
        features: [
          "Float technology for even growth",
          "High-density planting",
          "Low maintenance design",
          "Excellent oxygenation",
          "Scalable setup"
        ],
        specs: { capacity: "200-500 plants", area: "10x10 ft", yield: "15-20 kg/cycle" },
        idealFor: "Lettuce, Kale, Spinach, Basil",
        price: "₹35,000 - ₹75,000",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
      },
      {
        id: 3,
        name: "DWC Bucket System",
        shortDesc: "Individual buckets for larger plants",
        description: "Individual bucket DWC system for larger plants. Perfect for tomatoes, peppers, and heavy feeders.",
        features: [
          "5-10 gallon buckets",
          "Net pot baskets",
          "Air pump with air stones",
          "Water level indicator",
          "Modular expandable design"
        ],
        specs: { capacity: "4-8 plants", area: "4x4 ft", yield: "8-12 kg/season" },
        idealFor: "Tomatoes, Peppers, Cucumbers, Eggplant",
        price: "₹12,000 - ₹25,000",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
      },
      {
        id: 4,
        name: "Kratky Method DWC",
        shortDesc: "No electricity required passive system",
        description: "Passive DWC system requiring no electricity. Perfect for beginners and small-scale growers.",
        features: [
          "No electricity needed",
          "Low maintenance setup",
          "Space-saving design",
          "Cost-effective solution",
          "Perfect for beginners"
        ],
        specs: { capacity: "4-6 plants", area: "2x2 ft", yield: "3-5 kg/cycle" },
        idealFor: "Lettuce, Bok Choy, Herbs",
        price: "₹3,500 - ₹8,000",
        tag: "Budget Friendly",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80"
      }
    ]
  },

  nft: {
    name: "NFT Systems",
    icon: Wind,
    description: "Nutrient Film Technique - continuous shallow stream of nutrient solution",
    color: "from-green-500 to-emerald-500",
    products: [
      {
        id: 5,
        name: "NFT Channel Indoor System",
        shortDesc: "Controlled environment NFT for leafy greens",
        description: "Nutrient Film Technique for controlled indoor environments. Continuous nutrient flow for optimal growth.",
        features: [
          "UV-protected PVC channels",
          "Slope-adjustable stands",
          "Recirculating nutrient system",
          "High-density planting",
          "Easy maintenance access"
        ],
        specs: { capacity: "100-300 plants", area: "8x4 ft/tier", yield: "20-30 kg/cycle" },
        idealFor: "Lettuce, Spinach, Basil, Mint, Strawberries",
        price: "₹55,000 - ₹1,20,000",
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
      },
      {
        id: 6,
        name: "Multi-Tier NFT System",
        shortDesc: "Vertical stacking for maximum production",
        description: "Vertical stacking NFT system maximizing production per square foot. Perfect for urban farming.",
        features: [
          "3-5 tier vertical setup",
          "LED grow light integration",
          "Automated nutrient dosing",
          "Climate control ready",
          "Commercial grade components"
        ],
        specs: { capacity: "500-1500 plants", area: "10x10 ft", yield: "80-120 kg/cycle" },
        idealFor: "Leafy Greens, Herbs, Microgreens",
        price: "₹2,50,000 - ₹5,00,000",
        tag: "Commercial",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
      },
      {
        id: 7,
        name: "NFT Channel Outdoor System",
        shortDesc: "Weather-resistant outdoor NFT setup",
        description: "Weather-resistant NFT setup for outdoor cultivation. Maximizes natural sunlight with precise nutrient delivery.",
        features: [
          "UV-stabilized channels",
          "Weather-resistant materials",
          "Sunlight optimization",
          "Natural ventilation",
          "Year-round production"
        ],
        specs: { capacity: "150-400 plants", area: "15x5 ft", yield: "30-50 kg/cycle" },
        idealFor: "Tomatoes, Peppers, Cucumbers, Herbs",
        price: "₹75,000 - ₹1,50,000",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
      },
      {
        id: 8,
        name: "Greenhouse NFT System",
        shortDesc: "Complete greenhouse-integrated solution",
        description: "Complete greenhouse-integrated NFT solution with climate control for protected cultivation.",
        features: [
          "Greenhouse integration",
          "Climate control sensors",
          "Automated nutrient management",
          "Shade system compatible",
          "Large scale production"
        ],
        specs: { capacity: "500-2000 plants", area: "Custom sizes", yield: "100-200 kg/cycle" },
        idealFor: "All Leafy Greens, Herbs, Vine Crops",
        price: "₹3,50,000 - ₹8,00,000",
        tag: "Premium",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80"
      }
    ]
  },

  dutch: {
    name: "Dutch Bucket",
    icon: Sprout,
    description: "Drip irrigation system for larger fruiting plants",
    color: "from-amber-500 to-orange-500",
    products: [
      {
        id: 9,
        name: "Dutch Bucket Indoor System",
        shortDesc: "Versatile drip irrigation for indoor use",
        description: "Versatile drip irrigation system for larger fruiting plants. Individual bucket control for customized growing.",
        features: [
          "Individual plant control",
          "Drip irrigation with emitters",
          "Recirculating nutrient system",
          "Excellent drainage",
          "Supports heavy crops"
        ],
        specs: { capacity: "8-24 plants", area: "6x4 ft", yield: "15-30 kg/season" },
        idealFor: "Tomatoes, Peppers, Eggplant, Zucchini",
        price: "₹28,000 - ₹55,000",
        tag: "Best Seller",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80"
      },
      {
        id: 10,
        name: "Bato Bucket System",
        shortDesc: "Professional-grade commercial system",
        description: "Professional-grade Bato bucket system with siphon elbows. Industry standard for commercial production.",
        features: [
          "Commercial Bato buckets",
          "Siphon elbow drainage",
          "Drip irrigation included",
          "Return line system",
          "Nutrient reservoir"
        ],
        specs: { capacity: "16-48 plants", area: "8x8 ft", yield: "30-60 kg/season" },
        idealFor: "Tomatoes, Peppers, Cucumbers, Eggplant",
        price: "₹55,000 - ₹1,10,000",
        tag: "Professional",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
      },
      {
        id: 11,
        name: "Dutch Bucket Outdoor System",
        shortDesc: "Weather-resistant outdoor cultivation",
        description: "Weather-resistant Dutch bucket system for outdoor cultivation. Perfect for greenhouse or open field.",
        features: [
          "UV-resistant buckets",
          "Weather-proof components",
          "Large volume buckets",
          "Easy nutrient management",
          "Expandable rows"
        ],
        specs: { capacity: "20-100 plants", area: "Custom layout", yield: "40-100 kg/season" },
        idealFor: "Tomatoes, Peppers, Cucumbers, Melons",
        price: "₹45,000 - ₹1,20,000",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
      },
      {
        id: 12,
        name: "Holland Bucket System",
        shortDesc: "Superior drainage and aeration",
        description: "Dutch-style bucket system with excellent drainage and aeration. Perfect for warm climates.",
        features: [
          "Dutch design efficiency",
          "Superior drainage",
          "Root zone aeration",
          "Large growing volume",
          "High yield production"
        ],
        specs: { capacity: "30-80 plants", area: "15x10 ft", yield: "50-120 kg/season" },
        idealFor: "Tomatoes, Peppers, Eggplant, Beans",
        price: "₹75,000 - ₹1,50,000",
        tag: "High Yield",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
      }
    ]
  },

  aeroponics: {
    name: "Aeroponics",
    icon: Warehouse,
    description: "Roots suspended in air with nutrient mist delivery",
    color: "from-purple-500 to-pink-500",
    products: [
      {
        id: 13,
        name: "Aeroponics Tower Indoor",
        shortDesc: "Vertical tower with nutrient mist",
        description: "Vertical growing solution maximizing space efficiency. Roots suspended in air with nutrient mist delivery.",
        features: [
          "Vertical tower design",
          "Misting nozzles system",
          "High-pressure pump",
          "Nutrient mist delivery",
          "Maximum oxygenation"
        ],
        specs: { capacity: "20-60 plants/tower", area: "2x2 ft", yield: "8-15 kg/cycle" },
        idealFor: "Lettuce, Herbs, Microgreens, Strawberries",
        price: "₹32,000 - ₹65,000",
        tag: "Innovative",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
      },
      {
        id: 14,
        name: "Aeroponics Tower Outdoor",
        shortDesc: "Weather-protected outdoor tower",
        description: "Weather-protected aeroponics tower for outdoor use. Combines sun exposure with aeroponic efficiency.",
        features: [
          "Weather-resistant housing",
          "Solar-powered option",
          "Natural sunlight utilization",
          "Mist system protection",
          "Water-efficient technology"
        ],
        specs: { capacity: "30-80 plants/tower", area: "3x3 ft", yield: "12-25 kg/cycle" },
        idealFor: "Lettuce, Herbs, Kale, Strawberries",
        price: "₹45,000 - ₹95,000",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
      },
      {
        id: 15,
        name: "Aeroponic Farm Container",
        shortDesc: "Shipping container converted farm",
        description: "Shipping container converted to aeroponic farm. Commercial-grade vertical farming solution.",
        features: [
          "Container-based system",
          "Climate controlled",
          "LED grow lights",
          "Automated misting",
          "Monitoring systems"
        ],
        specs: { capacity: "2000-5000 plants", area: "20x8 ft", yield: "200-400 kg/cycle" },
        idealFor: "Leafy Greens, Herbs, Microgreens",
        price: "₹12,00,000 - ₹25,00,000",
        tag: "Commercial",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80"
      },
      {
        id: 16,
        name: "DIY Aeroponics Kit",
        shortDesc: "Compact kit for home growers",
        description: "Compact aeroponics kit for home growers. Easy assembly and maintenance for beginners.",
        features: [
          "Easy DIY assembly",
          "Compact design",
          "Low power consumption",
          "Misting system included",
          "Home-friendly size"
        ],
        specs: { capacity: "8-15 plants", area: "2x2 ft", yield: "3-6 kg/cycle" },
        idealFor: "Lettuce, Herbs, Small Vegetables",
        price: "₹8,500 - ₹18,000",
        tag: "Beginner Friendly",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
      }
    ]
  },

  vertical: {
    name: "Vertical Farming",
    icon: Home,
    description: "Maximize growing space with vertical systems",
    color: "from-teal-500 to-green-500",
    products: [
      {
        id: 17,
        name: "Vertical Wall System Indoor",
        shortDesc: "Living wall for any space",
        description: "Living wall system for vertical farming. Perfect for restaurants, offices, and homes.",
        features: [
          "Wall-mounted design",
          "Hydroponic pockets",
          "Recirculating water",
          "Space efficient",
          "Decorative + functional"
        ],
        specs: { capacity: "20-50 plants/panel", area: "4x6 ft wall", yield: "5-12 kg/cycle" },
        idealFor: "Herbs, Lettuce, Decorative Plants",
        price: "₹22,000 - ₹45,000",
        tag: "Aesthetic",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
      },
      {
        id: 18,
        name: "Vertical Rack System",
        shortDesc: "Multi-tier with LED grow lights",
        description: "Multi-tier rack system with LED grow lights. Maximizes production in minimal floor space.",
        features: [
          "Vertical stacking design",
          "LED grow light integration",
          "Automated watering",
          "Modular expansion",
          "Energy efficient"
        ],
        specs: { capacity: "100-400 plants", area: "4x8 ft", yield: "30-60 kg/cycle" },
        idealFor: "Microgreens, Herbs, Leafy Greens",
        price: "₹85,000 - ₹1,75,000",
        tag: "High Production",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
      },
      {
        id: 19,
        name: "Vertical Tower Garden Outdoor",
        shortDesc: "Free-standing outdoor tower",
        description: "Free-standing vertical tower for outdoor use. Stackable growing pods with nutrient reservoir.",
        features: [
          "Stackable growing pods",
          "Nutrient reservoir base",
          "Sunlight optimized",
          "Easy assembly",
          "Weather resistant"
        ],
        specs: { capacity: "20-52 plants/tower", area: "2x2 ft", yield: "8-20 kg/cycle" },
        idealFor: "Herbs, Lettuce, Strawberries, Flowers",
        price: "₹15,000 - ₹35,000",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80"
      },
      {
        id: 20,
        name: "Greenhouse Vertical System",
        shortDesc: "Large-scale commercial solution",
        description: "Large-scale vertical farming system for greenhouses. Automated with climate control integration.",
        features: [
          "Industrial-grade construction",
          "Automated systems",
          "Climate control ready",
          "High capacity production",
          "Energy efficient"
        ],
        specs: { capacity: "500-2000 plants", area: "Custom", yield: "150-400 kg/cycle" },
        idealFor: "All Leafy Greens, Herbs, Microgreens",
        price: "₹4,50,000 - ₹10,00,000",
        tag: "Commercial",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
      }
    ]
  }
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryData>("dwc");
  const [selectedProduct, setSelectedProduct] = useState<typeof categoryData.dwc.products[0] | null>(null);

  const currentCategory = categoryData[selectedCategory];
  const CategoryIcon = currentCategory.icon;

  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>

      <Navbar />

      <section className="pt-32 pb-24 relative">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              <span>Premium Hydroponic Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Our Product Catalog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully selected range of modern hydroponic systems - from home growers to commercial farms
            </p>
          </div>

          {/* Main Content with Vertical Tabs */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vertical Tabs Sidebar */}
            <div className="lg:w-1/4 animate-fade-in-left">
              <div className="sticky top-32 space-y-3">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Categories
                </h3>
                {Object.entries(categoryData).map(([key, category]) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key as keyof typeof categoryData)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                          : "bg-white/80 backdrop-blur-sm hover:bg-white border border-green-200 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-green-100"}`}>
                          <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-green-600"}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold ${isActive ? "text-white" : "text-foreground"}`}>
                            {category.name}
                          </div>
                          <div className={`text-xs ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                            {category.products.length} systems
                          </div>
                        </div>
                        {isActive && (
                          <ChevronRight className="w-5 h-5 text-white animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Category Header */}
              <div className="mb-8 p-6 bg-gradient-to-r from-white/80 to-green-50/80 backdrop-blur-sm rounded-2xl border border-green-100 animate-fade-in-up">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${currentCategory.color} text-white`}>
                    <CategoryIcon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {currentCategory.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {currentCategory.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{currentCategory.products.length}</div>
                    <div className="text-sm text-muted-foreground">Products</div>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="grid md:grid-cols-2 gap-6">
                {currentCategory.products.map((product) => (
                  <Card
                    key={product.id}
                    className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden animate-scale-in bg-white/90 backdrop-blur-sm hover:scale-[1.02] cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Tags */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {product.tag && (
                          <span className={`inline-block bg-gradient-to-r ${currentCategory.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1`}>
                            <Star className="w-3 h-3" />
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-green-600 transition-colors duration-300">
                        {product.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.shortDesc}
                      </p>

                      {/* Quick Specs */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="text-xs text-muted-foreground">Capacity</div>
                          <div className="text-sm font-semibold text-green-700">{product.specs.capacity}</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="text-xs text-muted-foreground">Area</div>
                          <div className="text-sm font-semibold text-green-700">{product.specs.area}</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="text-xs text-muted-foreground">Yield</div>
                          <div className="text-sm font-semibold text-green-700">{product.specs.yield}</div>
                        </div>
                      </div>

                      {/* Ideal For */}
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Perfect for:</div>
                        <div className="text-sm text-green-700 font-medium">{product.idealFor}</div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-xs text-muted-foreground">Starting from</div>
                          <div className="text-lg font-bold text-green-600">{product.price}</div>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 font-medium group-hover:gap-3 transition-all duration-300">
                          View Details
                          <ChevronRight className="w-5 h-5" />
                        </div>
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
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Tag */}
                {selectedProduct.tag && (
                  <div className="absolute bottom-6 left-6">
                    <span className={`inline-block bg-gradient-to-r ${currentCategory.color} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2`}>
                      <Star className="w-4 h-4" />
                      {selectedProduct.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-foreground mb-3">{selectedProduct.name}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                  <div className="ml-6 text-right">
                    <div className="text-3xl font-bold text-green-600 mb-1">{selectedProduct.price}</div>
                    <div className="text-sm text-muted-foreground">Starting price</div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      Capacity
                    </div>
                    <div className="text-xl font-bold text-green-700">{selectedProduct.specs.capacity}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Home className="w-4 h-4 text-green-600" />
                      Area Required
                    </div>
                    <div className="text-xl font-bold text-green-700">{selectedProduct.specs.area}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-600" />
                      Expected Yield
                    </div>
                    <div className="text-xl font-bold text-green-700">{selectedProduct.specs.yield}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-600" />
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-green-50/50 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Perfect For Growing</h3>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-5 border border-green-200">
                    <div className="text-green-900 font-semibold text-lg">{selectedProduct.idealFor}</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" onClick={() => setSelectedProduct(null)}>
                    <Button
                      size="lg"
                      className={`bg-gradient-to-r ${currentCategory.color} hover:opacity-90 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      Get Quote
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8"
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
    </main>
  );
};

export default Products;
