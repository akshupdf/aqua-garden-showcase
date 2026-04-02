import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import vcard from "../assets/vcard.png";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen relative">
      {/* Fullscreen Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMmM1NWUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuMTA1IDAgMi0uODk1IDItMnMtLjg5NS0yLTItMi0yIC44OTUtMiAyIC44OTUgMiAyIDJ6bTAgMThjMS4xMDUgMCAyLS44OTUgMi0ycy0uODk1LTItMi0yLTIgLjg5NS0yIDIgLjg5NSAyIDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>

      <Navbar />

      <section className="pt-32 pb-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your hydroponic journey? We're here to help you
              every step of the way.
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground">info@asquarehydroponics.com</p>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Working Hours</h3>
                <p className="text-sm text-muted-foreground">Mon - Sat: 9AM - 6PM</p>
              </div>
            </Card>
          </div>

          {/* VCard Image */}
          <div className="mb-12 animate-scale-in">
            <img
              src={vcard}
              alt="Contact Card"
              className="rounded-2xl shadow-2xl mx-auto max-w-lg w-full hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto p-8 md:p-12 border-0 shadow-2xl bg-white/90 backdrop-blur-sm animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your hydroponic needs..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Contact;
