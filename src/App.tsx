import { Canvas, useFrame } from "@react-three/fiber";
import {
  Billboard,
  Environment,
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
  Stars,
  Text,
} from "@react-three/drei";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Clapperboard,
  Code2,
  Compass,
  Gem,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  MousePointer2,
  Palette,
  Phone,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles as SparklesIcon,
  Target,
  TrendingUp,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, MouseEvent, ReactNode } from "react";
import type { Group, Mesh } from "three";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiGoogleads, SiMeta } from "react-icons/si";
import { ContactPage } from "./pages/ContactPage";
import { ConsultationPage } from "./pages/ConsultationPage";
import { PortfolioPage } from "./pages/PortfolioPage";

gsap.registerPlugin(ScrollTrigger);

type Icon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

const menuItems = ["About", "Services", "Contact"];

const marqueeItems = [
  "Website Design",
  "Brand Identity",
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Social Media",
  "Content Marketing",
  "Email Marketing",
  "AI Automation",
  "Graphic Design",
  "Video Editing",
  "Reels",
  "Photography",
  "Motion Graphics",
  "Business Growth",
];

const services: Array<{ number: string; title: string; desc: string; icon: Icon }> = [
  { number: "01", title: "Social Media Management", desc: "Premium content calendars, engagement systems and channel growth.", icon: Send },
  { number: "02", title: "Brand Identity Design", desc: "Distinct visual systems with logos, colors, type and brand rules.", icon: Palette },
  { number: "03", title: "Website Design & Development", desc: "Fast, polished websites built to convert attention into action.", icon: Code2 },
  { number: "04", title: "SEO Optimization", desc: "Technical, local and content SEO for compounding search visibility.", icon: Search },
  { number: "05", title: "Google Ads", desc: "High-intent campaigns designed around measurable acquisition.", icon: SiGoogleads as Icon },
  { number: "06", title: "Meta Ads", desc: "Conversion-led funnels across Instagram, Facebook and retargeting.", icon: SiMeta as Icon },
  { number: "07", title: "Graphic Design", desc: "Scroll-stopping creatives for campaigns, launches and brand moments.", icon: WandSparkles },
  { number: "08", title: "Video Editing", desc: "Cinematic edits, reels, explainers and performance-first cuts.", icon: Clapperboard },
  { number: "09", title: "Content Marketing", desc: "Strategic content engines that educate, persuade and build trust.", icon: Megaphone },
  { number: "10", title: "AI Automation", desc: "Smart workflows for leads, support, reporting and business ops.", icon: Bot },
  { number: "11", title: "Business Consulting", desc: "Growth roadmaps, positioning and operating clarity for scaling.", icon: Handshake },
  { number: "12", title: "Lead Generation", desc: "Landing pages, paid funnels and automation that create qualified leads.", icon: Target },
];



const processSteps = ["Discovery", "Research", "Strategy", "Design", "Marketing", "Growth"];

const stats = [
  ["100+", "Projects Completed"],
  ["50+", "Happy Clients"],
  ["95%", "Client Satisfaction"],
  ["24/7", "Support"],
];

const testimonials = [
  {
    name: "Aarav Mehta",
    company: "Nova Retail",
    review: "SS Solution rebuilt our online presence with premium branding and campaigns that brought serious lead quality.",
    gradient: "from-cyan-300 to-violet-500",
  },
  {
    name: "Priya Shah",
    company: "Urban Plate",
    review: "Their social media work finally made our restaurant look as good online as it feels in person.",
    gradient: "from-rose-300 to-violet-500",
  },
  {
    name: "Rahul Desai",
    company: "Prime Estates",
    review: "The paid advertising funnel was sharp, trackable and commercially mature from day one.",
    gradient: "from-cyan-300 to-rose-400",
  },
];

