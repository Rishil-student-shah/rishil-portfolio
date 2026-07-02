import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Terminal, Code, Smartphone, Layers, CheckCircle2, MessageSquare, Lock } from "lucide-react";
import Seo from "../components/Seo";

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  stack: string;
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
            EXPERIMENT WITH LIVE SYSTEMS BLUEPRINTS IN REAL-TIME.
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

          {/* Service Details & Interactive Capability Preview Console (right 8 columns) */}
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

            {/* Dynamic Capabilities Preview Console */}
            <div className="bg-card border border-border p-8 text-left space-y-8 relative overflow-hidden">
              <div className="border-b border-border pb-4 flex items-center justify-between font-mono text-xs text-lime">
                <span className="flex items-center gap-2 uppercase"><Terminal className="w-4 h-4" /> Interactive Capability Simulator</span>
                <span>STATUS: STABLE</span>
              </div>

              {/* Widget Switcher */}
              <div className="min-h-[300px] flex items-center justify-center">
                {activeService.id === "web-apps" && <WebOptimizerWidget />}
                {activeService.id === "mobile-apps" && <MobileMockupWidget />}
                {activeService.id === "crm-erp" && <RoleAccessWidget />}
                {activeService.id === "whatsapp-automation" && <WhatsAppBotWidget />}
              </div>

              <div className="border-t border-border pt-6 flex flex-wrap justify-between items-center gap-4 font-mono text-xs">
                <span className="text-muted-foreground">EXPERIMENT WITH CONFIGURATIONS ABOVE</span>
                <Link
                  to={`/contact?service=${activeService.id}`}
                  className="bg-lime text-black font-bold tracking-widest text-[9px] px-6 py-3 border border-lime hover:bg-transparent hover:text-lime transition-all duration-300"
                  data-cursor="INQUIRE"
                >
                  INQUIRE CAPACITY PROTOCOL &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 1. Web Optimizer Widget
