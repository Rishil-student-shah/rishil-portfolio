import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Code, Smartphone, Layers, MessageSquare, ArrowRight, TrendingUp, ShieldCheck, Clock } from "lucide-react";
import Seo from "../components/Seo";

interface Deliverable {
  title: string;
  desc: string;
}

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  stack: string;
  features: string[];
  icon: React.ComponentType<any>;
  impact: string;
  deliverables: Deliverable[];
  phases: { name: string; desc: string }[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-apps",
    title: "Custom Web & Full-Stack Applications",
    shortDesc: "Engineered web platforms built for speed, performance, and scaling under heavy user reads.",
    longDesc: "We build bespoke web systems designed to automate workflows and serve traffic efficiently. Every platform is tailored to your business rules, featuring robust databases, fast page loads, and modular APIs.",
    stack: "React, NodeJS, Python, Go, SQL Databases",
    icon: Code,
    features: [
      "Sub-second page load benchmarks under load",
      "Normalized, clean database table schemas",
      "REST & GraphQL secure API endpoints"
    ],
    impact: "Drives customer retention by ensuring sub-second response times and zero database locking under load.",
    deliverables: [
      { title: "High-Availability Backends", desc: "Server systems built to handle concurrent traffic spikes without performance degradation." },
      { title: "Responsive Web Consoles", desc: "Modern, lightweight frontends optimized for quick loading and intuitive user navigation." },
      { title: "Secure API Gateways", desc: "Structured, encrypted communication endpoints connecting your frontend, backend, and external tools." }
    ],
    phases: [
      { name: "1. Scope & Schema Mapping", desc: "Documenting all database tables, user roles, and core operational parameters." },
      { name: "2. Engine Development", desc: "Writing backend business logic and building frontend page layouts." },
      { name: "3. Optimization & Handoff", desc: "Tuning query execution speeds, testing under pressure, and launching the live system." }
    ]
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    shortDesc: "Cross-device mobile applications compiling native iOS & Android binaries.",
    longDesc: "Custom iOS and Android applications utilizing React Native. We write single-codebase engines that compile to high-performance native binaries, integrating offline local storage and secure system configurations.",
    stack: "React Native, Expo, Swift, Android Java",
    icon: Smartphone,
    features: [
      "Shared business logic across iOS and Android",
      "Offline-first synchronization models",
      "Secure payment and fingerprint authentication gateways"
    ],
    impact: "Unifies your mobile product, cutting development overhead in half while delivering native speeds.",
    deliverables: [
      { title: "Cross-Device Codebase", desc: "Single application logic running smoothly across iPhone and Android devices." },
      { title: "Offline Storage & Sync", desc: "Local database caching that lets customers access assets and execute offline actions." },
      { title: "Native System Hooks", desc: "Clean integration with biometric logins, background alerts, and local push notifications." }
    ],
    phases: [
      { name: "1. Wireframe & User Flow", desc: "Mapping mobile navigation paths, offline states, and button actions." },
      { name: "2. Native compilation", desc: "Coding custom modules and bridging native features on iOS & Android." },
      { name: "3. App Store Deploy", desc: "Configuring provisioning profiles, signing binaries, and publishing to Apple and Google stores." }
    ]
  },
  {
    id: "crm-erp",
    title: "Enterprise ERP & CRM Dashboards",
    shortDesc: "Secure, multi-role internal management consoles, partner portals, and auditing vaults.",
    longDesc: "Tailored internal dashboards built to automate operational business logic. We implement role-based access control, file encryption validations, audit trails, and interactive pipelines to organize complex data.",
    stack: "Multi-role Middleware, Database Warehousing, File Vaults",
    icon: Layers,
    features: [
      "Strict data isolation between roles (Admin, Partner, Caller)",
      "Secure document vaults with audit trail logging",
      "Custom business calculators and automatic lead routing"
    ],
    impact: "Eliminates administrative overhead and manual mistakes by organizing company pipelines and user permissions.",
    deliverables: [
      { title: "Role-Based Access Control", desc: "Isolated portal views specifically customized for Admins, Telecallers, Partners, or Clients." },
      { title: "Encrypted Document Vaults", desc: "Secure file upload containers verifying document formats and logging transaction audits." },
      { title: "Interactive Business Pipelines", desc: "Visual lead boards and calculators automatically routing inquiries based on target rules." }
    ],
    phases: [
      { name: "1. Role Requirement Audit", desc: "Listing access permissions and defining how data should be restricted between roles." },
      { name: "2. Portal Construction", desc: "Building separate console dashboards and linking shared relational database logic." },
      { name: "3. Audit Vault & Release", desc: "Implementing security encryption protocols and logging telecaller system note modules." }
    ]
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp Automation & B2B Bots",
    shortDesc: "Stateful session routers, webhook processors, and payment gates running inside chat environments.",
    longDesc: "Conversational commerce engines allowing business partners to browse medicine catalogs, inspect outstanding orders, and checkout with dynamic UPI QR codes directly inside WhatsApp.",
    stack: "Python Session Managers, Webhook API, UPI QR Integrations",
    icon: MessageSquare,
    features: [
      "Stateful user session machines preventing cart loss",
      "Medicine search queries resolving in under 10ms",
      "UPI payment callback verification hooks"
    ],
    impact: "Saves hundreds of telecalling hours by automating order catalog search and receipt creation.",
    deliverables: [
      { title: "Stateful Session Managers", desc: "State machine structures tracking customer items in their cart during conversations." },
      { title: "Micro-second Database Index", desc: "Medicine search logic scanning 10,000+ items and returning results in milliseconds." },
      { title: "Dynamic Payment Callbacks", desc: "Automated UPI QR checkout generators verifying invoice receipt callbacks." }
    ],
    phases: [
      { name: "1. Catalog & Scheme Mapping", desc: "Gathering medicine codes and defining pricing rules (e.g. bulk discounts)." },
      { name: "2. Bot Flow Development", desc: "Writing the Python state logic and connecting Gupshup WhatsApp webhook APIs." },
      { name: "3. Retailer UAT & Launch", desc: "Testing chat queries with real retailers and launching order logs." }
    ]
  }
];

