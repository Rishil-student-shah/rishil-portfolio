import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Terminal, Code, Smartphone, Layers, CheckCircle2, MessageSquare } from "lucide-react";
import Seo from "../components/Seo";

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  stack: string;
  compilingLogs: string[];
  features: string[];
  icon: React.ComponentType<any>;
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-apps",
    title: "Custom Web & Full-Stack Applications",
    shortDesc: "Engineered web platforms built for speed, performance, and scaling under heavy user reads.",
    longDesc: "We design and deploy custom web environments utilizing high-performance server architectures and lightweight frontends. Every application is optimized for speed, featuring normalized databases, structured API routers, and clean caching layers.",
    stack: "React, NodeJS, Python, Go, SQL Databases",
    icon: Code,
    features: [
      "Sub-second page load benchmarks under load",
      "Normalized, clean database table schemas",
      "REST & GraphQL secure API endpoints"
    ],
    compilingLogs: [
      "[SYS] INITIALIZING WEB COMPILER PROTOCOL...",
      "[SYS] INDEXING RELATIONAL MODEL CONTROLLERS...",
      "[DB] VERIFYING POSTGRESQL & MYSQL INDEX CONSTRAINTS...",
      "[API] MOUNTING CORE SERVER ROUTERS...",
      "[COMPILE] COMPRESSING BUNDLE SIZES UNDER 450KB...",
      "[STATUS] FULL-STACK WEB ENVIRONMENT RUNNING: UPTIME 99.9%"
    ]
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    shortDesc: "Cross-device mobile applications compiling native iOS & Android binaries.",
    longDesc: "Robust cross-platform mobile apps using React Native. We build native bridge architectures that integrate with device sensors, offline local caches, push alert systems, and secure credential storage.",
    stack: "React Native, Expo, iOS Swift Native, Android Java",
    icon: Smartphone,
    features: [
      "Shared business logic across iOS and Android",
      "Offline-first synchronization models",
      "Secure payment and fingerprint authentication gateways"
    ],
    compilingLogs: [
      "[SYS] SPANNING MOBILE EMBEDDED CONSOLE...",
      "[IOS] BOOTING SWIFT RUNTIME & CREDENTIALS CHECK...",
      "[ANDROID] COMPILING JAVA NATIVE BRIDGES...",
      "[SYS] VERIFYING OFFLINE SQLite STORAGE SCHEMA...",
      "[STATUS] MOBILE BINARIES COMPILED SUCCESSFULLY."
    ]
  },
  {
    id: "crm-erp",
    title: "Enterprise ERP & CRM Dashboards",
    shortDesc: "Secure, multi-role internal management consoles, partner portals, and auditing vaults.",
    longDesc: "Tailored dashboard portals built to automate operational business logic. Implements secure role-based access controls, encrypted file-upload validation engines, audit trail transaction logs, and interactive lead trackers.",
    stack: "Multi-role Middleware, Database Warehousing, File Vaults",
    icon: Layers,
    features: [
      "Strict data isolation between roles (Admin, Partner, Caller)",
      "Secure document vaults with audit trail logging",
      "Custom business calculators and automatic lead routing"
    ],
    compilingLogs: [
      "[SYS] INITIATING ROLE AUTHENTICATION ENGINE...",
      "[MIDDLEWARE] BINDING SESSION SECURITY CHECKS...",
      "[DB] ENCRYPTING DATA VAULT AT REST...",
      "[SYS] GENERATING AUDIT LOG TRANSACTION TABLES...",
      "[STATUS] ENTERPRISE PORTAL COMPILED: ACCESS LEVEL SECURED"
    ]
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp Automation & B2B Bots",
    shortDesc: "Stateful session routers, webhook processors, and payment gates running inside chat environments.",
    longDesc: "Conversational automation bots that enable retailers to search product catalogs, check stocks, inspect outstanding balances, and checkout with dynamic UPI QR codes directly inside WhatsApp.",
    stack: "Python Session Managers, Webhook API, UPI QR Integrations",
    icon: MessageSquare,
    features: [
      "Stateful user session machines preventing cart loss",
      "Medicine search queries resolving in under 10ms",
      "UPI payment callback verification hooks"
    ],
    compilingLogs: [
      "[SYS] BINDING WHATSAPP WEBHOOK STREAM...",
      "[SESSION] STARTING PYTHON SESSION ROUTER FLOW...",
      "[DB] CACHING CATALOG DICTIONARY INDICES...",
      "[API] MOUNTING UPI GATEWAY HANDLER...",
      "[STATUS] CHATBOT OPERATIONAL: POLLING WEBHOOK FEED"
    ]
  }
];

export default function Services() {
  const location = useLocation();
  const [activeService, setActiveService] = useState<ServiceItem>(SERVICES[0]);
  const [compilerLogs, setCompilerLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);

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

  // Run mock compiler logs when active service changes
  useEffect(() => {
    setIsCompiling(true);
    setCompilerLogs([]);
    let logIndex = 0;
    const logs = activeService.compilingLogs;

    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        setCompilerLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      } else {
        setIsCompiling(false);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [activeService]);

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
            DETAILED TECHNICAL LAYOUTS AND ARCHITECTURES SHIPPED TO CLIENTS.
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

          {/* Service Details & Compilation Console (right 8 columns) */}
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

            {/* Simulated Live Compiler Console */}
            <div className="bg-black/90 border border-border p-6 font-mono text-[10px] text-left h-64 flex flex-col justify-between overflow-hidden relative">
              <div className="border-b border-border pb-3 mb-4 text-lime text-xs flex justify-between items-center">
                <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-lime" /> COMPILING SCHEMA: {activeService.id.toUpperCase()}</span>
                <span className={isCompiling ? "text-amber-500 animate-pulse font-bold" : "text-lime font-bold"}>
                  {isCompiling ? "● COMPILING..." : "● READY"}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-none space-y-2">
                {compilerLogs.map((log, index) => (
                  <div key={index} className={
                    log.includes("[STATUS]") ? "text-lime font-bold" :
                    log.includes("[DB]") ? "text-blue-electric" : "text-foreground/80"
                  }>
                    {log}
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 mt-4 text-muted-foreground flex justify-between items-center">
                <span>COMPILED OUTPUT VIEW</span>
                {!isCompiling && (
                  <Link
                    to={`/contact?service=${activeService.id}`}
                    className="bg-lime text-black font-bold tracking-widest text-[9px] px-6 py-2.5 border border-lime hover:bg-transparent hover:text-lime transition-all duration-300"
                    data-cursor="INQUIRE"
                  >
                    INQUIRE CAPACITY PROTOCOL &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
