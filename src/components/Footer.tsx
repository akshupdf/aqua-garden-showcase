import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-muted bg-background  ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 items-start">
          {/* BRAND / MESSAGE */}
          <div>
            <h3
              className="text-xl font-semibold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Grow Smarter with Hydroponics
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              Sustainable, soil-free farming solutions designed for homes,
              rooftops, and urban spaces.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Services</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/services/installation"
                  className="hover:text-primary transition"
                >
                  A–Z Installation
                </Link>
              </li>
              <li>
                <Link
                  to="/services/education"
                  className="hover:text-primary transition"
                >
                  Hydroponics Education
                </Link>
              </li>
              <li>
                <Link
                  to="/services/amc"
                  className="hover:text-primary transition"
                >
                  Annual Maintenance
                </Link>
              </li>
              <li>
                <Link
                  to="/services/consulting"
                  className="hover:text-primary transition"
                >
                  System Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start md:items-end">
            <p className="text-sm text-muted-foreground mb-3">
              Ready to start growing?
            </p>
            <Link to="/contact">
              <Button size="sm">Talk to an Expert</Button>
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 pt-6 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Designed for sustainable urban farming 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}
