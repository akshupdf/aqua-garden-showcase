import Navbar from "@/components/Navbar";
import { Sprout, Users, Award, Heart, Target, Leaf } from "lucide-react";

const values = [
  {
    icon: Sprout,
    title: "Sustainable Growth",
    description:
      "We believe in eco-friendly solutions that minimize water usage and maximize yield.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your success is our success. We provide hands-on support every step of the way.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "Premium NFT systems designed for optimal plant growth and longevity.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Fresh, pesticide-free produce for healthier living.",
  },
];

const stats = [
  { value: "500+", label: "Happy Clients", icon: Users },
  { value: "50+", label: "Projects Completed", icon: Award },
  { value: "3+", label: "Years Experience", icon: Leaf },
  { value: "100%", label: "Client Satisfaction", icon: Heart },
];

const About = () => {
  return (
    <main className="min-h-screen relative">
      {/* Fullscreen Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute inset-0 bg-[url(‘data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMmM1NWUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuMTA1IDAgMi0uODk1IDItMnMtLjg5NS0yLTItMi0yIC44OTUtMiAyIC44OTUgMiAyIDJ6bTAgMThjMS4xMDUgMCAyLS44OTUgMi0ycy0uODk1LTItMi0yLTIgLjg5NS0yIDIgLjg5NSAyIDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==’)] opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Navbar />

      <section className="pt-32 pb-24 relative">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              <span>Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              About Asquare Hydroponics
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Engineering innovation meets modern farming passion. Transforming
              spaces, one harvest at a time.
            </p>
          </div>

          {/* About Content */}
          <div className="max-w-4xl mx-auto mb-20 animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Our Story
                </h2>
              </div>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-green-600 first-letter:float-left first-letter:mr-3">
                  Founded in 2022 by engineers{" "}
                  <strong className="text-green-700">Anoop Pathak</strong> and{" "}
                  <strong className="text-green-700">Akshay Pednekar</strong> ,
                  A² Hydroponics was born from a shared passion for transforming
                  how people grow food.
                </p>
                <p>
                  What began as a curiosity for sustainable farming has evolved
                  into a mission — bringing modern hydroponic systems to homes,
                  cafés, and businesses across the city. We believe that fresh,
                  pesticide-free produce should be accessible to everyone.
                </p>
                <p>
                  We specialize in{" "}
                  <strong className="text-green-700">
                    AMC (Annual Maintenance Contracts)
                  </strong>{" "}
                  for hydroponic setups, ensuring that every installation
                  continues to flourish year-round with minimal effort from you.
                </p>
                <p>
                  At A² Hydroponics, we combine engineering precision with
                  nature’s rhythm — creating reliable, efficient, and aesthetic
                  systems that make indoor farming easy, beautiful, and
                  sustainable.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-5xl mx-auto mb-20 animate-fade-in-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Values Section */}
          <div>
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {value.title}
                    </h3>
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
