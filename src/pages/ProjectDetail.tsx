import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  Database, 
  Terminal, 
  Activity, 
  Code,
  Zap,
  TrendingUp,
  Shield,
  ShieldCheck,
  Clock,
  Users,
  Star,
  Globe,
  Percent,
  Quote
} from "lucide-react";
import Seo from "../components/Seo";
import localProjects from "../data/projects.json";

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  zap: Zap,
  "trending-up": TrendingUp,
  shield: Shield,
  clock: Clock,
  users: Users,
  star: Star,
  globe: Globe,
  percent: Percent
};

interface Milestone {
  phase: string;
  date: string;
  description: string;
}

interface Result {
  label: string;
  value: string;
  icon: string;
}

interface GalleryItem {
  url: string;
  caption: string;
  type: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client_name: string;
  technologies: string[];
  short_description: string;
  full_description: string;
  challenges: string;
  solution: string;
  thumbnail: string;
  is_featured: boolean;
  completion_date: string;
  published: boolean;
  display_order: number;
  timeline: Milestone[];
  results: Result[];
  testimonial_text?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  gallery: GalleryItem[];
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeEngineNode, setActiveEngineNode] = useState<"client" | "backend" | "db">("client");

  // Load project by slug
  useEffect(() => {
    const foundProject = localProjects.find((p) => p.slug === slug);
    if (foundProject && foundProject.published) {
      setProject(foundProject as Project);
    } else {
      setProject(null);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background font-mono px-6">
        <h1 className="text-xl text-red-500 mb-4">▲ SYSTEM ERROR: CASE STUDY NOT COMPILED</h1>
        <p className="text-xs text-muted-foreground mb-8">THE SPECIFIED PATHWAY DOES NOT EXIST IN OUR INFRASTRUCTURE ARCHIVE.</p>
        <Link to="/works">
          <button className="border border-border text-foreground hover:border-lime hover:text-lime text-[10px] tracking-widest px-6 py-3 transition-colors">
            RETURN TO DIRECTORY
          </button>
        </Link>
      </div>
    );
  }

  // Get sibling projects for footer redirection
  const publishedProjects = localProjects.filter((p) => p.published) as Project[];
  const currentIndex = publishedProjects.findIndex((p) => p.id === project.id);
  const nextProject = currentIndex < publishedProjects.length - 1 ? publishedProjects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;

  return (
    <div className="min-h-screen pt-28 pb-20 text-left">
      <Seo
        title={`${project.title} | Rishil Shah Case Study`}
        description={project.short_description}
        path={`/works/${project.slug}`}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation back */}
        <Link to="/works" className="inline-flex items-center gap-2 text-muted-foreground hover:text-lime font-mono text-[9px] tracking-widest mb-10 uppercase transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> BACK TO DIRECTORY
        </Link>

        {/* Technical Hero Banner */}
        <section className="relative min-h-[50vh] bg-card border border-border p-8 md:p-12 mb-16 flex flex-col justify-between relative overflow-hidden group">
          {/* Blurred Background Mockup */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-700 group-hover:opacity-30">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover filter blur-[2px]" />
          </div>
          <div className="absolute inset-0 bg-black/60 z-[1]" />

          <div className="relative z-10 space-y-6">
            <span className="font-mono text-xs text-lime uppercase tracking-widest block">
              STATUS: LIVE &bull; COMPLETED: {project.completion_date}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-mono tracking-tighter uppercase font-bold text-foreground">
              PROJECT: {project.title.toUpperCase()}
            </h1>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border/60 mt-12 font-mono text-[10px]">
            <div>
              <span className="text-muted-foreground block mb-1">CLIENT CONTRACT</span>
              <span className="text-foreground uppercase font-bold">{project.client_name}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">ENGINEERING CATEGORY</span>
              <span className="text-foreground uppercase font-bold">{project.category.replace("-", " ")}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">PRIMARY CONVERSION METRIC</span>
              <span className="text-lime uppercase font-bold">
                {project.results && project.results[0] ? `${project.results[0].value} ${project.results[0].label}` : "OPTIMIZED"}
              </span>
            </div>
          </div>
        </section>

        {/* Outcome Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 font-mono">
          {project.results && project.results.map((res, index) => {
            const IconComp = iconMap[res.icon] || Activity;
            return (
              <div key={index} className="bg-card border border-border p-6 flex flex-col justify-between h-36">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase">
                  <IconComp className="w-4 h-4 text-lime" /> {res.label}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-lime glow-text-lime">{res.value}</span>
                <span className="text-[8px] text-muted-foreground">VERIFIED IN PRODUCTION</span>
              </div>
            );
          })}
        </section>

        {/* Main Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Detailed Overview */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-widest text-lime uppercase border-b border-border pb-2">SYSTEM OVERVIEW</h2>
              <div 
                className="text-sm text-foreground/80 leading-relaxed space-y-4 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.full_description }}
              />
            </div>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 bg-muted/10 border border-border p-6">
                <h3 className="text-xs font-mono tracking-wider text-red-400 uppercase flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> SYSTEM DEGRADATION / CHALLENGE
                </h3>
                <div 
                  className="text-xs text-muted-foreground leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: project.challenges }}
                />
              </div>

              <div className="space-y-4 bg-lime/5 border border-lime/20 p-6">
                <h3 className="text-xs font-mono tracking-wider text-lime uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> RE-FACTOR / RESOLUTION
                </h3>
                <div 
                  className="text-xs text-foreground/90 leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: project.solution }}
                />
              </div>
            </div>

            {/* Architect's Personal Notes */}
            <div className="border border-border p-6 bg-card/60 relative space-y-4">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
              <h3 className="text-xs font-mono tracking-wider text-lime uppercase flex items-center gap-1.5 z-10 relative">
                ■ ARCHITECT'S NOTES (FIRST-PERSON LOG)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed z-10 relative italic font-sans">
                {project.id === "hkm-chemist" && `"Harikrupa Chemist was a unique human challenge. Retailers aren't software testers—they need to order medicine stock in a busy, high-stress shop. By moving the entire catalogue and order logging onto WhatsApp, we met them where they already were. They didn't have to learn a complex portal; they just sent a message."`}
                {project.id === "prishva-fintech" && `"With Prishva Fintech, my priority was balancing security with human usability. Telecallers, partners, admins, and clients all log into the same database. I designed the role filters to be invisible yet completely secure, ensuring agents see only their lead lists, telecallers focus on calls, and partners review payouts without extra steps."`}
                {project.id === "cricmanager" && `"CricManager was built for high-stakes, fast-paced sports auctions where split-second bid delays can cause massive operational disputes. I designed the database query select_related parameters to eliminate N+1 lags entirely and synced all modal state operations locally so organizers never face budget discrepancies."`}
                {project.id === "the-great-heist" && `"Stealth games require seamless 60 FPS feedback to feel immersive. Moving physics layers from Pygame to Android Canvas caused immediate memory and Garbage Collector stutters. I solved it by caching shared bitmaps and pre-allocating layout objects outside the drawing loop—giving players a completely lag-free tactical stealth experience."`}
              </p>
            </div>
          </div>

          {/* Sidebar Architecture Info */}
          <div className="lg:col-span-4 space-y-8 bg-card border border-border p-8">
            <h3 className="font-mono text-xs text-lime uppercase tracking-wider border-b border-border pb-2">
              BUILD STACK & ENGINE
            </h3>
            
            {/* Tech Stack List */}
            <div className="space-y-4 text-left">
              <span className="block font-mono text-[9px] text-muted-foreground uppercase">ENVIRONMENT MODULES</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-border bg-muted/20 px-3 py-1.5 font-mono text-[9px] text-foreground/85 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Client testimonial */}
            {project.testimonial_text && (
              <div className="pt-6 border-t border-border space-y-4">
                <span className="block font-mono text-[9px] text-muted-foreground uppercase">COMMUNICATION VERDICT</span>
                <div className="relative text-xs italic text-muted-foreground/90 bg-muted/10 p-4 border-l-2 border-lime">
                  <Quote className="w-5 h-5 text-lime/30 absolute -top-2 -left-2" />
                  <p className="relative z-10 leading-relaxed font-sans">{project.testimonial_text}</p>
                </div>
                <div className="font-mono text-[9px]">
                  <span className="block font-bold text-foreground">{project.testimonial_author}</span>
                  <span className="text-muted-foreground">{project.testimonial_role}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Interactive Flow Visualizer (Peel Back Schema Detail) */}
        <section className="py-16 border-t border-border mb-20">
          <div className="text-left mb-12">
            <h2 className="text-xs font-mono tracking-widest text-lime uppercase mb-2">TECHNICAL ARCHITECTURE</h2>
            <p className="text-2xl md:text-3xl font-mono tracking-tight">DATA FLOW PIPELINE PIPINGS.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Pipeline flow chart */}
            <div className="lg:col-span-5 border border-border bg-muted/10 p-8 flex flex-col justify-between font-mono relative">
              <span className="block text-[9px] text-muted-foreground uppercase mb-6">TAP NODE TO COMPILE LAYER DETAILS</span>
              
              <div className="flex flex-col gap-8 flex-1 justify-center z-10 relative">
                {[
                  { id: "client", label: "FRONTEND ROUTER (REACT)", icon: Code },
                  { id: "backend", label: "LOGIC WEBHOOK (DJANGO)", icon: Terminal },
                  { id: "db", label: "STORE ENGINE (SQL DATABASE)", icon: Database }
                ].map((node) => {
                  const IconNode = node.icon;
                  const active = activeEngineNode === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveEngineNode(node.id as any)}
                      className={`flex items-center gap-4 p-4 border transition-all duration-300 ${
                        active 
                          ? "bg-lime/10 text-lime border-lime" 
                          : "border-border text-muted-foreground hover:border-foreground bg-card/60"
                      }`}
                    >
                      <IconNode className="w-5 h-5 flex-shrink-0" />
                      <span className="text-xs font-bold tracking-wider uppercase text-left">{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive display terminal */}
            <div className="lg:col-span-7 bg-black/90 border border-border p-8 font-mono text-[10px] text-left flex flex-col justify-between h-96 overflow-hidden">
              <div className="border-b border-border pb-3 mb-4 text-lime text-xs flex justify-between items-center">
                <span>SYSTEM DIAGNOSTIC DISPLAY</span>
                <span>NODE: {activeEngineNode.toUpperCase()}</span>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-none space-y-4">
                {activeEngineNode === "client" && (
                  <>
                    <div className="text-blue-electric font-bold"># RENDER COMPONENT & WEB STATE ACTIONS</div>
                    <pre className="text-foreground/80 leading-relaxed font-mono">
{project.id === "hkm-chemist" 
  ? `[FRONTEND CONTROLLER]
- Connects active user connection streams
- Synchronizes chat input triggers
- Transmits search queries to backend webhook`
  : `[DASHBOARD CONTROLLER]
- Renders multi-role UI status lists
- Polls live lender response streams
- Coordinates caller follow-up log pipelines`}
                    </pre>
                  </>
                )}

                {activeEngineNode === "backend" && (
                  <>
                    <div className="text-blue-electric font-bold"># CORE LOGIC & WEBHOOK ROUTING STATE</div>
                    <pre className="text-foreground/80 leading-relaxed font-mono">
{project.id === "hkm-chemist" 
  ? `[API WEBHOOK WORKFLOW]
- Captures Gupshup webhook JSON packets
- Matches sender metadata to active customer session
- Routes workflow based on state (Search, Carts, checkout)`
  : `[ROUTING & RULES MIDDLEWARE]
- Validates user permissions against security tokens
- Triggers lender eligibility matching metrics
- Records file uploads in document audit logs`}
                    </pre>
                  </>
                )}

                {activeEngineNode === "db" && (
                  <>
                    <div className="text-blue-electric font-bold"># DATABASE TABLES & INDEX DEFINITION</div>
                    <pre className="text-foreground/80 leading-relaxed font-mono">
{project.id === "hkm-chemist" 
  ? `[STORE QUERY ENGINE]
- GIN Index enabled for fast text matching
- Query resolution average: 8.5ms
- Checks stock balance before order updates`
  : `[RELATIONAL STORAGE]
- Index lookup configured on role permission columns
- Database query joins optimized for sub-1s load times
- Direct audit-log logging for critical data writes`}
                    </pre>
                  </>
                )}
              </div>

              <div className="border-t border-border pt-3 mt-4 text-muted-foreground flex justify-between">
                <span>COMPILED NODE READINGS</span>
                <span className="text-lime font-bold">● NODE ACTIVE & VERIFIED</span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline (The Build Path) */}
        {project.timeline && project.timeline.length > 0 && (
          <section className="py-16 border-t border-border mb-16">
            <div className="text-left mb-12">
              <h2 className="text-xs font-mono tracking-widest text-lime uppercase mb-2">INFRASTRUCTURE TIMELINE</h2>
              <p className="text-2xl md:text-3xl font-mono tracking-tight">ENGINEERING MILESTONES.</p>
            </div>

            <div className="space-y-8 max-w-4xl">
              {project.timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-6 relative">
                  <span className="w-10 h-10 border border-lime text-lime font-mono text-xs flex items-center justify-center flex-shrink-0">
                    0{i + 1}
                  </span>
                  <div className="bg-card border border-border p-6 flex-1 text-left">
                    <div className="flex justify-between items-center mb-2 font-mono text-xs">
                      <span className="font-bold text-foreground uppercase">{step.phase}</span>
                      <span className="text-lime">{step.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-16 border-t border-border mb-16">
            <div className="text-left mb-12">
              <h2 className="text-xs font-mono tracking-widest text-lime uppercase mb-2">SYSTEM VISUALS</h2>
              <p className="text-2xl md:text-3xl font-mono tracking-tight">SCREENSHOTS AND INTERFACE LAYOUTS.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {project.gallery.map((item, i) => (
                <div key={i} className="border border-border bg-card/40 p-4 space-y-3">
                  <div className="overflow-hidden bg-black/40 flex justify-center items-center">
                    <img 
                      src={item.url} 
                      alt={item.caption} 
                      className="max-h-[500px] object-contain hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <p className="font-mono text-[9px] text-muted-foreground uppercase">{item.caption}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Case Study Sibling Redirection Navigation */}
        <section className="border-t border-border pt-12 mt-20 flex flex-wrap justify-between items-center gap-6 font-mono text-xs">
          {prevProject ? (
            <Link to={`/works/${prevProject.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-lime transition-colors">
              <ArrowLeft className="w-4 h-4 text-lime" /> PREV SYSTEM: {prevProject.title.split("-")[0]}
            </Link>
          ) : <span className="text-muted-foreground/30">▲ INCEPTION BOUNDARY REACHED</span>}

          {nextProject ? (
            <Link to={`/works/${nextProject.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-lime transition-colors">
              NEXT SYSTEM: {nextProject.title.split("-")[0]} <ArrowRight className="w-4 h-4 text-lime" />
            </Link>
          ) : <span className="text-muted-foreground/30">▼ FINAL ENDPOINT REACHED</span>}
        </section>
      </div>
    </div>
  );
}
