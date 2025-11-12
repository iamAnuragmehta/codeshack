import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

// Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyzlyazj";

export default function ContactPage({ dark = true }) {
  const pageRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const bgColor = dark
    ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
    : "bg-gradient-to-br from-gray-50 via-white to-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const secondaryText = dark ? "text-gray-400" : "text-gray-600";
  const cardBg = dark
    ? "bg-gray-900/60 border-gray-800"
    : "bg-white/60 border-gray-200";
  const inputBg = dark ? "bg-gray-800/50" : "bg-gray-50";
  const inputBorder = dark ? "border-gray-700" : "border-gray-300";
  const accentColor = "from-blue-600 via-purple-600 to-pink-600";

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setError("");
    setSubmitted(false);
  };

  return (
    <section id="contact-section">
      <div
        ref={pageRef}
        className={`relative w-screen min-h-screen ${bgColor} transition-all duration-500`}
      >
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10">
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
                Have a project in mind? Want to collaborate? Or just curious
                about what we're building? Reach out and let's create something
                incredible together.
              </p>
            </div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 md:pb-32">
            <div className="max-w-6xl mx-auto">
              <div
                className={`${cardBg} border rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl`}
              >
                <h2
                  className={`text-2xl sm:text-3xl font-bold ${textColor} mb-8`}
                >
                  Send us a Message
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
                    {error}
                  </div>
                )}

                {submitted && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Full Name"
                      placeholder="John Doe"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      dark={dark}
                      inputBg={inputBg}
                      inputBorder={inputBorder}
                    />
                    <FormInput
                      label="Email Address"
                      placeholder="john@example.com"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      dark={dark}
                      inputBg={inputBg}
                      inputBorder={inputBorder}
                    />
                  </div>

                  <FormInput
                    label="Subject"
                    placeholder="What's this about?"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    dark={dark}
                    inputBg={inputBg}
                    inputBorder={inputBorder}
                  />

                  <FormTextArea
                    label="Message"
                    placeholder="Tell us about your idea, project, or just say hello..."
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    dark={dark}
                    inputBg={inputBg}
                    inputBorder={inputBorder}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={loading || submitted}
                      className={`flex-1 py-3 sm:py-4 px-6 rounded-lg font-semibold text-white text-base sm:text-lg
                      bg-linear-to-r ${accentColor} hover:shadow-2xl hover:scale-105
                      transition-all duration-300 flex items-center justify-center gap-2
                      ${
                        loading || submitted
                          ? "opacity-75 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <FiSend size={20} />
                      {loading
                        ? "Sending..."
                        : submitted
                        ? "Message Sent!"
                        : "Send Message"}
                    </button>
                    <button
                      onClick={handleReset}
                      disabled={loading}
                      className={`py-3 sm:py-4 px-6 rounded-lg font-semibold
                      ${
                        dark
                          ? "bg-gray-800 hover:bg-gray-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }
                      transition-colors duration-300 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
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
      <label className={`text-sm font-semibold ${labelColor}`}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border ${inputBg} ${inputBorder} ${textColor} ${placeholderColor}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200`}
      />
    </div>
  );
}

function FormTextArea({
  label,
  placeholder,
  name,
  value,
  onChange,
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
      <label className={`text-sm font-semibold ${labelColor}`}>
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="6"
        className={`w-full px-4 py-3 rounded-lg border ${inputBg} ${inputBorder} ${textColor} ${placeholderColor}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 resize-vertical`}
      />
    </div>
  );
}
