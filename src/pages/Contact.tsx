import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send, CheckCircle2, AlertTriangle, Phone, Mail } from "lucide-react";
import Seo from "../components/Seo";

export default function Contact() {
  const location = useLocation();

  // Form fields state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("Web Application");
  const [scale, setScale] = useState("");
  const [email, setEmail] = useState("");
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Parse service query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service");
    if (serviceParam === "web-apps") {
      setProjectType("Web Application");
    } else if (serviceParam === "crm-erp") {
      setProjectType("CRM Portal");
    } else if (serviceParam === "whatsapp-automation") {
      setProjectType("WhatsApp Bot");
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and Email parameters are required to initialize routing.");
      return;
    }

    setLoading(true);
    setError("");

    // Format body for Formspree
    const formData = {
      name,
      company: company || "Not Specified",
      projectType,
      scale: scale || "Standard Capacity",
      email,
      message: `Request for a ${projectType} engineered to handle ${scale || "Standard Scale"}.`
    };

    try {
      const response = await fetch("https://formspree.io/f/mnjkgwje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        // Clear fields
        setName("");
        setCompany("");
        setEmail("");
        setScale("");
      } else {
        throw new Error("Formspree endpoint refused connection.");
      }
    } catch (err) {
      setError("Failed to transmit request parameters. Please verify your connection or retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 text-left">
      <Seo
        title="Contact & Capacity | Rishil Shah"
        description="Initiate a connection to discuss custom software development, ERP/CRM portals, and WhatsApp automation bots."
        path="/contact"
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-left border-b border-border pb-12 mb-16">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">CONNECTION PIPELINE</span>
          <h1 className="text-4xl md:text-6xl font-mono tracking-tighter uppercase font-bold text-foreground">
            INITIATE CONNECTION.
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-3 uppercase tracking-wider">
            DEFINE YOUR SCALE AND CONSTRAINTS. ESTABLISH COMMUNICATION.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-8">
            {success ? (
              <div className="border border-lime/30 bg-lime/5 p-8 font-mono space-y-4 text-left">
                <div className="flex items-center gap-3 text-lime text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5" /> TRANSMISSION SUCCESSFUL
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your project specifications and parameters have been routed to Rishil Shah. The communication pipeline will be open shortly.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="border border-lime text-lime font-mono text-[9px] tracking-widest px-4 py-2.5 hover:bg-lime hover:text-black transition-all duration-300"
                >
                  TRANSMIT NEW SCHEMA
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Natural Language Form Container */}
                <div className="text-lg md:text-2xl font-mono tracking-tight text-foreground/70 leading-relaxed text-left">
                  Hello! My name is{" "}
                  <input
                    type="text"
                    placeholder="[Your Name]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-b border-border text-foreground hover:border-lime focus:border-lime outline-none px-2 py-0.5 placeholder-muted-foreground/60 transition-colors w-40 md:w-56 font-bold"
                    data-cursor="TYPE NAME"
                    required
                  />{" "}
                  and I represent{" "}
                  <input
                    type="text"
                    placeholder="[Company]"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-transparent border-b border-border text-foreground hover:border-lime focus:border-lime outline-none px-2 py-0.5 placeholder-muted-foreground/60 transition-colors w-40 md:w-56"
                    data-cursor="TYPE COMPANY"
                  />
                  .<br />
                  We are looking to build a{" "}
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="bg-background border-b border-border text-lime font-bold outline-none px-2 py-0.5 cursor-pointer hover:border-lime focus:border-lime transition-colors"
                    data-cursor="SELECT TYPE"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="CRM Portal">CRM Portal</option>
                    <option value="ERP Portal">ERP Portal</option>
                    <option value="WhatsApp Bot">WhatsApp Bot</option>
                    <option value="Custom Software">Custom Software</option>
                  </select>{" "}
                  engineered to handle{" "}
                  <input
                    type="text"
                    placeholder="[Scale / User Count]"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="bg-transparent border-b border-border text-foreground hover:border-lime focus:border-lime outline-none px-2 py-0.5 placeholder-muted-foreground/60 transition-colors w-44 md:w-64"
                    data-cursor="TYPE SCALE"
                  />
                  .<br />
                  You can contact me at{" "}
                  <input
                    type="email"
                    placeholder="[Email Address]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b border-border text-foreground hover:border-lime focus:border-lime outline-none px-2 py-0.5 placeholder-muted-foreground/60 transition-colors w-52 md:w-72 font-bold"
                    data-cursor="TYPE EMAIL"
                    required
                  />{" "}
                  to discuss capacity.
                </div>

                {error && (
                  <div className="flex items-center gap-2 font-mono text-[10px] text-red-500 font-bold border border-red-500/30 bg-red-500/5 p-4 text-left">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-lime text-black font-mono font-bold tracking-widest text-[10px] px-8 py-4 border border-lime hover:bg-transparent hover:text-lime transition-all duration-300 flex items-center gap-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  data-cursor="TRANSMIT"
                >
                  {loading ? "TRANSMITTING..." : "TRANSMIT PIPELINE SCHEMA"} <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Protocols info */}
          <div className="lg:col-span-4 space-y-8 bg-card border border-border p-8 text-left font-mono">
            <h3 className="text-xs text-lime uppercase tracking-wider border-b border-border pb-2">
              COMMUNICATION PROTOCOLS
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-lime" />
                <span>+91 90994 72288</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-lime" />
                <span>[HIDDEN FOR ROUTING PROTECTION]</span>
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-3 text-[10px] text-muted-foreground">
              <span className="block font-bold text-lime uppercase">INTEGRITY LOCK</span>
              <p className="leading-relaxed">
                All client project parameters transmitted are isolated via secure database records. Verification response within 24 standard hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
