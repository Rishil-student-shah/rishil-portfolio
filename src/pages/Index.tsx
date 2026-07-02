import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, Layers, Database, Zap } from "lucide-react";
import Seo from "../components/Seo";
import localProjects from "../data/projects.json";

// Types
interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client_name: string;
  short_description: string;
  thumbnail: string;
  is_featured: boolean;
}

export default function Index() {
  const [projects] = useState<Project[]>(localProjects.filter(p => p.published));
  const [activeService, setActiveService] = useState<number | null>(null);

  // ----------------------------------------------------
  // Hero Background Canvas (Database Stream)
  // ----------------------------------------------------
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const streams: { x: number; y: number; speed: number; char: string; len: number }[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener("resize", resize);

    // Populate streams (representing packets)
    const streamCount = Math.floor(w / 35);
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: i * 35 + Math.random() * 15,
        y: Math.random() * h,
        speed: 1.5 + Math.random() * 3,
        char: Math.random() > 0.5 ? "1" : "0",
        len: 5 + Math.floor(Math.random() * 15)
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(6, 8, 12, 0.15)";
      ctx.fillRect(0, 0, w, h);
      
      frame++;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mouseActive = mouse.current.active && mx > 0 && mx < w && my > 0 && my < h;

      streams.forEach((s) => {
        s.y += s.speed;
        if (s.y > h) {
          s.y = -20;
          s.speed = 1.5 + Math.random() * 3;
        }

        // Particle layout deflection on mouse hover
        let dx = 0;
        if (mouseActive) {
          const distY = s.y - my;
          const distX = s.x - mx;
          const dist = Math.sqrt(distX * distX + distY * distY);
          if (dist < 100) {
            const force = (100 - dist) / 100 * 20;
            dx = (distX / dist) * force;
          }
        }

        // Draw data packet representation
        ctx.fillStyle = s.speed > 3 ? "rgba(59, 130, 246, 0.45)" : "rgba(180, 255, 30, 0.3)";
        ctx.font = "10px monospace";
        ctx.fillText(s.char, s.x + dx, s.y);

        // Slow change of bit values
        if (frame % 30 === 0 && Math.random() < 0.1) {
          s.char = s.char === "1" ? "0" : "1";
        }
      });

      requestAnimationFrame(animate);
    };

    const loop = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };

    const onMouseLeave = () => {
      mouse.current.active = false;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", onMouseMove);
    parent?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(loop);
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", onMouseMove);
      parent?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // ----------------------------------------------------
  // Stress Tester Interactive State
  // ----------------------------------------------------
  const [load, setLoad] = useState(1); // represented in thousands (1k - 50k)
  const [dbNormalized, setDbNormalized] = useState(false);
  const [redisCached, setRedisCached] = useState(false);
  const [loadBalanced, setLoadBalanced] = useState(false);
  const [logs, setLogs] = useState<string[]>(["SYSTEM BOOTED. WAITING FOR TRAFFIC INFUSION..."]);

  // Computed metrics
  const rawCpu = Math.min(Math.floor((load * 2.2) / (1 + (dbNormalized ? 0.6 : 0) + (redisCached ? 1.2 : 0) + (loadBalanced ? 1.0 : 0))), 100);
  const systemCpu = Math.max(1, rawCpu);
  const latency = Math.max(8, Math.floor((load * 25) / (1 + (redisCached ? 5.0 : 0) + (dbNormalized ? 1.5 : 0)) * (loadBalanced ? 0.6 : 1)));
  const isHealthy = systemCpu < 75;

  useEffect(() => {
    // Generate simulated server logs based on state
    const newLogs: string[] = [];
    if (load > 30 && !redisCached) {
      newLogs.push(`[CRITICAL] DATABASE READ CONGESTION: LATENCY AT ${latency}ms`);
    }
    if (systemCpu > 80) {
      newLogs.push(`[WARNING] CPU INFRASTRUCTURE LOAD SPIKE: ${systemCpu}% LOAD DETECTED`);
    }
    if (dbNormalized && loadBalanced && redisCached) {
      newLogs.push(`[OPTIMIZED] ALL PROTCOLS ACTIVE. SPEED OPTIMIZED.`);
    } else {
      if (dbNormalized) newLogs.push(`[SYS] INDEX OPTIMIZATIONS ACTIVE. NORMALIZED TABLES STABILIZED.`);
      if (redisCached) newLogs.push(`[SYS] CACHE LAYER (REDIS) RESOLVED 85% OF CONCURRENT READS.`);
      if (loadBalanced) newLogs.push(`[SYS] LOAD BALANCER RE-ROUTED 45% TRAFFIC TO WORKER NODES.`);
    }
    newLogs.push(`[STATS] ACTIVE REQUESTS: ${load}K/S | RESPONDING IN ${latency}ms`);

    setLogs((prev) => [newLogs[Math.floor(Math.random() * newLogs.length)], ...prev.slice(0, 5)]);
  }, [load, dbNormalized, redisCached, loadBalanced]);

  // ----------------------------------------------------
  // Blueprint Hover State Tracker
  // ----------------------------------------------------
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <Seo
        title="Rishil Shah | Full-Stack Web & Mobile Engineer"
        description="Personal portfolio of Rishil Shah, full-stack developer engineering high-performance CRM/ERPs, web apps, and B2B WhatsApp bots."
        path="/"
      />

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden px-6">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[1]" />
        
        <div className="max-w-5xl mx-auto w-full relative z-10 py-20 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight leading-none text-foreground mb-8"
          >
            LOGIC THAT SUSTAINS <span className="text-lime glow-text-lime">GROWTH.</span>
            <br />
            NO BOTTLENECKS.
            <br />
            NO BREAKING POINTS.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            <Link to="/works">
              <button 
                className="bg-blue-electric text-white font-mono text-xs tracking-widest px-8 py-4 border border-blue-electric hover:bg-transparent hover:text-blue-electric transition-all duration-300"
                data-cursor="INSPECT"
              >
                EXPLORE INFRASTRUCTURE
              </button>
            </Link>
            <Link to="/contact">
              <button 
                className="border border-border text-foreground hover:border-lime hover:text-lime font-mono text-xs tracking-widest px-8 py-4 transition-all duration-300"
                data-cursor="DISCUSS"
              >
                CAPACITY INQUIRY
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Core Experience: System Stress Tester */}
      <section className="py-24 border-t border-border bg-card/10 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left mb-16">
            <h2 className="text-xs font-mono tracking-widest text-lime uppercase mb-2">EXPERIENTIAL SYSTEM DEMONSTRATION</h2>
            <p className="text-2xl md:text-4xl font-mono tracking-tight">CODE UNDER PRESSURE. STRESS THE INFRASTRUCTURE.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-7 bg-card border border-border p-8 rounded-none text-left space-y-8">
              {/* Slider */}
              <div className="space-y-4">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">CONCURRENT USERS TRAFFIC LOAD</span>
                  <span className="text-lime font-bold">{load}K Req/sec</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={load}
                  onChange={(e) => setLoad(Number(e.target.value))}
                  className="w-full accent-lime bg-muted h-1"
                  data-cursor="DRAG TO STRESS"
                />
              </div>

              {/* Protocol Switches */}
              <div className="space-y-4">
                <span className="block font-mono text-xs text-muted-foreground">DEPLOY OPTIMIZATION PROTOCOLS</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setDbNormalized(!dbNormalized)}
                    className={`font-mono text-[10px] tracking-wider py-3 border transition-all duration-300 ${
                      dbNormalized 
                        ? "bg-lime/10 text-lime border-lime" 
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    [DB NORMALIZATION]
                  </button>
                  <button
                    onClick={() => setRedisCached(!redisCached)}
                    className={`font-mono text-[10px] tracking-wider py-3 border transition-all duration-300 ${
                      redisCached 
                        ? "bg-lime/10 text-lime border-lime" 
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    [REDIS CACHING]
                  </button>
                  <button
                    onClick={() => setLoadBalanced(!loadBalanced)}
                    className={`font-mono text-[10px] tracking-wider py-3 border transition-all duration-300 ${
                      loadBalanced 
                        ? "bg-lime/10 text-lime border-lime" 
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    [LOAD BALANCING]
                  </button>
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="bg-black/90 p-5 font-mono text-[10px] border border-border h-48 overflow-hidden flex flex-col justify-end text-left space-y-1.5 rounded-none">
                <div className="text-muted-foreground border-b border-border pb-2 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-lime" /> SERVER TERMINAL SYSTEM FEED</span>
                  <span className={isHealthy ? "text-lime font-bold animate-pulse" : "text-red-500 font-bold animate-pulse"}>
                    {isHealthy ? "● SYSTEM HEALTHY" : "▲ CONGESTION ALERT"}
                  </span>
                </div>
                {logs.map((log, index) => (
                  <div key={index} className={
                    log.includes("[CRITICAL]") ? "text-red-500 font-bold" :
                    log.includes("[WARNING]") ? "text-amber-500" :
                    log.includes("[OPTIMIZED]") ? "text-lime font-bold" : "text-foreground/80"
                  }>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Dials & Stats */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-6 w-full text-left">
              {/* CPU load */}
              <div className="bg-card border border-border p-6 flex flex-col justify-between h-44">
                <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> CPU PRESSURE</span>
                <span className={`text-4xl md:text-5xl font-mono font-bold ${
                  systemCpu > 80 ? "text-red-500" : systemCpu > 50 ? "text-amber-500" : "text-lime"
                }`}>{systemCpu}%</span>
                <div className="w-full bg-muted h-1.5 rounded-none overflow-hidden">
                  <div className={`h-full ${
                    systemCpu > 80 ? "bg-red-500" : systemCpu > 50 ? "bg-amber-500" : "bg-lime"
                  }`} style={{ width: `${systemCpu}%` }} />
                </div>
              </div>

              {/* Latency */}
              <div className="bg-card border border-border p-6 flex flex-col justify-between h-44">
                <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> API RESPOND TIME</span>
                <span className={`text-4xl md:text-5xl font-mono font-bold ${
                  latency > 300 ? "text-red-500" : latency > 120 ? "text-amber-500" : "text-lime"
                }`}>{latency}ms</span>
                <span className="text-[10px] text-muted-foreground font-mono">TARGET SLA: &lt;150ms</span>
              </div>

              {/* Optimization protocol indicator */}
              <div className="col-span-2 bg-card border border-border p-6 space-y-4">
                <span className="block font-mono text-xs text-muted-foreground">ACTIVE OPTIMIZATION STATUS</span>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span>Database Indexing (SQL Queries)</span>
                    <span className={dbNormalized ? "text-lime font-bold" : "text-muted-foreground"}>
                      {dbNormalized ? "[OPTIMAL]" : "[UNINDEXED]"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cache Layer (Redis Key-Value store)</span>
                    <span className={redisCached ? "text-lime font-bold" : "text-muted-foreground"}>
                      {redisCached ? "[ACTIVE]" : "[BYPASSED]"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Infrastructure Workers (Nginx Balancer)</span>
                    <span className={loadBalanced ? "text-lime font-bold" : "text-muted-foreground"}>
                      {loadBalanced ? "[ROUTING]" : "[SINGLE NODE]"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Works Showcase: The Schema Blueprint */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left mb-16">
            <h2 className="text-xs font-mono tracking-widest text-lime uppercase mb-2">SYSTEMS SHOWCASE ARCHIVE</h2>
            <p className="text-2xl md:text-4xl font-mono tracking-tight">ENGINEERED AND SUSTAINED.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((p) => {
              const isHKM = p.id === "hkm-chemist";
              const isHovered = hoveredProjectId === p.id;
              
              return (
                <div
                  key={p.id}
                  className="relative bg-card border border-border overflow-hidden flex flex-col justify-between group h-full min-h-[520px]"
                  onMouseEnter={() => setHoveredProjectId(p.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  data-cursor="PEEL INTO THE CODE"
                >
                  {/* Absolute Blueprint engine layer */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 w-full h-[calc(100%-60px)] bg-black/95 z-10 p-8 flex flex-col justify-between font-mono text-[9px] text-left border-x border-t border-lime/30"
                      >
                        <div className="border-b border-border pb-4 mb-4 flex items-center justify-between text-lime text-xs">
                          <span className="flex items-center gap-2"><Database className="w-4 h-4" /> ENGINE METRICS & SCHEMA</span>
                          <span>STATUS: PEELED</span>
                        </div>
                        
                        {isHKM ? (
                          <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-none py-4 text-xs font-mono">
                            <div>
                              <span className="text-lime font-bold block mb-1">■ WHATSAPP SESSION ROUTER</span>
                              <p className="text-muted-foreground text-[10px] leading-relaxed">
                                Manages persistent user states, product carts, and conversational flow routing dynamically.
                              </p>
                            </div>
                            <div>
                              <span className="text-lime font-bold block mb-1">■ MEDICINE CATALOG SEARCH INDEX</span>
                              <p className="text-muted-foreground text-[10px] leading-relaxed">
                                Optimized database queries querying 10,000+ stock entries, returning search results and schemes in under 8ms.
                              </p>
                            </div>
                            <div>
                              <span className="text-lime font-bold block mb-1">■ TRANSACTION & WEBHOOK WORKFLOW</span>
                              <p className="text-muted-foreground text-[10px] leading-relaxed">
                                Handles automated order logging, live webhook updates, and dynamic UPI payment QR generation.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-none py-4 text-xs font-mono">
                            <div>
                              <span className="text-lime font-bold block mb-1">■ ROLE PROTECTION SYSTEM</span>
                              <p className="text-muted-foreground text-[10px] leading-relaxed">
                                Custom middleware checking role tokens to route appropriate views for Admins, Partners, and Telecallers.
                              </p>
                            </div>
                            <div>
                              <span className="text-lime font-bold block mb-1">■ SECURE FILES & AUDIT VAULT</span>
                              <p className="text-muted-foreground text-[10px] leading-relaxed">
                                Validates and encrypts partner-uploaded financial documents with transaction log logging.
                              </p>
                            </div>
                            <div>
                              <span className="text-lime font-bold block mb-1">■ LENDER MATCH SCORING SYSTEM</span>
                              <p className="text-muted-foreground text-[10px] leading-relaxed">
                                Calculations mapping profile parameters to filter lender thresholds and optimize loan approvals.
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="border-t border-border pt-4 mt-4 text-muted-foreground flex justify-between">
                          <span>CLICK FOR FULL CASE STUDY</span>
                          <span className="text-lime font-bold">▲ COMPILED SUCCESSFULLY</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Normal static wireframe blueprint */}
                  <div className="p-8 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-lime uppercase tracking-widest">
                        {p.category.replace("-", " ")}
                      </span>
                      <h3 className="text-2xl font-mono tracking-tight font-bold text-foreground">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mt-3">
                        {p.short_description}
                      </p>
                    </div>

                    {/* Minimal Wireframe representation */}
                    <div className="my-8 border border-dashed border-border p-6 flex flex-col justify-center items-center h-44 bg-muted/20 relative">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                      {isHKM ? (
                        <div className="w-3/5 border border-border p-3 space-y-2 text-[8px] font-mono bg-card/60 z-10 shadow-lg text-left">
                          <div className="text-muted-foreground border-b border-border pb-1">WHATSAPP CHAT FEED</div>
                          <div className="text-lime">💬 user: search Crocin</div>
                          <div className="text-blue-electric">⚙️ system: 3 matches found</div>
                          <div className="text-foreground">📦 1. Crocin Advance (Rs. 18.00)</div>
                        </div>
                      ) : (
                        <div className="w-4/5 border border-border p-3 space-y-2 text-[8px] font-mono bg-card/60 z-10 shadow-lg text-left">
                          <div className="text-muted-foreground border-b border-border pb-1 flex justify-between"><span>CRM DASHBOARD</span> <span className="text-lime">● ACTIVE</span></div>
                          <div className="flex gap-2">
                            <div className="border border-border p-2 flex-1">Leads: 120</div>
                            <div className="border border-border p-2 flex-1">Uptime: 99.9%</div>
                          </div>
                          <div className="border border-border p-1.5">Lender Matches: 4 active rules</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="border-t border-border p-6 flex justify-between items-center bg-card relative z-20 font-mono text-[10px]">
                    <span className="text-muted-foreground">CLIENT: {p.client_name}</span>
                    <Link to={`/works/${p.slug}`} className="flex items-center gap-1.5 text-lime font-bold hover:text-blue-electric transition-colors">
                      VIEW SYSTEM <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Specializations & Services Grid */}
      <section className="py-24 border-t border-border bg-card/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left mb-16">
            <h2 className="text-xs font-mono tracking-widest text-lime uppercase mb-2">SERVICES OFFERED</h2>
            <p className="text-2xl md:text-4xl font-mono tracking-tight">ENGINEERING AND CAPABILITIES.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 0,
                title: "Full-Stack Web Engineering",
                shortDesc: "Engineered web platforms built for speed, performance, and scaling under heavy user reads.",
                longDesc: "Custom web systems utilizing lightweight frontends coupled with secure backends. Every product is optimized for speed, featuring normalized databases, optimized queries, and modular APIs.",
                tech: "React, NodeJS, Python, Go, SQL Databases",
                slug: "web-apps"
              },
              {
                id: 1,
                title: "ERP & CRM Dashboard Portals",
                shortDesc: "Secure, multi-role internal management consoles, partner portals, and auditing vaults.",
                longDesc: "Custom relationship and planning dashboards built to run internal business logic. Implements secure role-based access control, file encryption validators, audit trail logging, and dynamic visual pipelines.",
                tech: "Multi-role Middleware, Database Warehousing, File Vaults",
                slug: "crm-erp"
              },
              {
                id: 2,
                title: "WhatsApp B2B Automation Bots",
                shortDesc: "Stateful session routers, webhook processors, and payment gates running inside chat environments.",
                longDesc: "Conversational commerce bots automating order flows, stock dictionary queries, customer outstanding balance lookups, and dynamically generating UPI QR code checkouts directly on WhatsApp.",
                tech: "Python Session Managers, Webhook API, UPI QR Integrations",
                slug: "whatsapp-automation"
              }
            ].map((srv) => {
              const isActive = activeService === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setActiveService(isActive ? null : srv.id)}
                  className={`bg-card border p-8 flex flex-col justify-between text-left cursor-pointer transition-all duration-300 h-full min-h-[24rem] pb-8 ${
                    isActive ? "border-lime shadow-[0_0_15px_rgba(180,255,30,0.15)]" : "border-border hover:border-foreground"
                  }`}
                  data-cursor="INSPECT"
                >
                  <div className="space-y-4">
                    <span className="font-mono text-[9px] text-lime font-bold">0{srv.id + 1} &bull; SERVICE</span>
                    <h3 className="text-xl font-mono font-bold tracking-tight text-foreground">{srv.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{srv.shortDesc}</p>
                  </div>
                  
                  {/* Expanded info block */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-border space-y-4 font-mono text-[10px]"
                      >
                        <p className="text-foreground/90 leading-relaxed font-sans text-xs">{srv.longDesc}</p>
                        <div className="text-lime">STACK: {srv.tech}</div>
                        <Link 
                          to={`/contact?service=${srv.slug}`}
                          className="mt-4 bg-lime text-black font-bold tracking-widest text-[9px] py-2.5 hover:bg-transparent hover:text-lime transition-all border border-lime block text-center"
                        >
                          INQUIRE CAPACITY FOR THIS SERVICE &rarr;
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <span className="font-mono text-[9px] text-lime font-bold mt-6 block">CLICK TO EXPAND DETAILS</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