// ----------------------------------------------------
function WebOptimizerWidget() {
  const [dbIndexed, setDbIndexed] = useState(false);
  const [redisCached, setRedisCached] = useState(false);
  const [cdnEnabled, setCdnEnabled] = useState(false);

  let speed = 340;
  if (dbIndexed) speed -= 120;
  if (redisCached) speed -= 150;
  if (cdnEnabled) speed -= 50;

  const score = speed < 40 ? "A+ BLAZING" : speed < 100 ? "A OPTIMIZED" : speed < 200 ? "B STABLE" : "F CONGESTED";
  const scoreColor = speed < 100 ? "text-lime border-lime" : speed < 220 ? "text-blue-electric border-blue-electric" : "text-red-500 border-red-500";

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-mono">
      <div className="md:col-span-6 space-y-6">
        <span className="text-[10px] text-muted-foreground uppercase block">ENGINE STACKS SPEED TUNER</span>
        
        <div className="space-y-3 text-xs">
          <button
            onClick={() => setDbIndexed(!dbIndexed)}
            className={`w-full flex justify-between items-center p-3 border transition-colors ${
              dbIndexed ? "border-lime text-lime bg-lime/5" : "border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            <span>[DB INDEXING SCHEMA]</span>
            <span>{dbIndexed ? "ACTIVE (-120ms)" : "BYPASS"}</span>
          </button>
          
          <button
            onClick={() => setRedisCached(!redisCached)}
            className={`w-full flex justify-between items-center p-3 border transition-colors ${
              redisCached ? "border-lime text-lime bg-lime/5" : "border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            <span>[REDIS KEY-VALUE CACHE]</span>
            <span>{redisCached ? "ACTIVE (-150ms)" : "BYPASS"}</span>
          </button>

          <button
            onClick={() => setCdnEnabled(!cdnEnabled)}
            className={`w-full flex justify-between items-center p-3 border transition-colors ${
              cdnEnabled ? "border-lime text-lime bg-lime/5" : "border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            <span>[EDGE CDN DISTRIBUTION]</span>
            <span>{cdnEnabled ? "ACTIVE (-50ms)" : "BYPASS"}</span>
          </button>
        </div>
      </div>

      <div className="md:col-span-6 flex flex-col justify-center items-center p-6 border border-border bg-black/40 min-h-[220px]">
        <span className="text-[9px] text-muted-foreground mb-4">CALCULATED API SPEED GAUGE</span>
        <div className={`w-32 h-32 rounded-full border-2 flex flex-col justify-center items-center gap-1 ${scoreColor}`}>
          <span className="text-3xl font-bold">{speed}ms</span>
          <span className="text-[9px] tracking-wider font-bold">{score}</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. Mobile Viewport Widget
// ----------------------------------------------------
function MobileMockupWidget() {
  const [activeTab, setActiveTab] = useState<"dash" | "pay" | "logs">("dash");

  return (
    <div className="w-full flex flex-col md:flex-row gap-12 items-center font-mono">
      <div className="flex-1 space-y-6 text-left">
        <span className="text-[10px] text-muted-foreground uppercase block">DEVICE SCREEN CONTROLLER</span>
        <p className="text-xs text-muted-foreground font-sans leading-relaxed">
          Cross-platform React Native apps compile clean views across all tabs. Tap the controls below to inspect mobile viewport rendering.
        </p>
        
        <div className="flex flex-col gap-2.5 text-xs">
          {["dash", "pay", "logs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`p-3 border text-left uppercase transition-colors ${
                activeTab === tab ? "border-lime text-lime bg-lime/5" : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              [TAB] {tab === "dash" ? "Asset Dashboard" : tab === "pay" ? "Secure Checkout" : "Sync Diagnostic Logs"}
            </button>
          ))}
        </div>
      </div>

      {/* iPhone Mockup Frame */}
      <div className="w-56 h-[300px] border border-border bg-black rounded-3xl relative p-3 flex flex-col justify-between shadow-2xl relative overflow-hidden flex-shrink-0">
        <div className="w-20 h-3.5 bg-border rounded-full mx-auto mb-2 relative flex-shrink-0" /> {/* Speaker bar */}

        {/* Screen view content */}
        <div className="flex-1 bg-card/60 p-3 text-[8px] flex flex-col justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

          {activeTab === "dash" && (
            <div className="space-y-2 text-left z-10 relative">
              <div className="text-muted-foreground border-b border-border pb-1">FINANCIAL PORTFOLIO</div>
              <div className="text-lime text-xs font-bold font-mono">Rs. 1,48,220</div>
              <div className="border border-border p-1.5 space-y-1">
                <div>📈 LENDER APPROVALS: 4 ACTIVE</div>
                <div>🔄 SYNC RATE: 99.8%</div>
              </div>
            </div>
          )}

          {activeTab === "pay" && (
            <div className="space-y-3 text-left z-10 relative">
              <div className="text-muted-foreground border-b border-border pb-1">ORDER VERIFICATION</div>
              <div className="border border-border p-2 space-y-1.5">
                <div>Product: Crocin Advance</div>
                <div>Billing: Rs. 180.00</div>
              </div>
              <button className="w-full bg-lime text-black font-bold py-1.5 text-[8px] uppercase">
                INITIATE BIOMETRIC PAY
              </button>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-1 text-left text-blue-electric font-mono z-10 relative overflow-y-auto h-full scrollbar-none">
              <div>[SYS] INITIATING SECURE STORAGE...</div>
              <div>[OK] SQLite ENGINE VERIFIED.</div>
              <div>[SYNC] PUSH ALERTS ONLINE.</div>
              <div>[OK] NATIVE BRIDGE COMPILED.</div>
            </div>
          )}

          <span className="text-[7px] text-muted-foreground text-center border-t border-border/60 pt-1 font-mono uppercase tracking-widest mt-auto">
            {activeTab.toUpperCase()} VIEW
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. Role Access Widget
// ----------------------------------------------------
function RoleAccessWidget() {
  const [role, setRole] = useState<"client" | "caller" | "admin">("client");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-mono">
      <div className="md:col-span-4 flex flex-col gap-3 text-xs">
        <span className="text-[10px] text-muted-foreground uppercase block text-left">SELECT ACCESS ROLE</span>
        {["client", "caller", "admin"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r as any)}
            className={`p-3 border text-left uppercase transition-colors ${
              role === r ? "border-lime text-lime bg-lime/5" : "border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            [ROLE] {r === "client" ? "Public Client" : r === "caller" ? "Staff Telecaller" : "Global Admin"}
          </button>
        ))}
      </div>

      <div className="md:col-span-8 bg-black/40 border border-border p-6 text-[10px] space-y-4 text-left min-h-[220px]">
        <div className="border-b border-border pb-2 text-[9px] text-muted-foreground flex justify-between">
          <span>ROLE SECURITY SIMULATOR</span>
          <span>ROLE: {role.toUpperCase()}</span>
        </div>

        <div className="space-y-3">
          {/* Node 1 */}
          <div className="flex justify-between items-center p-2.5 border border-border/80">
            <span>1. EMI SIP CALCULATOR GATEWAY</span>
            <span className="text-lime flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> ACCESS GRANTED</span>
          </div>

          {/* Node 2 */}
          <div className="flex justify-between items-center p-2.5 border border-border/80">
            <span>2. CLIENT PIPELINE NOTES</span>
            {role === "client" ? (
              <span className="text-red-500 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> REJECTED</span>
            ) : (
              <span className="text-lime flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> ACCESS GRANTED</span>
            )}
          </div>

          {/* Node 3 */}
          <div className="flex justify-between items-center p-2.5 border border-border/80">
            <span>3. ACCESS AUDIT LOG VAULTS</span>
            {role === "admin" ? (
              <span className="text-lime flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> ACCESS GRANTED</span>
            ) : (
              <span className="text-red-500 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> REJECTED</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. WhatsApp Chat Bot Widget
// ----------------------------------------------------
function WhatsAppBotWidget() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string; time: string; type?: string }[]>([
    { sender: "bot", text: "Welcome to Harikrupa Chemist. Tap a query option below to test catalog searches or checkout.", time: "23:30" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const triggerReply = (userText: string, botText: string, delay: number, type?: string) => {
    if (isTyping) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: "user", text: userText, time }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: "bot", text: botText, time, type }]);
    }, delay);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-mono">
      <div className="md:col-span-5 flex flex-col gap-3 text-xs">
        <span className="text-[10px] text-muted-foreground uppercase block text-left">SEND CHAT QUERY CMD</span>
        <button
          onClick={() => triggerReply(
            "Search Crocin", 
            "📦 MATCHES FOUND:\n1. Crocin Advance (Rs. 18.00) [100 in stock]\n2. Crocin Pain Relief (Rs. 24.00) [50 in stock]",
            700
          )}
          disabled={isTyping}
          className="p-3 border text-left transition-colors border-border text-muted-foreground hover:border-lime hover:text-lime"
        >
          [CHAT] "Search medicine Crocin"
        </button>

        <button
          onClick={() => triggerReply(
            "Add Crocin Advance to Cart", 
            "🛒 ADDED TO CART:\n1x Crocin Advance (Rs. 18.00).\nTotal cart cost: Rs. 18.00.",
            800
          )}
          disabled={isTyping}
          className="p-3 border text-left transition-colors border-border text-muted-foreground hover:border-lime hover:text-lime"
        >
          [CHAT] "Add 1x Crocin to Cart"
        </button>

        <button
          onClick={() => triggerReply(
            "Checkout order", 
            "💳 ORDER LOCKED.\nScan this UPI QR code inside your mobile banking app to complete the checkout.",
            900,
            "qr"
          )}
          disabled={isTyping}
          className="p-3 border text-left transition-colors border-border text-muted-foreground hover:border-lime hover:text-lime"
        >
          [CHAT] "Finalize order checkout"
        </button>
      </div>

      <div className="md:col-span-7 bg-black/40 border border-border h-[260px] flex flex-col justify-between overflow-hidden shadow-xl rounded-none relative">
        <div className="bg-lime/10 border-b border-border p-3 flex items-center justify-between text-xs text-lime">
          <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-lime" /> WHATSAPP CHAT CHANNEL</span>
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground">ONLINE</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none text-[10px]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col max-w-[80%] p-2.5 rounded-none border text-left ${
                msg.sender === "user"
                  ? "bg-lime/5 border-lime/30 ml-auto"
                  : "bg-muted/20 border-border mr-auto"
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans text-[10px] leading-relaxed text-foreground">
                {msg.text}
              </pre>
              {msg.type === "qr" && (
                <div className="my-2 border border-border p-2 bg-white w-20 h-20 flex items-center justify-center mx-auto">
                  {/* Visual QR Code Mockup */}
                  <div className="w-16 h-16 bg-black flex flex-wrap p-1">
                    <div className="w-6 h-6 border-2 border-white m-0.5" />
                    <div className="w-6 h-6 border-2 border-white m-0.5" />
                    <div className="w-6 h-6 border-2 border-white m-0.5" />
                    <div className="w-6 h-6 border-2 border-white m-0.5" />
                  </div>
                </div>
              )}
              <span className="text-[7px] text-muted-foreground text-right block mt-1 font-mono">{msg.time}</span>
            </div>
          ))}
          {isTyping && (
            <div className="bg-muted/10 border border-border mr-auto p-2 text-[9px] text-lime animate-pulse font-mono max-w-[60%]">
              typing response...
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
