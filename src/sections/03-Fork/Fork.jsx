import { School, Users, ArrowRight } from "lucide-react";
import { useTrack } from "../../context/TrackContext";

function Fork() {
  const { activeTrack, setActiveTrack } = useTrack();

  const handleSelect = (track) => {
    setActiveTrack(track);

    const section = document.getElementById(
      track === "institution" ? "compliance-case" : "anatomy",
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-parchment px-6 py-24 flex items-center">
      {/* Background Cinematic Glows */}
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-accentDeep/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gold/10 blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center mb-24 relative z-10">
          <p className="font-mono uppercase tracking-[0.4em] text-gold text-sm mb-4">
            CHOOSE YOUR EXPERIENCE
          </p>

          <h2 className="font-display text-5xl md:text-7xl tracking-tight text-ink">
            Choose Your Path
          </h2>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold/50"></div>
            <div className="w-2 h-2 rotate-45 bg-gold/80 shadow-[0_0_10px_rgba(201,166,107,0.5)]"></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold/50"></div>
          </div>

          <p className="max-w-2xl mx-auto text-slate text-xl leading-9">
            Whether you're protecting students at scale or staying connected
            with loved ones, discover the experience crafted for you.
          </p>
        </div>

        {/* Bento Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">
          
          {/* ---------------- INSTITUTION CARD ---------------- */}
          <div
            onClick={() => handleSelect("institution")}
            className={`group relative overflow-hidden cursor-pointer rounded-[32px] flex flex-col p-12 glass-card glass-card-hover ${
              activeTrack === "institution"
                ? "border-gold/50 ring-1 ring-gold/20 shadow-[0_25px_60px_rgba(201,166,107,0.15)] bg-white/[0.08]"
                : ""
            }`}
          >
            {/* Hover Shine Sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
              <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[150%]" />
            </div>

            {/* Premium Top Border Accent */}
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-gold to-accentDeep transition-all duration-700 group-hover:w-full"></div>

            {/* Internal Ambient Glow */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-accentDeep/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Header / Icons */}
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="w-20 h-20 glass-icon shadow-md transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <School className="w-9 h-9 text-gold" />
              </div>

              <div className="w-12 h-12 glass-icon transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/10">
                <ArrowRight className="w-5 h-5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            <p className="font-mono uppercase tracking-[0.35em] text-xs text-gold/80 mb-4 relative z-10">
              INSTITUTIONS
            </p>

            <h3 className="font-display text-3xl lg:text-4xl text-ink mb-6 leading-tight relative z-10">
              For Schools & Institutions
            </h3>

            <p className="text-slate text-lg leading-8 max-w-md relative z-10">
              Safety, visibility and peace of mind for schools, universities,
              and educational organizations responsible for student wellbeing.
            </p>

            {/* Faint Background Pattern */}
            <div className="absolute bottom-6 right-6 opacity-10 pointer-events-none mix-blend-overlay">
              <img
                src="/assets/images/institution-pattern.svg"
                alt=""
                className="w-48 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 grayscale"
              />
            </div>

            <div className="mt-auto pt-14 relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-accent font-medium transition-all duration-300 group-hover:border-gold/30 group-hover:bg-gold/10 group-hover:text-gold">
                <span>Explore Experience</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* ---------------- FAMILY CARD ---------------- */}
          <div
            onClick={() => handleSelect("family")}
            className={`group relative overflow-hidden cursor-pointer rounded-[32px] flex flex-col p-12 glass-card glass-card-hover ${
              activeTrack === "family"
                ? "border-gold/50 ring-1 ring-gold/20 shadow-[0_25px_60px_rgba(201,166,107,0.15)] bg-white/[0.08]"
                : ""
            }`}
          >
            {/* Hover Shine Sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
              <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[150%]" />
            </div>

            {/* Premium Top Border Accent */}
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-gold to-accentDeep transition-all duration-700 group-hover:w-full"></div>

            {/* Internal Ambient Glow */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-accentDeep/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Header / Icons */}
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="w-20 h-20 glass-icon shadow-md transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <Users className="w-9 h-9 text-gold" />
              </div>

              <div className="w-12 h-12 glass-icon transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/10">
                <ArrowRight className="w-5 h-5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            <p className="font-mono uppercase tracking-[0.35em] text-xs text-gold/80 mb-4 relative z-10">
              FAMILY
            </p>

            <h3 className="font-display text-3xl lg:text-4xl text-ink mb-6 leading-tight relative z-10">
              For Families
            </h3>

            <p className="text-slate text-lg leading-8 max-w-md relative z-10">
              A beautiful and secure way to stay connected with children,
              parents, grandparents, and loved ones through thoughtful
              technology.
            </p>
            
            {/* Faint Background Pattern */}
            <div className="absolute bottom-8 right-8 opacity-10 pointer-events-none mix-blend-overlay">
              <img
                src="/assets/images/family-pattern.svg"
                alt=""
                className="w-48 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 grayscale"
              />
            </div>

            <div className="mt-auto pt-14 relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-accent font-medium transition-all duration-300 group-hover:border-gold/30 group-hover:bg-gold/10 group-hover:text-gold">
                <span>Explore Experience</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Fork;