import { useEffect } from "react";
import { ArrowLeft, ShieldCheck, Scale, FileText, Lock, Users, AlertCircle, HelpCircle } from "lucide-react";

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  useEffect(() => {
    document.title = "Terms & Conditions - SS Solution";
    window.scrollTo({ top: 0 });
    return () => {
      document.title = "SS Solution - Luxury Digital Growth Studio";
    };
  }, []);

  const sections = [
    {
      id: "acceptance",
      icon: ShieldCheck,
      title: "1. Acceptance of Terms",
      content: "By accessing or using the services provided by SS Solution (\"Company\", \"we\", \"us\", or \"our\"), including our website and marketing packages, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
    },
    {
      id: "services",
      icon: FileText,
      title: "2. Scope of Services",
      content: "SS Solution provides creative digital marketing services, including but not limited to Website Design & Development, Brand Identity Design, SEO Optimization, Google Ads Management, Meta Ads Management, Social Media Management, Graphic Design, Video Editing, AI Automation, and Business Consulting. The specific scope, timeline, deliverables, and fees for any project will be outlined in a separate Statement of Work (SOW) or Service Agreement."
    },
    {
      id: "payments",
      icon: Scale,
      title: "3. Payments and Billing",
      content: "Clients agree to pay all fees associated with the chosen services in accordance with the billing terms established in the SOW. Project initiation typically requires an upfront deposit (e.g., 50%). All ongoing marketing retainers are billed monthly in advance. SS Solution reserves the right to suspend or terminate services if payments are not received by their respective due dates."
    },
    {
      id: "intellectual-property",
      icon: Lock,
      title: "4. Intellectual Property Rights",
      content: "Unless otherwise specified in a signed agreement, all original work products, code, graphics, and strategies developed by SS Solution remain our property until full payment is received. Upon receipt of full and final payment, the client is granted a perpetual, non-exclusive, non-transferable license to use the final deliverables for their intended business purpose. SS Solution retains the right to showcase the completed work in its portfolios, case studies, and marketing materials."
    },
    {
      id: "client-obligations",
      icon: Users,
      title: "5. Client Responsibilities",
      content: "To deliver services effectively, we rely on the timely receipt of feedback, assets, login details, and approvals from the client. Delays in providing required inputs may result in project delays or scheduling adjustments. Clients warrant that all materials provided to SS Solution do not infringe upon any third-party intellectual property or privacy rights."
    },
    {
      id: "liability",
      icon: AlertCircle,
      title: "6. Limitation of Liability",
      content: "SS Solution strives to deliver exceptional marketing results. However, we cannot guarantee specific sales volumes, conversion rates, or keyword rankings as search engine algorithms and market dynamics are subject to change. Under no circumstances shall SS Solution be liable for any indirect, incidental, special, or consequential damages, including loss of profits, revenue, data, or business, arising out of the use of our services."
    },
    {
      id: "termination",
      icon: HelpCircle,
      title: "7. Term and Termination",
      content: "Either party may terminate a project agreement for convenience by providing thirty (30) days' written notice, subject to payment for all work performed and costs incurred up to the date of termination. Recurring retainer agreements may have minimum contract lengths, which will be defined in the individual service contract."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("/")}
          className="mb-8 flex items-center gap-2 text-white/60 hover:text-[#00D4FF] transition-all duration-300 group cursor-pointer"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold uppercase tracking-wider text-xs">Back to Home</span>
        </button>

        {/* Hero Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Legal Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-[#00D4FF] to-purple-500 bg-clip-text text-transparent">
            TERMS & CONDITIONS
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-2xl">
            Last Updated: July 18, 2026. Please read these terms carefully before engaging with SS Solution's digital growth and marketing services.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Quick Navigation Sidebar */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 h-fit space-y-3">
            <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider px-3 mb-4">
              Quick Nav
            </h3>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                className="block px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-[#00D4FF] hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
              >
                {section.title.split(". ")[1]}
              </a>
            ))}
          </div>

          {/* Main Terms Content */}
          <div className="lg:col-span-3 space-y-8">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00D4FF]/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-[#00D4FF]/20 text-[#00D4FF]">
                      <IconComponent size={20} />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold tracking-wide text-white/90">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              );
            })}

            {/* Note Panel */}
            <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
              <h3 className="text-purple-400 font-bold mb-2 text-sm uppercase tracking-wider">
                Need Clarification?
              </h3>
              <p className="text-white/60 text-sm">
                If you have any questions or require custom terms for your specific agency collaboration, please feel free to reach out to us at{" "}
                <a href="mailto:sssolution163@gmail.com" className="text-[#00D4FF] hover:underline">
                  sssolution163@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
