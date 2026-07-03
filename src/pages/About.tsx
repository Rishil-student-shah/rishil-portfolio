import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo";
import rishilPhoto from "../assets/rishil.jpg";

interface TechNode {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  desc: string;
}

const TECH_NODES: TechNode[] = [
  { id: "python", label: "PYTHON", x: 100, y: 90, r: 35, color: "rgba(180, 255, 30, 1)", desc: "Programming language for secure scripts, backend automation logic, and API algorithms." },
  { id: "django", label: "DJANGO", x: 240, y: 140, r: 35, color: "rgba(90, 200, 255, 1)", desc: "Web framework used to organize secure backend pipelines and relational queries." },
  { id: "react", label: "REACT", x: 380, y: 90, r: 35, color: "rgba(140, 82, 255, 1)", desc: "Frontend library for rendering dynamic interface dashboards and web applications." },
  { id: "mobile", label: "MOBILE", x: 470, y: 160, r: 35, color: "rgba(180, 255, 30, 1)", desc: "Cross-platform mobile application development using React Native to compile native iOS & Android binaries." },
  { id: "crm_erp", label: "CRM / ERP", x: 340, y: 200, r: 35, color: "rgba(140, 82, 255, 1)", desc: "Custom enterprise dashboards, partner portals, and multi-role operations engines built to organize leads and automate office pipelines." },
  { id: "postgres", label: "POSTGRES", x: 130, y: 210, r: 35, color: "rgba(90, 200, 255, 1)", desc: "Relational database used for transactional query indexing and data integrity." },
  { id: "mysql", label: "MYSQL", x: 260, y: 260, r: 35, color: "rgba(180, 255, 30, 1)", desc: "Relational data store used to organize concurrent, multi-role CRM leads databases." },
  { id: "whatsapp", label: "WHATSAPP", x: 110, y: 310, r: 35, color: "rgba(140, 82, 255, 1)", desc: "Integration API used to route stateful chat-ordering and webhook routers." },
  { id: "tailwind", label: "TAILWIND", x: 420, y: 270, r: 35, color: "rgba(90, 200, 255, 1)", desc: "Responsive layout system ensuring visual consistency across mobile and desktop screens." }
];

const CONNECTIONS = [
  ["python", "django"],
  ["django", "react"],
  ["django", "postgres"],
  ["django", "mysql"],
  ["django", "whatsapp"],
  ["django", "mobile"],
  ["django", "crm_erp"],
  ["react", "crm_erp"],
  ["react", "mobile"],
  ["react", "tailwind"],
  ["postgres", "mysql"]
];

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<TechNode>(TECH_NODES[0]); // default to Python

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 550;
    let h = 400;
    canvas.width = w;
    canvas.height = h;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw Connections (plexus lines)
      ctx.lineWidth = 1.2;
      CONNECTIONS.forEach(([fromId, toId]) => {
        const fromNode = TECH_NODES.find(n => n.id === fromId);
        const toNode = TECH_NODES.find(n => n.id === toId);
        if (fromNode && toNode) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          if (selectedNode && (fromNode.id === selectedNode.id || toNode.id === selectedNode.id)) {
            ctx.strokeStyle = "rgba(180, 255, 30, 0.25)"; // highlight active link
          }
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        }
      });

      // Draw Nodes
      TECH_NODES.forEach((n) => {
        const active = selectedNode?.id === n.id;
        
        // Node hover glow ring
        if (active) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = n.color;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw Outer border
        ctx.strokeStyle = active ? n.color : "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = active ? 2.0 : 1.0;
        ctx.fillStyle = active ? "rgba(20, 24, 33, 1)" : "rgba(12, 15, 20, 0.9)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw text inside
        ctx.shadowBlur = 0;
        ctx.fillStyle = active ? n.color : "rgba(255, 255, 255, 0.75)";
        ctx.font = "bold 9px 'Space Grotesk', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      });
    };

    const interval = setInterval(animate, 1000 / 30);

    const onMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Account for visual scale scaling in mobile layout widths
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // Find if clicked node
      TECH_NODES.forEach((n) => {
        const dx = clickX - n.x;
        const dy = clickY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= n.r) {
          setSelectedNode(n);
        }
      });
    };

    canvas.addEventListener("click", onMouseClick);

    return () => {
      clearInterval(interval);
      canvas.removeEventListener("click", onMouseClick);
    };
  }, [selectedNode]);

  return (
    <div className="min-h-screen pt-28 pb-20 text-left">
      <Seo
        title="About The Architect | Rishil Shah"
        description="Learn about Rishil Shah, systems architect and B2B product developer specializing in scalable applications."
        path="/about"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-left border-b border-border pb-12 mb-16">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">BIOGRAPHICAL DOSSIER</span>
          <h1 className="text-4xl md:text-6xl font-mono tracking-tighter uppercase font-bold text-foreground">
            THE ARCHITECT.
          </h1>
        </div>

        {/* Profile Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-mono tracking-tight font-bold text-foreground">
              RISHIL SHAH &mdash; SYSTEMS ARCHITECT & B2B PRODUCT ENGINEER.
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-5 font-sans">
              <p>
                I don't deal in generic templates or cookie-cutter solutions. My work is about designing **digital engines** that function flawlessly under pressure. I partner with businesses that need secure, scalable backends, multi-role CRM dashboard architectures, custom mobile applications, and stateful conversational chatbot flows.
              </p>
              <p>
                To me, code isn't just about syntax—it's about structural reliability. If a database takes longer than 15ms to return search results, or if a webhook drops user sessions when traffic spikes, that's a design failure. I focus strictly on eliminating bottlenecks, validating inputs, and automating process logic.
              </p>
              <p>
                Whether it is mapping rules to pair borrowers with matching lenders, designing database search indices for 10,000+ items, or routing orders via automated WhatsApp chats, I build for scale, speed, and real-world utility.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="border border-border p-4 bg-card/25 w-64 md:w-80 shadow-2xl relative overflow-hidden group">
              <img 
                src={rishilPhoto} 
                alt="Rishil Shah" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="mt-4 font-mono text-[9px] text-muted-foreground text-left border-t border-border pt-3">
                <span>RISHIL SHAH &bull; Ahmedabad, IN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tech-Stack Web */}
        <section className="py-16 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Stack Canvas */}
            <div className="lg:col-span-6 bg-card border border-border p-6 flex justify-center items-center relative overflow-hidden h-[420px] rounded-none">
              <canvas ref={canvasRef} className="w-full h-auto max-w-[550px] max-h-[400px] z-10 relative cursor-pointer" data-cursor="TAP NODE" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            </div>

            {/* Node description terminal */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="font-mono text-xs text-lime uppercase tracking-widest block">INTERACTIVE STACK DESCRIPTOR</span>
              
              <AnimatePresence mode="wait">
                {selectedNode && (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="bg-black/90 border border-border p-8 font-mono text-xs h-64 flex flex-col justify-between"
                  >
                    <div className="border-b border-border pb-3 mb-4 text-lime flex items-center justify-between text-sm">
                      <span className="font-bold">{selectedNode.label} NODE ACTIVE</span>
                      <span className="text-[10px] text-muted-foreground">ID: {selectedNode.id.toUpperCase()}</span>
                    </div>

                    <p className="text-foreground/80 leading-relaxed flex-1 py-2">
                      {selectedNode.desc}
                    </p>

                    <div className="border-t border-border pt-3 mt-4 text-[10px] text-muted-foreground flex justify-between">
                      <span>VERIFIED CAPACITY</span>
                      <span className="text-lime font-bold">▲ ACTIVE LAYER</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