export default function Services() {
  const location = useLocation();
  const [activeService, setActiveService] = useState<ServiceItem>(SERVICES[0]);

  // Parse active service from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service");
    if (serviceParam) {
      const found = SERVICES.find(s => s.id === serviceParam);
      if (found) {
        setActiveService(found);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen pt-28 pb-20 text-left">
      <Seo
        title="Blueprints & Services | Rishil Shah"
        description="Explore systems architectures, ERP portals, mobile apps, and WhatsApp bots designed by Rishil Shah."
        path="/services"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-left border-b border-border pb-12 mb-16">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">CAPABILITIES SCHEMAS</span>
          <h1 className="text-4xl md:text-6xl font-mono tracking-tighter uppercase font-bold text-foreground">
            THE BLUEPRINTS.
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-3 uppercase tracking-wider">
            BUSINESS-FIRST CAPABILITIES AND STRUCTURAL DELIVERABLES.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Services Selector List (left 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4 font-mono">
            {SERVICES.map((srv) => {
              const active = activeService.id === srv.id;
              const Icon = srv.icon;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveService(srv)}
                  className={`flex items-center gap-4 p-5 border text-left transition-all duration-300 ${
                    active 
                      ? "bg-lime/10 text-lime border-lime shadow-[0_0_10px_rgba(180,255,30,0.1)]" 
                      : "border-border text-muted-foreground hover:border-foreground bg-card/40"
                  }`}
                  data-cursor="SELECT"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-bold tracking-wider uppercase">{srv.title}</span>
                </button>
              );
            })}
          </div>

          {/* Service Details & Visual Showcase (right 8 columns) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description Card */}
            <div className="bg-card border border-border p-8 text-left space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <div className="space-y-2 z-10 relative">
                <span className="font-mono text-[9px] text-lime uppercase tracking-wider block">BLUEPRINT DEFINITION</span>
                <h2 className="text-2xl font-mono font-bold tracking-tight text-foreground">{activeService.title}</h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed z-10 relative font-sans">
                {activeService.longDesc}
              </p>

              {/* Core Features */}
              <div className="space-y-3 z-10 relative font-mono text-xs">
                <span className="text-lime uppercase block tracking-wider text-[10px]">■ CORE PARAMETERS</span>
                <ul className="space-y-2.5">
                  {activeService.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-lime flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border z-10 relative font-mono text-xs text-lime">
                INTEGRATED STACK: {activeService.stack}
              </div>
            </div>

            {/* Dynamic Value Showcase: Outcome & Process Panels (NO technical emulators!) */}
            <div className="space-y-8">
              {/* Outcome Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border bg-card/40 p-6 space-y-3 text-left">
                  <TrendingUp className="w-5 h-5 text-lime" />
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase">Business Impact</span>
                  <p className="text-xs text-foreground/90 font-sans leading-relaxed">{activeService.impact}</p>
                </div>
                
                <div className="border border-border bg-card/40 p-6 space-y-3 text-left">
                  <ShieldCheck className="w-5 h-5 text-lime" />
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase">Quality Assurance</span>
                  <p className="text-xs text-foreground/90 font-sans leading-relaxed">Built with strict type boundaries, modular files, and full security auditing logs.</p>
                </div>

                <div className="border border-border bg-card/40 p-6 space-y-3 text-left">
                  <Clock className="w-5 h-5 text-lime" />
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase">Release Velocity</span>
                  <p className="text-xs text-foreground/90 font-sans leading-relaxed">Systematic sprint plans delivering testable milestones every two weeks.</p>
                </div>
              </div>

              {/* Deliverables breakdown list */}
              <div className="border border-border bg-card/30 p-8 text-left space-y-6">
                <span className="block font-mono text-xs text-lime uppercase tracking-widest">■ WHAT WE DEPLOY FOR YOU</span>
                <div className="divide-y divide-border font-sans">
                  {activeService.deliverables.map((del, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-4 items-start justify-between">
                      <div className="md:w-1/3">
                        <span className="font-mono text-xs font-bold text-foreground uppercase">{del.title}</span>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-xs text-muted-foreground leading-relaxed">{del.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Release Path Timeline */}
              <div className="border border-border bg-card/30 p-8 text-left space-y-6">
                <span className="block font-mono text-xs text-lime uppercase tracking-widest">■ THE DEPLOYMENT PATH</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                  {activeService.phases.map((ph, i) => (
                    <div key={i} className="space-y-2 border-l border-lime/30 pl-4 relative">
                      <div className="absolute w-2 h-2 bg-lime rounded-full -left-[4.5px] top-1" />
                      <span className="font-bold text-lime block uppercase">{ph.name}</span>
                      <p className="text-[10px] text-muted-foreground leading-relaxed font-sans">{ph.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom capacity inquiry redirect bar */}
            <div className="border border-border p-6 flex flex-wrap justify-between items-center gap-4 bg-muted/10">
              <span className="font-mono text-xs text-muted-foreground uppercase">ESTABLISH SYSTEM REQUIREMENTS</span>
              <Link
                to={`/contact?service=${activeService.id}`}
                className="bg-lime text-black font-mono font-bold tracking-widest text-[9px] px-8 py-3.5 border border-lime hover:bg-transparent hover:text-lime transition-all duration-300 flex items-center gap-2"
                data-cursor="INQUIRE"
              >
                DISCUSS THIS BLUEPRINT <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
