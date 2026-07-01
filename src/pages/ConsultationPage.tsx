import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, AlertCircle, ChevronDown, Calendar, Clock, Video, Award, TrendingUp, BarChart2, Cpu, DollarSign, CalendarDays } from "lucide-react";
import { emailService } from "../services/emailService";

interface ConsultationPageProps {
  onNavigate: (path: string) => void;
}

export function ConsultationPage({ onNavigate }: ConsultationPageProps) {
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    industry: "",
    website: "",
    mode: "",
    date: "",
    time: "",
    message: "",
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState<"success" | "error" | null>(null);

  // Dropdowns
  const [industryOpen, setIndustryOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);

  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const modeDropdownRef = useRef<HTMLDivElement>(null);

  const industriesList = [
    "Technology & SaaS",
    "E-commerce & Retail",
    "Healthcare & Medical",
    "Real Estate & Construction",
    "Finance & Banking",
    "Education & E-learning",
    "Food & Beverage / Restaurant",
    "Professional Services",
    "Manufacturing & Logistics",
    "Entertainment & Media",
    "Other",
  ];

  const modesList = [
    "Google Meet",
    "Zoom",
    "Phone Call",
    "WhatsApp Call",
  ];

  const benefits = [
    { icon: Video, title: "30-Minute Free Strategy Call", desc: "One-on-one session to deep dive into your business challenges." },
    { icon: TrendingUp, title: "Business Growth Roadmap", desc: "Tailored action plan outlining growth vectors and deliverables." },
    { icon: BarChart2, title: "Website & Marketing Audit", desc: "A critical review of your existing channels and performance." },
    { icon: Cpu, title: "Technology Consultation", desc: "Expert stack selection advice to build robust scalability." },
    { icon: DollarSign, title: "Cost Estimation", desc: "Transparent breakdown of budgets and potential optimizations." },
    { icon: CalendarDays, title: "Project Timeline", desc: "Milestone-driven schedule outlining realistic deadlines." },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target as Node)) {
        setIndustryOpen(false);
      }
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target as Node)) {
        setModeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
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

    if (!formData.industry) {
      newErrors.industry = "Please select your industry";
    }

    if (!formData.mode) {
      newErrors.mode = "Please choose a consultation mode";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const success = await emailService.sendConsultationBooking(formData);
      if (success) {
        setShowPopup("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessName: "",
          businessType: "",
          industry: "",
          website: "",
          mode: "",
          date: "",
          time: "",
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
        <div className="absolute -top-40 right-0 w-96 h-96 bg-[#C6FF00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-violet-600/10 rounded-full blur-[140px]" />
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

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#C6FF00]/10 text-[#C6FF00] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#C6FF00]/20"
          >
            <Award size={14} /> Free Consultation Offer
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase leading-none"
          >
            Book Your <span className="text-[#C6FF00]">FREE</span> Business Consultation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-8"
          >
            Get expert guidance on your website, branding, digital marketing, AI automation, or software development absolutely FREE.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={scrollToForm}
            className="btn-neon !w-auto px-8"
          >
            Book Free Consultation
          </motion.button>
        </div>

        {/* Consultation Benefits */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold uppercase tracking-wider">What You Get In This Consultation</h2>
            <div className="w-16 h-1 bg-[#C6FF00] mx-auto mt-3" />
          </div>
          <div className="benefit-grid">
            {benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="benefit-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C6FF00]/10 flex items-center justify-center text-[#C6FF00] mb-2">
                    <IconComp size={20} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Booking Form Card */}
        <div ref={formRef} className="max-w-4xl mx-auto scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="form-card"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black uppercase">Schedule Your Slot</h2>
              <p className="text-white/60 text-sm mt-1">Please select your preferred timing and tell us about your business</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone */}
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

                {/* Business Name */}
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Business Type */}
                <div className="form-group">
                  <label className="form-label">Business Type</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    placeholder="e.g. Private Limited, Startup, Sole Proprietorship"
                  />
                </div>

                {/* Industry Custom Dropdown */}
                <div className="form-group" ref={industryDropdownRef}>
                  <label className="form-label">Industry *</label>
                  <div className="custom-select-container">
                    <div
                      onClick={() => setIndustryOpen(!industryOpen)}
                      className={`custom-select-trigger ${industryOpen ? "active" : ""}`}
                    >
                      <span className={formData.industry ? "text-white" : "text-white/40"}>
                        {formData.industry || "Select your industry"}
                      </span>
                      <ChevronDown size={18} className={`transform transition-transform ${industryOpen ? "rotate-180" : ""}`} />
                    </div>
                    <AnimatePresence>
                      {industryOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="custom-select-options"
                        >
                          {industriesList.map((item) => (
                            <div
                              key={item}
                              onClick={() => {
                                setFormData({ ...formData, industry: item });
                                setIndustryOpen(false);
                              }}
                              className={`custom-select-option ${formData.industry === item ? "selected" : ""}`}
                            >
                              {item}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.industry && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.industry}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Current Website */}
                <div className="form-group">
                  <label className="form-label">Current Website URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="e.g. www.example.com (optional)"
                  />
                </div>

                {/* Consultation Mode Dropdown */}
                <div className="form-group" ref={modeDropdownRef}>
                  <label className="form-label">Preferred Consultation Mode *</label>
                  <div className="custom-select-container">
                    <div
                      onClick={() => setModeOpen(!modeOpen)}
                      className={`custom-select-trigger ${modeOpen ? "active" : ""}`}
                    >
                      <span className={formData.mode ? "text-white" : "text-white/40"}>
                        {formData.mode || "Choose meeting mode"}
                      </span>
                      <ChevronDown size={18} className={`transform transition-transform ${modeOpen ? "rotate-180" : ""}`} />
                    </div>
                    <AnimatePresence>
                      {modeOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="custom-select-options"
                        >
                          {modesList.map((item) => (
                            <div
                              key={item}
                              onClick={() => {
                                setFormData({ ...formData, mode: item });
                                setModeOpen(false);
                              }}
                              className={`custom-select-option ${formData.mode === item ? "selected" : ""}`}
                            >
                              {item}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.mode && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.mode}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date Picker */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-1.5"><Calendar size={14} /> Preferred Date *</label>
                  <input
                    type="date"
                    className="form-input text-white/80"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.date && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.date}
                    </span>
                  )}
                </div>

                {/* Time Picker */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-1.5"><Clock size={14} /> Preferred Time Slot *</label>
                  <input
                    type="time"
                    className="form-input text-white/80"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                  {errors.time && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.time}
                    </span>
                  )}
                </div>
              </div>

              {/* Message / Description */}
              <div className="form-group">
                <label className="form-label">Tell us about your business</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief overview of your business goals and key challenges..."
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-neon mt-4">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Confirming Slot...
                  </span>
                ) : (
                  "Book Free Consultation"
                )}
              </button>
            </form>
          </motion.div>
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
                  <h2 className="popup-title">Your Free Consultation is Confirmed!</h2>
                  <p className="popup-text">
                    Thank you for booking. We have sent a confirmation email to you. Our team will contact you shortly to confirm the scheduled appointment.
                  </p>
                </>
              ) : (
                <>
                  <div className="popup-icon-wrapper error">
                    <AlertCircle size={32} />
                  </div>
                  <h2 className="popup-title">Booking Failed</h2>
                  <p className="popup-text">
                    Something went wrong. Please check your internet connection or email us directly at sssolution163@gmail.com.
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
