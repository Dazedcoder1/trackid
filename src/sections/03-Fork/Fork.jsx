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
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-parchment via-white to-stone px-6 py-24 flex items-center">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-amber-200/20 blur-3xl pointer-events-none"></div>

      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.5),transparent_45%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Heading */}

        <div className="text-center mb-24">
          <p className="font-mono uppercase tracking-[0.4em] text-accentDeep text-sm mb-4">
            CHOOSE YOUR EXPERIENCE
          </p>

          <h2 className="font-display text-5xl md:text-7xl tracking-tight text-ink">
            Choose Your Path
          </h2>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-300"></div>

            <div className="w-3 h-3 rotate-45 bg-white border border-amber-400"></div>

            <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>

          <p className="max-w-2xl mx-auto text-slate text-xl leading-9">
            Whether you're protecting students at scale or staying connected
            with loved ones, discover the experience crafted for you.
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Institution Card */}

          <div
            onClick={() => handleSelect("institution")}
            className={`group relative overflow-hidden cursor-pointer rounded-[32px] flex flex-col
            border p-12
            bg-gradient-to-br from-white via-white to-amber-50/40
            transition-all duration-500
            shadow-lg
            hover:-translate-y-2
            hover:scale-[1.015]
            hover:border-accent/40
            hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
            ${
              activeTrack === "institution"
                ? "border-accent ring-1 ring-amber-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
                : "border-stone/50 hover:ring-1 hover:ring-amber-300/60"
            }`}
          >
            {/* Shine */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
              <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-[150%]" />
            </div>
            {/* Premium Top Border */}

            <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-300 via-accent to-accentDeep transition-all duration-500 group-hover:w-full"></div>

            {/* Glow */}

            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-accent/10 to-amber-200/10 blur-3xl"></div>

            {/* Top */}

            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/20 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <School className="w-9 h-9 text-accentDeep" />
              </div>

              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-stone/40 bg-white transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:shadow-md">
                <ArrowRight className="w-5 h-5 text-accentDeep transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            <p className="uppercase tracking-[0.35em] text-xs text-accentDeep mb-4">
              INSTITUTIONS
            </p>

            <h3 className="font-display text-3xl lg:text-4xl text-ink mb-6 leading-tight">
              For Schools & Institutions
            </h3>

            <p className="text-slate text-lg leading-8 max-w-md">
              Safety, visibility and peace of mind for schools, universities,
              and educational organizations responsible for student wellbeing.
            </p>

            <div className="absolute bottom-6 right-6 opacity-40 pointer-events-none">
              <img
                src="/assets/images/institution-pattern.svg"
                alt=""
                className="w-48 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
              />
            </div>

            <div className="mt-auto pt-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 px-5 py-2 text-accentDeep font-medium transition-all duration-300 group-hover:border-accent group-hover:bg-accent/5">
                <span>Explore Experience</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
          {/* Family Card */}

          <div
            onClick={() => handleSelect("family")}
            className={`group relative overflow-hidden cursor-pointer rounded-[32px] flex flex-col
            border p-12
            bg-gradient-to-br from-white via-white to-amber-50/40
            transition-all duration-500
            shadow-lg
            hover:-translate-y-2
            hover:scale-[1.015]
            hover:border-accent/40
            hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
            ${
              activeTrack === "family"
                ? "border-accent ring-1 ring-amber-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
                : "border-stone/50 hover:ring-1 hover:ring-amber-300/60"
            }`}
          >
            {/* Shine */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
              <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-[150%]" />
            </div>
            {/* Premium Top Border */}

            <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-300 via-accent to-accentDeep transition-all duration-500 group-hover:w-full"></div>

            {/* Glow */}

            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-accent/10 to-amber-200/10 blur-3xl"></div>

            {/* Top */}

            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/20 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <Users className="w-9 h-9 text-accentDeep" />
              </div>

              <div
                className="flex items-center justify-center w-12 h-12 rounded-full border border-stone/40 bg-white transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10
group-hover:shadow-md"
              >
                <ArrowRight className="w-5 h-5 text-accentDeep transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            <p className="uppercase tracking-[0.35em] text-xs text-accentDeep mb-4">
              FAMILY
            </p>

            <h3 className="font-display text-3xl lg:text-4xl text-ink mb-6 leading-tight">
              For Families
            </h3>

            <p className="text-slate text-lg leading-8 max-w-md">
              A beautiful and secure way to stay connected with children,
              parents, grandparents, and loved ones through thoughtful
              technology.
            </p>
            <div className="absolute bottom-8 right-8 opacity-40 pointer-events-none">
              <img
                src="/assets/images/family-pattern.svg"
                alt=""
                className="w-48 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
              />
            </div>

            <div className="mt-auto pt-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 px-5 py-2 text-accentDeep font-medium transition-all duration-300 group-hover:border-accent group-hover:bg-accent/5">
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
