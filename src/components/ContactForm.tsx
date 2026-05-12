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
    <Card className="p-8 md:p-10 rounded-3xl border-0 shadow-2xl bg-white">
      {showTitle && (
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {title}
          </h2>
          {description && (
            <p className="text-lg leading-relaxed text-gray-700 mb-8 max-w-xl">
              {description}
            </p>
          )}
        </>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
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
              className="transition-all duration-300 focus:ring-2 focus:ring-green-500 rounded-xl"
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
              className="transition-all duration-300 focus:ring-2 focus:ring-green-500 rounded-xl"
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
            className="transition-all duration-300 focus:ring-2 focus:ring-green-500 rounded-xl"
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
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="transition-all duration-300 focus:ring-2 focus:ring-green-500 rounded-xl"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] rounded-xl"
        >
          Send via WhatsApp
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;