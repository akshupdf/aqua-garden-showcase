import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hydro.mp4";

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full h-screen h-[100dvh] min-h-[520px] max-h-[1080px] flex flex-col justify-between items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-3 sm:pb-5">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Subtle floating background blurs */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-green-400/15 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-emerald-400/15 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content - Centered vertically & horizontally */}
      <div className="container relative z-10 my-auto max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md text-white px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-2.5 sm:mb-3.5 border border-white/20 shadow-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-green-400" />
          <span>Premier Hydroponic Solutions</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-white animate-fade-in-up tracking-tight leading-[1.1]">
          Grow Fresh,{" "}
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Grow Green
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xs sm:text-sm md:text-base text-white/90 mb-3.5 sm:mb-5 max-w-xl mx-auto animate-fade-in-up leading-relaxed"
          style={{ animationDelay: "0.15s" }}
        >
          Keeping your hydroponic garden fresh, balanced, and worry-free.
          Transform your space with our state-of-the-art systems and expert AMC services.
        </p>

        {/* Call to Actions */}
        <div
          className="flex flex-wrap gap-2.5 sm:gap-3.5 justify-center animate-fade-in-up w-full"
          style={{ animationDelay: "0.3s" }}
        >
          <Link to="/contact">
            <Button
              size="default"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm md:text-base shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 rounded-xl h-auto"
            >
              Get Started Today
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button
              size="default"
              variant="outline"
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50 font-semibold px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 rounded-xl h-auto"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Live Metrics / Stats Banner */}
        <div
          className="mt-3.5 sm:mt-5 md:mt-6 grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-md md:max-w-xl mx-auto py-2 sm:py-2.5 px-3.5 sm:px-6 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 shadow-xl animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <div className="text-center">
            <div className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-0.5">
              20+
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 font-medium">
              Happy Clients
            </div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-0.5">
              30+
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 font-medium">
              Live Projects
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-0.5">
              3+
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 font-medium">
              Years Exp.
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <button
        onClick={scrollToContent}
        className="relative z-10 hidden sm:flex flex-col items-center text-white/60 hover:text-white transition cursor-pointer mt-1 group"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-widest uppercase mb-1 font-medium group-hover:text-green-400 transition-colors">
          Explore
        </span>
        <div className="w-4 h-7 border-2 border-white/40 group-hover:border-green-400 rounded-full flex justify-center pt-1 transition-colors">
          <div className="w-1 h-1.5 bg-white/70 group-hover:bg-green-400 rounded-full animate-bounce"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;
