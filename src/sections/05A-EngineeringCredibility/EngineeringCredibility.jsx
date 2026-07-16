import { motion } from 'framer-motion';
import { fadeUp, EASE } from '../../motion/variants';
import { COPY } from '../../content/copy';
import SpecGrid from './SpecGrid';

const { eyebrow, specs } = COPY.engineeringCredibility;

// 6 placeholders to perfectly fill a 3-column grid
const TEAM = [
  {
    name: "Manu Arora",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "John Doe",
    role: "Co-Founder & CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Glennfiddich Doe",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sarah Connor",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "David Smith",
    role: "Hardware Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Emily Chen",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
];

export default function EngineeringCredibility() {
  return (
    <section className="bg-parchment py-32 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">

        {/* Eyebrow + Headline */}
        <motion.div {...fadeUp} className="flex flex-col gap-4 max-w-2xl">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold">
            {eyebrow || "BUILT TO LAST"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight tracking-tight">
            We are a team of independent developers and designers.
          </h2>
        </motion.div>

        {/* Team Grid - Explicit inline animations to prevent opacity bugs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
          {TEAM.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="group flex flex-col gap-5 cursor-pointer"
            >
              {/* Image Container with Dot Matrix Background */}
              <div className="relative w-full aspect-square overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] transition-colors duration-500 group-hover:border-white/10 group-hover:bg-[#111]">
                
                {/* Aceternity Dot Pattern */}
                <div 
                  className="absolute inset-0 z-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)`,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "center center",
                  }}
                />

                {/* Inner Masked Image */}
                <div className="absolute inset-4 overflow-hidden rounded-2xl z-10">
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 saturate-[0.8] group-hover:saturate-100"
                  />
                  {/* Subtle inner vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>

              {/* Text Block */}
              <div className="flex flex-col px-1">
                <span className="font-display text-2xl text-ink tracking-tight transition-colors duration-300 group-hover:text-white">
                  {founder.name}
                </span>
                <span className="font-sans text-sm text-slate mt-1">
                  {founder.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-8 relative">
           <div className="absolute left-1/2 -top-1 w-2 h-2 -translate-x-1/2 rotate-45 border border-gold bg-parchment" />
        </div>

        {/* Spec grid */}
        <motion.div {...fadeUp} className="flex flex-col gap-8">
          <span className="font-mono text-sm tracking-widest uppercase text-gold text-center">
            Technical Specifications
          </span>
          {/* Ensure SpecGrid component handles its own visibility or renders normally */}
          <SpecGrid specs={specs} />
        </motion.div>

      </div>
    </section>
  );
}