const reasons: Array<{ icon: Icon; text: string }> = [
  { icon: Gem, text: "Luxury-grade creative direction" },
  { icon: ShieldCheck, text: "Reliable execution systems" },
  { icon: Zap, text: "Fast experiments and reporting" },
  { icon: Compass, text: "Strategy before noise" },
];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.9 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (event: globalThis.MouseEvent) => {
      gsap.to(dotRef.current, { x: event.clientX, y: event.clientY, duration: 0.12, ease: "power2.out" });
      gsap.to(ringRef.current, { x: event.clientX, y: event.clientY, duration: 0.42, ease: "power3.out" });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function MagneticButton({ children, variant = "primary", onClick }: { children: ReactNode; variant?: "primary" | "secondary"; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.18, y: y * 0.28, duration: 0.35, ease: "power3.out" });
  };

  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.35)" });

  return (
    <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`magnetic-button ${variant}`} onClick={onClick}>
      {children}
      <ArrowRight size={18} />
    </button>
  );
}

function AnimatedHeading({ kicker, children, light = false }: { kicker?: string; children: ReactNode; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 54, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="section-heading"
    >
      {kicker && <span className={light ? "kicker dark" : "kicker"}>{kicker}</span>}
      <h2 className={light ? "gradient-heading light" : "gradient-heading"}>{children}</h2>
    </motion.div>
  );
}

function AnimatedParagraph({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.08 }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ref.current, { rotateX: -y * 10, rotateY: x * 12, transformPerspective: 900, duration: 0.35 });
  };
  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out" });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}

function HologramLogo() {
  const group = useRef<Group>(null);
  const sphere = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.22 + pointer.x * 0.28;
      group.current.rotation.x = pointer.y * 0.16;
    }
    if (sphere.current) {
      sphere.current.position.y = Math.sin(t * 1.3) * 0.12;
    }
  });

  return (
    <group ref={group} position={[0, 0.78, 0]} scale={1.12}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.55}>
        <mesh ref={sphere}>
          <icosahedronGeometry args={[1.85, 4]} />
          <MeshDistortMaterial color="#7C3AED" distort={0.22} speed={1.4} roughness={0.18} metalness={0.82} />
        </mesh>
        <mesh scale={2.2}>
          <torusGeometry args={[1.1, 0.012, 12, 180]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0, 0.5]} scale={2.7}>
          <torusGeometry args={[1, 0.009, 12, 180]} />
          <meshBasicMaterial color="#FF4D6D" transparent opacity={0.55} />
        </mesh>
      </Float>
      <Billboard position={[0, 0, 1.95]}>
        <Text fontSize={0.44} anchorX="center" anchorY="middle" color="#ffffff" outlineWidth={0.015} outlineColor="#7C3AED">
          SS
        </Text>
      </Billboard>
    </group>
  );
}

function FloatingSymbol({ position, label, color }: { position: [number, number, number]; label: string; color: string }) {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.elapsedTime * 0.22 + position[0];
    mesh.current.rotation.y = clock.elapsedTime * 0.32 + position[1];
  });
  return (
    <Float speed={1.5} floatIntensity={0.9} rotationIntensity={0.35}>
      <group position={position}>
        <mesh ref={mesh}>
          <boxGeometry args={[0.72, 0.72, 0.08]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.22} emissive={color} emissiveIntensity={0.18} />
        </mesh>
        <Billboard position={[0, 0, 0.08]}>
          <Text fontSize={0.12} anchorX="center" anchorY="middle" color="#ffffff">
            {label}
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function DigitalMesh() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.04;
    ref.current.rotation.x = -0.9 + pointer.y * 0.08;
    ref.current.rotation.y = pointer.x * 0.12;
  });
  return (
    <mesh ref={ref} position={[0, -0.2, -1.8]} scale={[5.8, 5.8, 1]}>
      <torusKnotGeometry args={[1.25, 0.012, 240, 16]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.38} />
    </mesh>
  );
}

function ParticleBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={4} color="#00D4FF" />
      <pointLight position={[-3, -2, 3]} intensity={2.8} color="#FF4D6D" />
      <pointLight position={[0, 3, 2]} intensity={2.2} color="#7C3AED" />
      <Stars radius={80} depth={34} count={1400} factor={3.2} fade speed={0.8} />
      <Sparkles count={92} scale={8} size={2.8} speed={0.35} color="#ffffff" />
      <DigitalMesh />
      <HologramLogo />
      <FloatingSymbol position={[3, 1.7, 0]} label="SEO" color="#00D4FF" />
      <FloatingSymbol position={[-3.1, 1.1, -0.2]} label="META" color="#7C3AED" />
      <FloatingSymbol position={[2.8, -1.65, 0.35]} label="ADS" color="#FF4D6D" />
      <FloatingSymbol position={[-2.75, -1.75, 0.25]} label="AI" color="#ffffff" />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

function FloatingObjects() {
  const items = [
    { icon: Rocket, label: "Launch", className: "top-12 left-8" },
    { icon: TrendingUp, label: "Growth", className: "top-28 right-12" },
    { icon: Globe2, label: "Global", className: "bottom-16 left-16" },
    { icon: BrainCircuit, label: "AI", className: "bottom-8 right-24" },
    { icon: Target, label: "Target", className: "top-1/2 left-1/3" },
  ];

  return (
    <div className="floating-objects" aria-hidden="true">
      {items.map((item, index) => {
        const IconComp = item.icon;
        return (
          <motion.div
            key={item.label}
            className={`floating-object ${item.className}`}
            animate={{ y: [0, -18, 0], rotate: [0, 6, -4, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconComp size={22} />
          </motion.div>
        );
      })}
    </div>
  );
}

function Navbar({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <a href="/" onClick={(e) => { e.preventDefault(); onNavigate("/"); }} className="nav-logo flex items-center">
        <img src="/logo.png" alt="SS Solution" className="h-24 md:h-28 w-auto object-contain" />
      </a>
      <nav className="nav-links">
        {menuItems.map((item) => (
          <a key={item} href={item === "Contact" ? "/contact" : `/#${item.toLowerCase()}`} onClick={(e) => {
            if (item === "Contact") {
              e.preventDefault();
              onNavigate("/contact");
              return;
            }
            if (window.location.pathname === "/") {
              e.preventDefault();
              const el = document.getElementById(item.toLowerCase());
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}>
            {item}
          </a>
        ))}
      </nav>
      <button onClick={() => onNavigate("/free-consultation")} className="nav-cta" style={{ cursor: "pointer" }}>Get Free Consultation</button>
      <button className="mobile-menu" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <motion.nav className="mobile-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          {menuItems.map((item) => (
            <a key={item} href={item === "Contact" ? "/contact" : `/#${item.toLowerCase()}`} onClick={(e) => {
              setOpen(false);
              if (item === "Contact") {
                e.preventDefault();
                onNavigate("/contact");
                return;
              }
              if (window.location.pathname === "/") {
                e.preventDefault();
                const el = document.getElementById(item.toLowerCase());
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}>
              {item}
            </a>
          ))}
          <button onClick={() => { onNavigate("/free-consultation"); setOpen(false); }} className="nav-cta !flex w-full mt-2" style={{ cursor: "pointer" }}>Get Free Consultation</button>
        </motion.nav>
      )}
    </header>
  );
}

function HeroSection({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.18]);
  const marketingItems = [
    { icon: FiInstagram, text: "Instagram", className: "hero-chip one" },
    { icon: FiFacebook, text: "Facebook", className: "hero-chip two" },
    { icon: SiGoogleads, text: "Google Ads", className: "hero-chip three" },
    { icon: SiMeta, text: "Meta Ads", className: "hero-chip four" },
    { icon: BarChart3, text: "Analytics", className: "hero-chip five" },
    { icon: Globe2, text: "Digital Globe", className: "hero-chip six" },
  ];

  return (
    <section id="hero" className="hero-section">
      <ParticleBackground />
      <motion.div className="hero-content" style={{ y, opacity }}>
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <SparklesIcon size={16} /> Luxury Digital Growth Studio
        </motion.div>
        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 1 }}>
          <span>WE DON&apos;T JUST MARKET</span>
          <span>WE BUILD DIGITAL BRANDS</span>
        </motion.h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }}>
          Helping startups, businesses and enterprises grow through Branding, Social Media, Performance Marketing, Websites and AI Automation.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
          <MagneticButton onClick={() => onNavigate("/contact")}>Start Your Project</MagneticButton>
          <MagneticButton variant="secondary" onClick={() => {
            window.open("/portfolio", "_blank");
          }}>View Portfolio</MagneticButton>
        </motion.div>
      </motion.div>
      <div className="hero-orbit" aria-hidden="true">
        {marketingItems.map((item) => {
          const IconComp = item.icon;
          return (
            <motion.div key={item.text} className={item.className} animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <IconComp size={21} />
              <span>{item.text}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="scroll-cue">
        <MousePointer2 size={15} />
        Scroll
      </div>
    </section>
  );
}

function TrustedMarquee() {
  const doubled = useMemo(() => [...marqueeItems, ...marqueeItems], []);
  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, index) => (
          <TiltCard key={`${item}-${index}`} className="marquee-card">
            <SparklesIcon size={18} />
            <span>{item}</span>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section reveal-section">
      <FloatingObjects />
      <AnimatedHeading kicker="Creative, technical, measurable">ABOUT SS SOLUTION</AnimatedHeading>
      <div className="about-copy">
        <AnimatedParagraph>
          SS Solution is a creative digital marketing agency helping businesses build powerful brands, generate quality leads, increase online visibility and achieve measurable business growth.
        </AnimatedParagraph>
        <AnimatedParagraph>
          We combine creativity, technology and data-driven marketing strategies to deliver websites, branding, SEO, paid advertising, social media management, automation and business solutions that create real impact.
        </AnimatedParagraph>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const IconComp = service.icon;
  return (
    <TiltCard className="service-card">
      <span className="service-number">{service.number}</span>
      <div className="service-icon"><IconComp size={28} /></div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
    </TiltCard>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="services-section reveal-section">
      <AnimatedHeading kicker="Performance with taste" light>OUR SERVICES</AnimatedHeading>
      <div className="services-grid">
        {services.map((service) => <ServiceCard key={service.number} service={service} />)}
      </div>
    </section>
  );
}



function ProcessSection() {
  return (
    <section id="pricing" className="process-section reveal-section">
      <AnimatedHeading kicker="How momentum is made">OUR PROCESS</AnimatedHeading>
      <div className="timeline">
        {processSteps.map((step, index) => (
          <motion.div
            className="timeline-step"
            key={step}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75 }}
          >
            <span>Step {index + 1}</span>
            <h3>{step}</h3>
            {index < processSteps.length - 1 && <ArrowRight className="timeline-arrow" size={18} />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="why-section reveal-section">
      <AnimatedHeading kicker="Built for serious growth">WHY CHOOSE US</AnimatedHeading>
      <div className="stats-grid">
        {stats.map(([number, label]) => (
          <TiltCard key={label} className="stat-card">
            <h3>{number}</h3>
            <p>{label}</p>
          </TiltCard>
        ))}
      </div>
      <div className="reason-grid">
        {reasons.map(({ icon: ReasonIcon, text }) => {
          return (
            <GlassCard key={text} className="reason-card">
              <ReasonIcon size={24} />
              <span>{text}</span>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials-section reveal-section">
      <AnimatedHeading kicker="Client signal">TESTIMONIALS</AnimatedHeading>
      <div className="testimonial-carousel">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            className="testimonial-card"
            animate={{ rotateY: [index * 4, index * 4 + 8, index * 4], y: [0, -12, 0] }}
            transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={`client-photo bg-gradient-to-br ${item.gradient}`}>{item.name.charAt(0)}</div>
            <p>&quot;{item.review}&quot;</p>
            <h3>{item.name}</h3>
            <span>{item.company}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section reveal-section">
      <div className="map-background" aria-hidden="true">
        <MapPin size={34} />
      </div>
      <AnimatedHeading kicker="Start the next chapter">LET&apos;S GROW YOUR BUSINESS</AnimatedHeading>
      <AnimatedParagraph className="contact-subtitle">
        Ready to take your business to the next level? Let&apos;s build something amazing together.
      </AnimatedParagraph>
      <div className="contact-actions">
        <a href="tel:+919879004729"><Phone size={19} /> Call Now</a>
        <a href="https://wa.me/919879004729"><MessageCircle size={19} /> WhatsApp</a>
        <a href="mailto:sssolution163@gmail.com"><Mail size={19} /> Email Us</a>
      </div>
      <GlassCard className="contact-card">
        <div>
          <span>Company</span>
          <strong>SS Solution</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>+91 9879004729</strong>
        </div>
        <div>
          <span>Email</span>
          <strong>sssolution163@gmail.com</strong>
        </div>
      </GlassCard>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <footer className="footer">
      <div>
        <a className="footer-logo flex items-center" href="/" onClick={(e) => { e.preventDefault(); onNavigate("/"); }}>
          <img src="/logo.png" alt="SS Solution" className="h-24 md:h-28 w-auto object-contain" />
        </a>
        <p>Creative Digital Marketing Agency</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        {menuItems.map((item) => (
          <a key={item} href={`/#${item.toLowerCase()}`} onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              const el = document.getElementById(item.toLowerCase());
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}>
            {item}
          </a>
        ))}
        <button onClick={() => onNavigate("/free-consultation")} className="text-left hover:text-[#00d4ff] transition-colors" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, font: "inherit", fontSize: "0.9rem" }}>Free Consultation</button>
        <button onClick={() => onNavigate("/contact")} className="text-left hover:text-[#00d4ff] transition-colors" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, font: "inherit", fontSize: "0.9rem" }}>Contact Us</button>
      </div>
      <div>
        <h3>Contact</h3>
        <a href="tel:+919879004729">+91 9879004729</a>
        <a href="mailto:sssolution163@gmail.com">sssolution163@gmail.com</a>
        <div className="socials">
          <a href="https://www.instagram.com/ss_solution_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FiInstagram />
          </a>
          <a href="https://www.facebook.com/share/1BXzydGAkv/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FiFacebook />
          </a>
          <a href="https://x.com/HimanshuR48162" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <FaXTwitter />
          </a>
        </div>
      </div>
      <p className="copyright">© 2026 SS Solution. All Rights Reserved.</p>
    </footer>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useLenis();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Only run GSAP reveal animations if on the home page
    if (currentPath !== "/") return;

    const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.72, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%" },
        },
      );
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [currentPath]);

  // Routing render
  return (
    <main>
      <ScrollProgressBar />
      <MouseFollower />
      <Navbar onNavigate={navigate} />
      {currentPath === "/contact" ? (
        <ContactPage onNavigate={navigate} />
      ) : currentPath === "/free-consultation" ? (
        <ConsultationPage onNavigate={navigate} />
      ) : currentPath === "/portfolio" ? (
        <PortfolioPage onNavigate={navigate} />
      ) : (
        <>
          <HeroSection onNavigate={navigate} />
          <TrustedMarquee />
          <AboutSection />
          <ServicesSection />
          <ProcessSection />
          <WhyChooseUs />
          <TestimonialsSection />
          <ContactSection />
          <Footer onNavigate={navigate} />
        </>
      )}
    </main>
  );
}

export default App;
