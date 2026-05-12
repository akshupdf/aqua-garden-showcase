import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hydro.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-400/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>Premier Hydroponic Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white animate-fade-in-up leading-tight">
            Grow Fresh,
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent block">
              Grow Green
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Keeping your hydroponic garden fresh, balanced, and worry-free —
            that's our specialty. Transform your space with our expert AMC
            services.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                20+
              </div>
              <div className="text-sm text-white/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                30+
              </div>
              <div className="text-sm text-white/80">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                3+
              </div>
              <div className="text-sm text-white/80">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
