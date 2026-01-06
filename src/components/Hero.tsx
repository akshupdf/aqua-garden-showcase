import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hydro.mp4";

const Hero = () => {
  return (
    <section className=" min-h-screen flex items-center justify-center  ">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="container backdrop-blur-xl rounded-xl p-6 relative z-10 bg-white/50 w-fit">
        <div className="max-w-3xl animate-fade-in-up">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-foreground text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Grow Fresh,
            <span className="text-primary block">Grow Green</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-center mx-auto">
            Keeping your hydroponic garden fresh, balanced, and worry-free
            that’s our specialty.
          </p>
          <div className="flex flex-wrap gap-4 mx-auto justify-center">
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
