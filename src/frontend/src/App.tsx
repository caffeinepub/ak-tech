import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ChevronRight,
  Cpu,
  Laptop,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Shield,
  Users,
  Wrench,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

/* ─────────────────────── data ─────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Laptop,
    title: "Tech Products",
    description:
      "Curated laptops, desktops, and computing essentials from the world's top brands — tested and trusted.",
  },
  {
    icon: Wrench,
    title: "Repair & Support",
    description:
      "Expert diagnostics and swift repairs for all devices. Fast turnaround with a satisfaction guarantee.",
  },
  {
    icon: Package,
    title: "Accessories",
    description:
      "Cases, chargers, cables, peripherals — everything to complement and protect your devices.",
  },
  {
    icon: Cpu,
    title: "Smart Devices",
    description:
      "Smart home gadgets, IoT sensors, and wearables to automate and elevate your everyday environment.",
  },
  {
    icon: Users,
    title: "Consultation",
    description:
      "One-on-one tech consultations tailored to your workflow, budget, and goals.",
  },
  {
    icon: Shield,
    title: "Warranty Service",
    description:
      "Comprehensive warranty plans and after-sales care to protect every investment you make with us.",
  },
];

const GALLERY = [
  {
    src: "/assets/generated/gallery-1.dim_600x400.jpg",
    alt: "Laptop workspace",
    tall: true,
  },
  {
    src: "/assets/generated/gallery-2.dim_600x400.jpg",
    alt: "Tech accessories",
    tall: false,
  },
  {
    src: "/assets/generated/gallery-3.dim_600x400.jpg",
    alt: "Smart home devices",
    tall: false,
  },
  {
    src: "/assets/generated/gallery-4.dim_600x400.jpg",
    alt: "Repair workshop",
    tall: false,
  },
  {
    src: "/assets/generated/gallery-5.dim_600x400.jpg",
    alt: "Customer consultation",
    tall: true,
  },
  {
    src: "/assets/generated/gallery-6.dim_600x400.jpg",
    alt: "Store interior",
    tall: false,
  },
];

const FEATURES = [
  "Quality Products from Top Brands",
  "Expert & Friendly Staff",
  "Affordable Competitive Prices",
  "Fast & Reliable Service",
];

/* ─────────────────────── helpers ─────────────────────── */

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = ["home", "services", "about", "gallery", "contact"];
    const observers: IntersectionObserver[] = [];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);
  return active;
}

/* ─────────────────────── sub-components ─────────────────────── */

