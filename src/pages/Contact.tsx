import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import contact_bg from "../assets/contact_bg.png";

const Contact = () => {
  return (
    <Layout>
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <img
            src={contact_bg}
            alt="Contact Background"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Dark overlay on left side for text visibility */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        </div>

        {/* Main Content - Full Height Flex Container */}
        <div className="h-full flex">
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col  mt-8 px-6 lg:px-12  ">
            <div className="max-w-xl space-y-2">
              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white">
                  Grow Fresh.
                  <span className="text-green-400">Live Better.</span>
                </h1>

                <p className="text-base lg:text-lg text-gray-100 leading-relaxed max-w-lg">
                  Custom hydroponic solutions for your home, balcony, terrace,
                  or commercial farming space.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center shrink-0">
                    <span className="text-xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Custom Hydroponic Setups
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Tailored hydroponic systems designed for your space and
                      needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center shrink-0">
                    <span className="text-xl">🛠️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      AMC & Maintenance
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Hassle-free maintenance and guidance for healthy plant
                      growth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center shrink-0">
                    <span className="text-xl">🏡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Balcony & Terrace Farming
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Grow fresh vegetables right at your home with modern
                      systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="pt-4">
                <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Akshay Pednekar
                      </h4>
                      <p className="text-base text-gray-700 mt-1">
                        +91 91526 78498
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Anoop Pathak
                      </h4>
                      <p className="text-base text-gray-700 mt-1">
                        +91 93202 22449
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <p className="text-sm text-gray-700 break-all">
                        asquarehydro@gmail.com
                      </p>
                      <p className="text-sm text-gray-700 break-all">
                        www.asquarehydroponics.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 py-8">
            <div className="w-full max-w-xl">
              <ContactForm showTitle={false} whatsappNumber="919152678498" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
