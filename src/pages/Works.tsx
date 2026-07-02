import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Layout, MessageSquare } from "lucide-react";
import Seo from "../components/Seo";
import localProjects from "../data/projects.json";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client_name: string;
  short_description: string;
  technologies: string[];
  thumbnail: string;
  published: boolean;
  display_order: number;
}

const CATEGORIES = [
  { id: "all", label: "ALL DEPLOYMENTS" },
  { id: "whatsapp-automation", label: "WHATSAPP AUTOMATION" },
  { id: "crm-erp", label: "CRM / ERP PORTALS" }
];

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [projects] = useState<Project[]>(localProjects.filter(p => p.published));

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "whatsapp-automation":
        return <MessageSquare className="w-3.5 h-3.5" />;
      case "crm-erp":
        return <Layout className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <Seo
        title="Works & Deployments | Rishil Shah"
        description="Browse full-stack systems, secure ERP/CRM dashboards, and conversational automation bots designed by Rishil Shah."
        path="/works"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-left border-b border-border pb-12 mb-12">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">SYSTEMS CATALOG</span>
          <h1 className="text-4xl md:text-6xl font-mono tracking-tighter uppercase font-bold text-foreground">
            PRODUCTION RUNNINGS.
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-3 uppercase tracking-wider">
            DEPLOYED AND MONITORED APPLICATIONS WITH BUSINESS METRICS.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-start overflow-x-auto scrollbar-none mb-16">
          <div className="flex gap-3 p-1 bg-muted/40 border border-border w-max">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`font-mono text-[9px] tracking-widest px-4 py-2.5 transition-all duration-300 ${
                    active 
                      ? "bg-lime text-black font-bold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-card border border-border flex flex-col justify-between text-left hover:border-lime transition-colors duration-300 h-full"
              data-cursor="INSPECT ENGINE"
            >
              {/* Card visual header */}
              <div className="relative aspect-video bg-muted overflow-hidden flex-shrink-0 border-b border-border">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/80 border border-border px-3 py-1.5 font-mono text-[8px] tracking-widest text-lime flex items-center gap-1.5">
                  {getCategoryIcon(p.category)}
                  {p.category.toUpperCase().replace("-", " ")}
                </div>
              </div>

              {/* Card content details */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h2 className="text-xl font-mono font-bold tracking-tight text-foreground">{p.title}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.short_description}</p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {p.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border border-border bg-muted/20 px-2.5 py-1 font-mono text-[8px] text-foreground/75 tracking-wider uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                  {p.technologies.length > 4 && (
                    <span className="border border-border bg-muted/20 px-2.5 py-1 font-mono text-[8px] text-lime font-bold tracking-wider uppercase">
                      +{p.technologies.length - 4} MORE
                    </span>
                  )}
                </div>
              </div>

              {/* Card footer redirect */}
              <div className="border-t border-border p-6 flex justify-between items-center bg-muted/10 font-mono text-[10px]">
                <span className="text-muted-foreground uppercase">CLIENT: {p.client_name}</span>
                <Link
                  to={`/works/${p.slug}`}
                  className="flex items-center gap-1.5 text-lime font-bold hover:text-blue-electric transition-colors"
                >
                  PEEL INTO ARCHITECTURE <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
