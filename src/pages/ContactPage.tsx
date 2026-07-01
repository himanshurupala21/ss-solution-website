import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Globe, ArrowLeft, Check, AlertCircle, ChevronDown } from "lucide-react";
import { emailService } from "../services/emailService";

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState<"success" | "error" | null>(null);

  // Dropdown States
  const [serviceOpen, setServiceOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const budgetDropdownRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    "Website Development",
    "E-commerce Website",
    "Landing Page",
    "UI/UX Design",
    "SEO Services",
    "Social Media Marketing",
    "Google Ads",
    "Meta Ads",
    "Branding",
    "Graphic Design",
    "Logo Design",
    "AI Automation",
    "ERP / CRM Development",
    "Mobile App Development",
    "Custom Software",
    "Other",
  ];

  const budgetsList = [
    "Under ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹1 Lakh",
    "₹1 Lakh - ₹3 Lakh",
    "₹3 Lakh+",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setServiceOpen(false);
      }
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target as Node)) {
        setBudgetOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form Validation logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Project details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const success = await emailService.sendProjectRequest(formData);
      if (success) {
        setShowPopup("success");
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setShowPopup("error");
      }
    } catch (err) {
      console.error(err);
      setShowPopup("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-8">
      {/* Background radial glares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C6FF00]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2 text-white/60 hover:text-[#C6FF00] transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase"
          >
            Let's Build Something <span className="text-[#C6FF00]">Amazing</span> Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 max-w-2xl text-lg leading-relaxed"
          >
            Tell us about your project. We'll analyze your requirements and contact you within 24 hours with the best solution.
          </motion.p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-6 flex items-start gap-4 hover:border-[#C6FF00]/30 transition-colors"
            >
              <div className="p-3 bg-[#C6FF00]/10 text-[#C6FF00] rounded-lg">
                <Phone size={24} />
              </div>
              <div>
                <span className="text-xs uppercase text-white/40 tracking-wider">Phone</span>
                <h3 className="text-lg font-bold mt-1">9879004729</h3>
                <p className="text-sm text-white/60">Call or WhatsApp</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-6 flex items-start gap-4 hover:border-[#C6FF00]/30 transition-colors"
            >
              <div className="p-3 bg-[#C6FF00]/10 text-[#C6FF00] rounded-lg">
                <Mail size={24} />
              </div>
              <div className="min-w-0">
                <span className="text-xs uppercase text-white/40 tracking-wider">Email</span>
                <h3 className="text-lg font-bold mt-1 truncate">sssolution163@gmail.com</h3>
                <p className="text-sm text-white/60">Official Support</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-6 flex items-start gap-4 hover:border-[#C6FF00]/30 transition-colors"
            >
              <div className="p-3 bg-[#C6FF00]/10 text-[#C6FF00] rounded-lg">
                <Globe size={24} />
              </div>
              <div>
                <span className="text-xs uppercase text-white/40 tracking-wider">Website</span>
                <h3 className="text-lg font-bold mt-1">SS Solution</h3>
                <p className="text-sm text-white/60">Premium Digital Growth</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Form Card */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="form-card"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <span className="form-error">
                        <AlertCircle size={14} /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your email address"
                    />
                    {errors.email && (
                      <span className="form-error">
                        <AlertCircle size={14} /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Phone field */}
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98790 04729"
                    />
                    {errors.phone && (
                      <span className="form-error">
                        <AlertCircle size={14} /> {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Company field */}
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your company name (optional)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Service Custom Dropdown */}
                  <div className="form-group" ref={serviceDropdownRef}>
                    <label className="form-label">What do you need? *</label>
                    <div className="custom-select-container">
                      <div
                        onClick={() => setServiceOpen(!serviceOpen)}
                        className={`custom-select-trigger ${serviceOpen ? "active" : ""}`}
                      >
                        <span className={formData.service ? "text-white" : "text-white/40"}>
                          {formData.service || "Select a service"}
                        </span>
                        <ChevronDown size={18} className={`transform transition-transform ${serviceOpen ? "rotate-180" : ""}`} />
                      </div>
                      <AnimatePresence>
                        {serviceOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="custom-select-options"
                          >
                            {servicesList.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setFormData({ ...formData, service: item });
                                  setServiceOpen(false);
                                }}
                                className={`custom-select-option ${formData.service === item ? "selected" : ""}`}
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {errors.service && (
                      <span className="form-error">
                        <AlertCircle size={14} /> {errors.service}
                      </span>
                    )}
                  </div>

                  {/* Budget Custom Dropdown */}
                  <div className="form-group" ref={budgetDropdownRef}>
                    <label className="form-label">Project Budget</label>
                    <div className="custom-select-container">
                      <div
                        onClick={() => setBudgetOpen(!budgetOpen)}
                        className={`custom-select-trigger ${budgetOpen ? "active" : ""}`}
                      >
                        <span className={formData.budget ? "text-white" : "text-white/40"}>
                          {formData.budget || "Select budget range"}
                        </span>
                        <ChevronDown size={18} className={`transform transition-transform ${budgetOpen ? "rotate-180" : ""}`} />
                      </div>
                      <AnimatePresence>
                        {budgetOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="custom-select-options"
                          >
                            {budgetsList.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setFormData({ ...formData, budget: item });
                                  setBudgetOpen(false);
                                }}
                                className={`custom-select-option ${formData.budget === item ? "selected" : ""}`}
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Project Message */}
                <div className="form-group">
                  <label className="form-label">Project Message *</label>
                  <textarea
                    rows={5}
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your business and project requirements..."
                  />
                  {errors.message && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button type="submit" disabled={isSubmitting} className="btn-neon mt-4">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "SEND PROJECT REQUEST"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success / Error Popup Overlay */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="popup-overlay"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="popup-content"
            >
              {showPopup === "success" ? (
                <>
                  <div className="popup-icon-wrapper success">
                    <Check size={32} />
                  </div>
                  <h2 className="popup-title">Project Request Sent Successfully!</h2>
                  <p className="popup-text">
                    Thank you for reaching out to SS Solution. We'll contact you within 24 hours to discuss your project.
                  </p>
                </>
              ) : (
                <>
                  <div className="popup-icon-wrapper error">
                    <AlertCircle size={32} />
                  </div>
                  <h2 className="popup-title">Submission Failed</h2>
                  <p className="popup-text">
                    Something went wrong while sending your request. Please try again, or email us directly at sssolution163@gmail.com.
                  </p>
                </>
              )}
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowPopup(null)} className="popup-btn">
                  Close
                </button>
                <button onClick={() => onNavigate("/")} className="popup-btn">
                  Back to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
