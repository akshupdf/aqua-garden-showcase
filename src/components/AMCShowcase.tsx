"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Leaf, Droplets, Sun } from "lucide-react";
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
    <section className="   ">
      <div
        className="container mx-auto p-6"
        style={{
          backgroundImage: `url(${content.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid md:grid-cols-[30%_70%] gap-14 items-start">
            {/* LEFT – SERVICE LIST */}
            <div className="space-y-3">
              {services.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveService(item.id)}
                  className={cn(
                    "group w-full text-left rounded-xl px-5 py-4 transition-all duration-300",
                    "border border-transparent",
                    activeService === item.id
                      ? "bg-primary/10 border-primary shadow-md scale-[1.02]"
                      : "hover:bg-muted/60 hover:translate-x-1"
                  )}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <h4 className="font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* RIGHT – CONTENT */}
            <div className="animate-fade-in space-y-8">
              <h2
                className="text-4xl md:text-5xl font-bold text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {content.heading}
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl">
                {content.description}
              </p>

              {/* FEATURES */}
              <div className="space-y-6">
                <div className="space-y-6">
                  {content.features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BENEFITS */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h4 className="font-semibold mb-4">What You’ll Get</h4>
                <ul className="space-y-3">
                  {content.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <Link to="/contact">
                <Button size="lg">Request AMC Service</Button>
              </Link> */}

              {/* IMAGE */}
              {/* <div className="rounded-2xl overflow-hidden shadow-[var(--card-hover-shadow)]">
              <img
                src={amcImage}
                alt="AMC Service"
                className="w-full h-[360px] object-cover"
              />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
