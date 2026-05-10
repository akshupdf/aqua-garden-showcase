import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormProps {
  title?: string;
  description?: string;
  whatsappNumber?: string;
  showTitle?: boolean;
}

const ContactForm = ({
  title = "Get In Touch",
  description = "Ready to start your hydroponic journey? Send us a message!",
  whatsappNumber = "919152678498",
  showTitle = true,
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the message for WhatsApp
    const whatsappMessage = `
🌱 *New Enquiry from ASquare Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || "Not provided"}

*Message:*
${formData.message}

---
Sent from ASquare Hydroponics Website
    `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");

    toast.success("Opening WhatsApp to send your message!");

    // Reset form
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
    <Card className="p-8 md:p-12 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
      {showTitle && (
        <>
          <h2 className="text-3xl font-bold mb-2 text-foreground">{title}</h2>
          {description && (
            <p className="text-muted-foreground mb-6">{description}</p>
          )}
        </>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Name *
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
              Email *
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
            Phone Number
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
            Message *
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
          Send via WhatsApp
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          This will open WhatsApp with your message ready to send
        </p>
      </form>
    </Card>
  );
};

export default ContactForm;
