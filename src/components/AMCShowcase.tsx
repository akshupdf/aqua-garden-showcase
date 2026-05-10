"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Leaf, Droplets, Sun, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import amcImage from "@/assets/7.1.webp";
import edu from "@/assets/edu.jpg";
import farm from "@/assets/farm.jpg";
import ph from "@/assets/ph.jpeg";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "installation",
    title: "A to Z Installation",
    subtitle: "From design to harvest",
  },
  {
    id: "education",
    title: "Hydroponics Education",
    subtitle: "Learn & grow confidently",
  },
  { id: "amc", title: "Annual Maintenance", subtitle: "We manage, you enjoy" },
  {
    id: "consulting",
    title: "System Consulting",
    subtitle: "Optimize & scale",
  },
];

export default function AMCShowcase() {
  const [activeService, setActiveService] = useState("installation");

  const SERVICE_CONTENT = {
    installation: {
      heading: "A–Z Installation",
      description:
        "From planning to your first harvest, we design and install a complete hydroponic NFT system tailored to your space.",
      cta: "Request Installation",
      features: [
        {
          icon: Leaf,
          title: "System Design",
          description:
            "Customized NFT layout based on space, sunlight, and crop selection",
        },
        {
          icon: Droplets,
          title: "Complete Installation",
          description:
            "End-to-end setup including channels, plumbing, pumps, and tanks",
        },
        {
          icon: Sun,
          title: "First-Cycle Support",
          description:
            "Guided planting, nutrient setup, and early growth monitoring",
        },
      ],
      benefits: [
        "Hassle-free setup without technical confusion",
        "Optimized system for maximum yield",
        "Perfect for beginners and home growers",
        "Ready-to-grow system from day one",
      ],
      bgImage: amcImage,
    },

    education: {
      heading: "Hydroponics Education",
      description:
        "Understand the fundamentals of hydroponics so you can grow confidently and independently.",
      cta: "Learn Hydroponics",
      features: [
        {
          icon: Leaf,
          title: "Concept Clarity",
          description:
            "Simple explanation of NFT systems, nutrients, pH, and EC levels",
        },
        {
          icon: Droplets,
          title: "Practical Training",
          description:
            "Hands-on guidance for seeding, transplanting, and daily care",
        },
        {
          icon: Sun,
          title: "Problem Solving",
          description:
            "Identify deficiencies, diseases, and growth issues early",
        },
      ],
      benefits: [
        "Grow without dependency on technicians",
        "Avoid common beginner mistakes",
        "Healthier plants and consistent harvests",
        "Clear understanding of the entire system",
      ],
      bgImage: edu,
    },

    amc: {
      heading: "Annual Maintenance Contract",
      description:
        "Let us manage your hydroponic system while you enjoy fresh, homegrown produce all year round.",
      cta: "Request AMC Service",
      features: [
        {
          icon: Leaf,
          title: "Complete Setup Care",
          description:
            "Regular inspection of channels, plants, and system health",
        },
        {
          icon: Droplets,
          title: "Nutrient Management",
          description:
            "Monitoring and optimization of nutrient solution, EC, and pH",
        },
        {
          icon: Sun,
          title: "Year-Round Support",
          description: "Ongoing maintenance and quick issue resolution",
        },
      ],
      benefits: [
        "Zero stress system management",
        "Consistent yield throughout the year",
        "Minimal water and nutrient wastage",
        "Expert care without daily involvement",
      ],
      bgImage: ph,
    },

    consulting: {
      heading: "System Consulting",
      description:
        "Improve performance, fix issues, and plan smart expansion for your existing hydroponic system.",
      cta: "Get Expert Consulting",
      features: [
        {
          icon: Leaf,
          title: "System Audit",
          description:
            "Detailed review of layout, plant health, and system flow",
        },
        {
          icon: Droplets,
          title: "Performance Optimization",
          description: "Fine-tuning nutrients, spacing, and growth cycles",
        },
        {
          icon: Sun,
          title: "Expansion Planning",
          description:
            "Guidance for scaling or upgrading your system efficiently",
        },
      ],
      benefits: [
        "Improve yield without rebuilding the system",
        "Reduce recurring failures and losses",
        "Ideal for underperforming setups",
        "Clear roadmap for scaling and growth",
      ],
      bgImage: farm,
    },
  };

  const content = SERVICE_CONTENT[activeService];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${content.bgImage})`,
          }}
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
            {/* LEFT - SERVICE LIST */}
            <div className="space-y-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 lg:p-8 border border-white/60">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                Our Services
              </h3>
              {services.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveService(item.id)}
                  className={cn(
                    "group w-full text-left rounded-xl px-5 py-3 transition-all duration-300",
                    activeService === item.id
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                      : "bg-white/70 backdrop-blur-md hover:bg-white/90 border border-white/40 shadow-md"
                  )}
                >
                  <h4 className="font-bold text-base mb-1 flex items-center justify-between">
                    {item.title}
                    {activeService === item.id && (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </h4>
                  <p
                    className={cn(
                      "text-xs",
                      activeService === item.id
                        ? "text-white/90"
                        : "text-foreground/70"
                    )}
                  >
                    {item.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* RIGHT - CONTENT */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 lg:p-8 border border-white/60">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                {content.heading}
              </h2>

              <p className="text-base text-foreground/90 max-w-2xl mb-6">
                {content.description}
              </p>

              {/* FEATURES */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Sun className="w-5 h-5 text-green-600" />
                  What We Offer
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {content.features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={i}
                        className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-3">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-bold text-foreground text-sm mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BENEFITS */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-5 text-white mb-6 shadow-lg">
                <h4 className="font-bold text-base mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  What You'll Get
                </h4>
                <ul className="space-y-2">
                  {content.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {content.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
