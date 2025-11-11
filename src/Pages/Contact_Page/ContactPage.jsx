import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

// ---------------------- MAIN CONTACT PAGE COMPONENT ----------------------
export default function ContactPage({ dark = true }) {
  const pageRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  // Color scheme
  const bgColor = dark
    ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
    : "bg-gradient-to-br from-gray-50 via-white to-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const secondaryText = dark ? "text-gray-400" : "text-gray-600";
  const cardBg = dark
    ? "bg-gray-900/60  border-gray-800"
    : "bg-white/60  border-gray-200";
  const inputBg = dark ? "bg-gray-800/50" : "bg-gray-50";
  const inputBorder = dark ? "border-gray-700" : "border-gray-300";
  const accentColor = "from-blue-600 via-purple-600 to-pink-600";

  // Entrance Animation
  useEffect(() => {
    if (pageRef.current) {
      gsap.from(pageRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      ref={pageRef}
      className={`relative w-screen min-h-screen ${bgColor} transition-all duration-500 overflow-x-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <span
                className={`text-xs sm:text-sm font-semibold uppercase tracking-widest bg-linear-to-r ${accentColor} bg-clip-text text-transparent`}
              >
                Get In Touch
              </span>
            </div>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black ${textColor} mb-4 sm:mb-6 leading-tight`}
            >
              Let's Build Something
              <br className="hidden sm:block" /> Amazing Together
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${secondaryText} leading-relaxed`}
            >
              Have a project in mind? Want to collaborate? Or just curious about
              what we're building? Reach out and let's create something
              incredible together.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto">
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
              
              <InfoCard
                icon={FiMail}
                title="Email"
                value="hello@codeshack.dev"
                description="Send us an email"
                dark={dark}
              />
              <InfoCard
                icon={FiPhone}
                title="Phone"
                value="+91 9876 543 210"
                description="Let's talk"
                dark={dark}
              />
              <InfoCard
                icon={FiMapPin}
                title="Location"
                value="India"
                description="Based & Operating"
                dark={dark}
              />
            </div> */}

            {/* Main Form Section */}
            <div
              className={`${cardBg} border rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl`}
            >
              <h2
                className={`text-2xl sm:text-3xl font-bold ${textColor} mb-8`}
              >
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    placeholder="Name"
                    type="text"
                    dark={dark}
                    inputBg={inputBg}
                    inputBorder={inputBorder}
                  />
                  <FormInput
                    label="Email Address"
                    placeholder="email"
                    type="email"
                    dark={dark}
                    inputBg={inputBg}
                    inputBorder={inputBorder}
                  />
                </div>

                <FormInput
                  label="Subject"
                  placeholder="What's this about?"
                  type="text"
                  dark={dark}
                  inputBg={inputBg}
                  inputBorder={inputBorder}
                />

                <FormTextArea
                  label="Message"
                  placeholder="Tell us about your idea, project, or just say hello..."
                  dark={dark}
                  inputBg={inputBg}
                  inputBorder={inputBorder}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className={`flex-1 py-3 sm:py-4 px-6 rounded-lg font-semibold text-white text-base sm:text-lg
                      bg-linear-to-r ${accentColor} hover:shadow-2xl hover:scale-105
                      transition-all duration-300 flex items-center justify-center gap-2
                      ${submitted ? "opacity-75" : ""}`}
                  >
                    <FiSend size={20} />
                    {submitted ? "Message Sent!" : "Send Message"}
                  </button>
                  <button
                    type="reset"
                    className={`py-3 sm:py-4 px-6 rounded-lg font-semibold
                      ${
                        dark
                          ? "bg-gray-800 hover:bg-gray-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }
                      transition-colors duration-300`}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- SUB-COMPONENTS ----------------------

function InfoCard({ icon: Icon, title, value, description, dark }) {
  const bgColor = dark
    ? "bg-gray-900/80 border-gray-800"
    : "bg-white/80 border-gray-200";
  const textColor = dark ? "text-white" : "text-gray-900";
  const secondaryText = dark ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`${bgColor} border rounded-xl p-6 md:p-8 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
    >
      <div className="flex items-start gap-4 mb-3">
        <div className="p-3 rounded-lg bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
          {Icon && <Icon size={24} className="text-white" />}
        </div>
        <div className="flex-1">
          <h3
            className={`text-sm font-semibold uppercase tracking-wider ${secondaryText}`}
          >
            {title}
          </h3>
          <p className={`text-xl md:text-2xl font-bold ${textColor} mt-1`}>
            {value}
          </p>
        </div>
      </div>
      <p className={`text-sm ${secondaryText}`}>{description}</p>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
  dark,
  inputBg,
  inputBorder,
}) {
  const labelColor = dark ? "text-gray-300" : "text-gray-700";
  const textColor = dark ? "text-white" : "text-gray-900";
  const placeholderColor = dark
    ? "placeholder:text-gray-600"
    : "placeholder:text-gray-400";

  return (
    <div className="flex flex-col space-y-2">
      <label className={`text-sm font-semibold ${labelColor}`}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border ${inputBg} ${inputBorder} ${textColor} ${placeholderColor}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200`}
      />
    </div>
  );
}

function FormTextArea({ label, placeholder, dark, inputBg, inputBorder }) {
  const labelColor = dark ? "text-gray-300" : "text-gray-700";
  const textColor = dark ? "text-white" : "text-gray-900";
  const placeholderColor = dark
    ? "placeholder:text-gray-600"
    : "placeholder:text-gray-400";

  return (
    <div className="flex flex-col space-y-2">
      <label className={`text-sm font-semibold ${labelColor}`}>{label}</label>
      <textarea
        placeholder={placeholder}
        rows="6"
        className={`w-full px-4 py-3 rounded-lg border ${inputBg} ${inputBorder} ${textColor} ${placeholderColor}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 resize-vertical`}
      />
    </div>
  );
}