/** Tilt card for gallery */
function TiltCard({
  src,
  alt,
  tall,
  index,
}: { src: string; alt: string; tall: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -12, y: cx * 12 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        tall ? "row-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      animate={{
        rotateX: hovered ? tilt.x : 0,
        rotateY: hovered ? tilt.y : 0,
        scale: hovered ? 1.03 : 1,
      }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      data-ocid={`gallery.item.${index + 1}`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          tall ? "h-full min-h-[420px]" : "h-52"
        }`}
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-foreground text-sm font-medium">{alt}</p>
      </div>
      {/* Shine */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, oklch(1 0 0 / 0.08) 0%, transparent 50%, oklch(1 0 0 / 0.04) 100%)",
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────── main ─────────────────────── */

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const activeSection = useScrollSpy();
  const { actor } = useActor();

  /* Scroll-based parallax values */
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 80, damping: 20 });

  const heroBgY = useTransform(smoothY, [0, 800], ["0%", "30%"]);
  const heroTextY = useTransform(smoothY, [0, 800], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const orb1Y = useTransform(smoothY, [0, 2000], [0, -280]);
  const orb2Y = useTransform(smoothY, [0, 2000], [0, -180]);
  const orb3Y = useTransform(smoothY, [400, 2000], [0, -200]);
  const floatBadgeY = useTransform(smoothY, [0, 600], [0, 40]);

  /* Nav scroll shadow */
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setNavScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  const scrollTo = (href: string) => {
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Unable to connect. Please try again.");
      return;
    }
    setSubmitting(true);
    try {
      await actor.submitContactForm(form.name, form.email, form.message);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Toaster richColors position="top-right" />

      {/* ══════════════════ NAV ══════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          navScrolled ? "glass border-b border-border/60" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow-sm">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              AK Tech
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border/40 px-6 pb-5"
            >
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors block"
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: heroBgY }}
        >
          <img
            src="/assets/generated/forest-texture-bg.dim_1920x1080.jpg"
            alt=""
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </motion.div>

        {/* Floating orbs */}
        <motion.div
          style={{ y: orb1Y }}
          className="absolute top-20 right-[10%] will-change-transform"
        >
          <div className="orb orb-primary w-[480px] h-[480px]" />
        </motion.div>
        <motion.div
          style={{ y: orb2Y }}
          className="absolute top-[30%] left-[5%] will-change-transform"
        >
          <div className="orb orb-accent w-[320px] h-[320px]" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-20 grid md:grid-cols-2 gap-16 items-center"
          style={{ y: heroTextY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-light px-4 py-2 rounded-full text-sm font-medium text-muted-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Your Trusted Tech Partner
            </motion.div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              <span className="text-foreground">Your One-</span>
              <br />
              <span className="text-gradient">Stop Tech</span>
              <br />
              <span className="text-foreground">Shop.</span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Premium technology, expert repairs, and personalized support — in
              a nature-inspired space crafted for you.
            </p>

            <div className="flex flex-wrap gap-4 pt-1">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-7 font-semibold shadow-glow hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => scrollTo("#services")}
                data-ocid="hero.primary_button"
              >
                Explore Services <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-light border-border/60 text-foreground hover:border-primary/50 hover:text-primary rounded-xl px-7 font-semibold transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => scrollTo("#contact")}
                data-ocid="hero.secondary_button"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Right: Hero image with parallax float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden md:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src="/assets/generated/hero-aktech.dim_800x600.jpg"
                alt="AK Tech Store"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              style={{ y: floatBadgeY }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 shadow-card flex items-center gap-3 will-change-transform"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  2,000+ Customers
                </p>
                <p className="text-xs text-muted-foreground">
                  Trusted since 2016
                </p>
              </div>
            </motion.div>

            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl -z-10" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="w-5 h-8 rounded-full border border-border/60 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section
        id="services"
        className="relative py-28 bg-secondary section-clip-top -mt-16 pt-36 overflow-hidden"
      >
        {/* Parallax orb */}
        <motion.div
          style={{ y: orb3Y }}
          className="absolute top-0 right-0 will-change-transform pointer-events-none"
        >
          <div className="orb orb-primary w-[500px] h-[500px]" />
        </motion.div>

        {/* Faint bg texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src="/assets/generated/forest-texture-bg.dim_1920x1080.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Our Services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass rounded-2xl p-7 group cursor-default"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-5 group-hover:bg-primary/25 group-hover:shadow-glow-sm transition-all duration-300">
                  <svc.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {svc.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {svc.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section
        id="about"
        className="relative py-28 bg-background section-clip-top-reverse -mt-16 pt-36 overflow-hidden"
      >
        <motion.div
          style={{ y: useTransform(smoothY, [800, 2400], [0, -120]) }}
          className="absolute bottom-0 left-0 will-change-transform pointer-events-none"
        >
          <div className="orb orb-accent w-[400px] h-[400px]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-card-hover">
                <img
                  src="/assets/generated/about-aktech.dim_600x500.jpg"
                  alt="About AK Tech"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute -top-5 -right-5 glass rounded-2xl px-6 py-5 shadow-card text-center"
              >
                <p className="font-display text-4xl font-bold text-gradient">
                  8+
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Years Experience
                </p>
              </motion.div>
              {/* Secondary stat */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 7,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-5 glass rounded-2xl px-6 py-5 shadow-card text-center"
              >
                <p className="font-display text-4xl font-bold text-gradient">
                  2K+
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Happy Customers
                </p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <p className="text-primary font-medium tracking-widest uppercase text-sm">
                Our Story
              </p>
              <h2 className="font-display text-5xl font-bold text-foreground leading-tight">
                About AK Tech
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded with a passion for technology and a commitment to
                community, AK Tech has been your trusted retail destination for
                over 8 years. We believe great tech should be accessible,
                sustainable, and backed by people who genuinely care.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our nature-inspired store is more than a shop — it's a hub where
                tech enthusiasts, professionals, and everyday users explore,
                learn, and find solutions tailored to their lives.
              </p>
              <ul className="space-y-3 pt-2">
                {FEATURES.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium text-sm">
                      {f}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-7 font-semibold shadow-glow hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5 mt-2"
                onClick={() => scrollTo("#contact")}
                data-ocid="about.primary_button"
              >
                Get In Touch <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ GALLERY ══════════════════ */}
      <section
        id="gallery"
        className="relative py-28 bg-secondary section-clip-top -mt-16 pt-36 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src="/assets/generated/forest-texture-bg.dim_1920x1080.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              Our Space & Products
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Gallery
            </h2>
          </motion.div>

          {/* Staggered masonry-style grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ gridAutoRows: "200px" }}
          >
            {GALLERY.map((img, i) => (
              <TiltCard key={img.alt} {...img} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section
        id="contact"
        className="relative py-28 bg-background section-clip-top-reverse -mt-16 pt-36 overflow-hidden"
      >
        {/* Dramatic bg */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/assets/generated/hero-aktech.dim_800x600.jpg"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="orb orb-primary w-[600px] h-[600px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10 pt-4"
            >
              <div>
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
                  Reach Out
                </p>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4">
                  Let's talk
                  <br />
                  <span className="text-gradient">tech.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Visit our store, call us, or drop a message. Our team is ready
                  to help you find exactly what you need.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "123 Tech Street, City",
                  },
                  { icon: Phone, label: "Phone", value: "+1 234 567 890" },
                  { icon: Mail, label: "Email", value: "info@aktech.com" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl glass border-border/50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-6">
                <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                  Store Hours
                </h4>
                <div className="space-y-2.5 text-sm">
                  {[
                    { day: "Mon – Fri", hours: "9:00 AM – 7:00 PM" },
                    { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row) => (
                    <div
                      key={row.day}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">{row.day}</span>
                      <span className="font-medium text-foreground">
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="glass rounded-3xl p-8 shadow-card-hover"
                data-ocid="contact.card"
              >
                <h3 className="font-display text-2xl font-bold text-foreground mb-7">
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="c-name"
                      className="text-sm font-semibold text-foreground"
                    >
                      Full Name
                    </label>
                    <Input
                      id="c-name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="glass-light border-border/50 focus:border-primary/60 rounded-xl h-11 text-foreground placeholder:text-muted-foreground"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="c-email"
                      className="text-sm font-semibold text-foreground"
                    >
                      Email Address
                    </label>
                    <Input
                      id="c-email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      className="glass-light border-border/50 focus:border-primary/60 rounded-xl h-11 text-foreground placeholder:text-muted-foreground"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="c-msg"
                      className="text-sm font-semibold text-foreground"
                    >
                      Message
                    </label>
                    <Textarea
                      id="c-msg"
                      placeholder="Tell us how we can help you..."
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      required
                      className="glass-light border-border/50 focus:border-primary/60 rounded-xl resize-none text-foreground placeholder:text-muted-foreground"
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 font-semibold shadow-glow hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    data-ocid="contact.submit_button"
                  >
                    {submitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full inline-block mr-2"
                        />
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  {submitting && (
                    <p
                      className="text-center text-sm text-muted-foreground"
                      data-ocid="contact.loading_state"
                    >
                      Sending your message…
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="relative bg-secondary border-t border-border/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow-sm">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold text-foreground">
                  AK Tech
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted retail destination for premium tech, expert repair,
                and personalized support.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      data-ocid={`footer.${link.label.toLowerCase()}.link`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>123 Tech Street, City</li>
                <li>+1 234 567 890</li>
                <li>info@aktech.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <p>© {year} AK Tech. All rights reserved.</p>
            <p>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
