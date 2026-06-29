import { motion } from "framer-motion";

import SectionWrapper from "../../components/SectionWrapper";
import Divider from "../../components/Divider";

import { COPY } from "../../content/copy";
import { ASSETS } from "../../content/assets";

import { fadeUp, staggerContainer } from "../../motion/variants";

export default function ComplianceCase() {
  const data = COPY.complianceCase;

  return (
    <SectionWrapper id="compliance-case">
     {/* ==========================================================
                        HERO
========================================================== */}

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  className="relative grid gap-20 lg:grid-cols-[1fr_620px] items-center"
>

  {/* Decorative Glow */}
  <div className="absolute right-0 top-10 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />

  {/* LEFT */}

  <motion.div
    variants={fadeUp}
    className="relative z-10"
  >

    <p className="font-mono uppercase tracking-[0.45em] text-accent text-sm">
      {data.eyebrow}
    </p>

    <h2 className="mt-6 font-display text-5xl md:text-7xl xl:text-[82px] leading-[0.95] tracking-tight text-ink max-w-xl">
      {data.headline}
    </h2>

    <p className="mt-8 max-w-md text-lg leading-8 text-slate">
      {data.body}
    </p>

    <div className="mt-12 flex gap-5">

    <button className="rounded-full border border-gold/30 bg-white/60 px-8 py-4 transition-all duration-300 hover:bg-gold/10 hover:border-gold">
        Explore Solution
    </button>

    <button className="rounded-full border border-gold/30 bg-white/60 px-8 py-4 transition-all duration-300 hover:bg-gold/10 hover:border-gold">
        Learn More
    </button>

    </div>

  </motion.div>

  {/* RIGHT */}

  <motion.div
    variants={fadeUp}
    className="grid grid-cols-[280px_1fr] items-center gap-10"
  >

    {/* Pendant */}

    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >

      <div className="absolute inset-0 rounded-full bg-gold/20 blur-[90px]" />

      <div className="relative h-[420px] rounded-[120px] border border-gold/20 bg-white/70 backdrop-blur-xl shadow-2xl flex items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-parchment">
            💎
          </div>

          <h4 className="mt-6 font-display text-2xl">
            Pendant
          </h4>

          <p className="mt-2 text-sm tracking-[0.25em] uppercase text-accent">
            Image Coming Soon
          </p>

        </div>

      </div>

    </motion.div>

    {/* Timeline */}

    <div className="relative">

      <div className="absolute left-5 top-10 bottom-10 w-px bg-gold/20" />

      {[
        {
          title:"Acceptance",
          desc:"Children naturally choose to wear TrakID."
        },
        {
          title:"Daily Wear",
          desc:"Comfortable enough for everyday life."
        },
        {
          title:"Continuous Safety",
          desc:"Protection only works when it stays on."
        }
      ].map((item,index)=>(
        <motion.div
          key={item.title}
          whileHover={{
            x:8,
            scale:1.02
          }}
          transition={{
            duration:.25
          }}
          className="relative mb-8 ml-10 rounded-[28px] border border-gold/20 bg-white/80 p-6 shadow-lg backdrop-blur"
        >

          <div className="absolute -left-[33px] top-8 h-4 w-4 rounded-full border-4 border-parchment bg-gold" />

          <h4 className="font-display text-2xl text-ink">
            {item.title}
          </h4>

          <p className="mt-3 leading-7 text-slate">
            {item.desc}
          </p>

        </motion.div>
      ))}

    </div>

  </motion.div>

</motion.div>
   {/* ==========================================================
                    STATISTIC
========================================================== */}

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="relative mt-36 overflow-hidden rounded-[36px] border border-gold/20 bg-white/80 backdrop-blur-xl shadow-2xl"
>
  {/* Decorative Glow */}
  <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-[100px]" />

  <div className="relative grid items-center gap-8 p-10 lg:grid-cols-[120px_220px_1fr_120px]">

    {/* Left Icon */}
    <div className="flex justify-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-parchment shadow-md">
        <span className="text-4xl">🛡</span>
      </div>
    </div>

    {/* Number */}
    <div className="text-center lg:text-left">
      <p className="font-display text-7xl md:text-8xl leading-none text-accent">
        {data.statistic.value}
      </p>

      <p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-accent">
        Compliance Gain
      </p>
    </div>

    {/* Text */}
    <div>
      <h3 className="font-display text-3xl text-ink">
        {data.statistic.title}
      </h3>

      <p className="mt-3 max-w-xl leading-8 text-slate">
        {data.statistic.subtitle}
      </p>

      <div className="mt-6 h-px w-40 bg-gold/30" />

      <p className="mt-5 text-sm uppercase tracking-[0.3em] text-slate">
        Internal Pilot Evaluation
      </p>
    </div>

    {/* Decorative */}
    <div className="hidden lg:flex justify-center">
      <div className="text-6xl opacity-50">
        ✦
      </div>
    </div>

  </div>
</motion.div>

      {/* ==========================================================
                        VALUE CARDS
      ========================================================== */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-24 grid gap-10 lg:grid-cols-3"
      >
        {data.valueCards.map((card) => (
          <motion.div
  key={card.title}
  variants={fadeUp}
  whileHover={{
    y: -10,
    scale: 1.02,
  }}
  transition={{
    duration: 0.3,
  }}
  className="
    group
    relative
    overflow-hidden
    rounded-[32px]
    border
    border-gold/20
    bg-white/80
    p-10
    backdrop-blur-xl
    shadow-lg
    transition-all
    duration-300
    hover:shadow-2xl
    hover:border-gold/40
  "
>

  {/* Glow */}

  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

  {/* Icon */}

  <div className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-parchment text-2xl">

    {card.title === "Acceptance" && "✓"}

    {card.title === "Daily Wear" && "◉"}

    {card.title === "Continuous Safety" && "🛡"}

  </div>

  <h4 className="relative font-display text-3xl text-ink">
    {card.title}
  </h4>

  <div className="mt-5 h-[2px] w-16 rounded-full bg-gold" />

  <p className="relative mt-6 leading-8 text-slate">
    {card.description}
  </p>

</motion.div>
        ))}
      </motion.div>
      {/* ==========================================================
                    COMPLIANCE GAP
========================================================== */}
<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="mt-36"
>
  {/* Heading */}

  <motion.div
    variants={fadeUp}
    className="mx-auto max-w-3xl text-center"
  >
    <p className="font-mono uppercase tracking-[0.35em] text-accent text-sm">
      Compliance Journey
    </p>

    <h2 className="mt-6 font-display text-5xl text-ink">
      Behaviour matters more than technology.
    </h2>

    <p className="mt-6 text-lg leading-8 text-slate">
      Traditional trackers fail because children stop wearing them.
      TrakID is designed to become part of everyday life.
    </p>
  </motion.div>

  {/* Journey */}

  <div className="mt-24 grid lg:grid-cols-[1fr_280px_1fr] gap-12 items-center">

    {/* Left */}

    <div className="space-y-12">

      {[
        "Removed",
        "Hidden",
        "Forgotten"
      ].map((item)=>(
        <motion.div
          key={item}
          variants={fadeUp}
          className="flex items-center gap-5"
        >

          <div className="h-4 w-4 rounded-full bg-alert"/>

          <div>

            <h3 className="font-display text-3xl">
              {item}
            </h3>

            <p className="text-slate mt-2">
              Traditional trackers frequently end up {item.toLowerCase()}.
            </p>

          </div>

        </motion.div>
      ))}

    </div>

    {/* Center Pendant */}

    <motion.div
      animate={{
        y:[-10,10,-10]
      }}
      transition={{
        repeat:Infinity,
        duration:6
      }}
      className="relative flex justify-center"
    >

      <div className="absolute h-72 w-72 rounded-full bg-gold/15 blur-[90px]" />

      <div className="relative flex h-[420px] w-[250px] items-center justify-center rounded-[120px] border border-gold/20 bg-white/70 shadow-2xl backdrop-blur-xl">

        <div className="text-center">

          <div className="text-7xl">
            💎
          </div>

          <p className="mt-5 uppercase tracking-[0.35em] text-accent text-xs">
            Pendant
          </p>

        </div>

      </div>

    </motion.div>

    {/* Right */}

    <div className="space-y-12">

      {[
        "Comfortable",
        "Always On",
        "Jewellery Inspired"
      ].map((item)=>(
        <motion.div
          key={item}
          variants={fadeUp}
          className="flex items-center gap-5 justify-end text-right"
        >

          <div>

            <h3 className="font-display text-3xl">
              {item}
            </h3>

            <p className="text-slate mt-2">
              Designed to encourage continuous everyday wear.
            </p>

          </div>

          <div className="h-4 w-4 rounded-full bg-safe"/>

        </motion.div>
      ))}

    </div>

  </div>

  {/* Timeline */}

  <div className="mt-24">

    <div className="relative flex items-center justify-between">

      <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gold/20"/>

      {[
        "Removed",
        "Hidden",
        "Forgotten",
        "Always Worn"
      ].map((item,index)=>(
        <div
          key={item}
          className="relative z-10 flex flex-col items-center"
        >

          <div
            className={`h-6 w-6 rounded-full ${
              index===3
                ? "bg-safe"
                : "bg-gold"
            }`}
          />

          <p className="mt-4 font-display">
            {item}
          </p>

        </div>
      ))}

    </div>

  </div>

</motion.section>
{/* ==========================================================
                    PREMIUM COMPARISON
========================================================== */}

<motion.div
  variants={fadeUp}
  className="mt-32 rounded-[40px] border border-gold/20 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden"
>

  {/* Header */}

  <div className="grid lg:grid-cols-2">

    <div className="bg-stone/30 p-10 text-center">
      <p className="font-mono uppercase tracking-[0.35em] text-slate text-xs">
        Traditional
      </p>

      <h3 className="mt-4 font-display text-4xl text-slate">
        GPS Tracker
      </h3>
    </div>

    <div className="border-l border-gold/20 bg-gold/5 p-10 text-center">
      <p className="font-mono uppercase tracking-[0.35em] text-accent text-xs">
        TrakID
      </p>

      <h3 className="mt-4 font-display text-4xl text-accent">
        Jewellery First
      </h3>
    </div>

  </div>

  {/* Rows */}

  {data.comparison.map((item,index)=>(
    <motion.div
      key={index}
      whileHover={{
        backgroundColor:"rgba(201,169,97,.04)"
      }}
      className="grid lg:grid-cols-2 border-t border-gold/10"
    >

      <div className="flex items-center gap-5 p-8">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-alert/10 text-alert">
          ❌
        </div>

        <p className="text-slate text-lg">
          {item.traditional}
        </p>

      </div>

      <div className="border-l border-gold/10 flex items-center gap-5 p-8">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-safe/10 text-safe">
          ✅
        </div>

        <p className="text-ink text-lg font-medium">
          {item.trakid}
        </p>

      </div>

    </motion.div>
  ))}

</motion.div>
{/* ==========================================================
                    BENEFITS
========================================================== */}

<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  className="mt-32"
>
  <motion.div
    variants={fadeUp}
    className="mx-auto max-w-3xl text-center"
  >
    <p className="font-mono text-sm uppercase tracking-[0.35em] text-accent">
      Why TrakID Works
    </p>

    <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink">
      Designed around behaviour, not just technology.
    </h2>
  </motion.div>

  <motion.div
    variants={staggerContainer}
    className="mt-16 grid gap-8 md:grid-cols-3"
  >
    {data.benefits.map((benefit) => (
      <motion.div
        key={benefit.title}
        variants={fadeUp}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="rounded-[36px] border border-gold/20 bg-white/70 p-10 backdrop-blur shadow-sm hover:border-gold/40 hover:shadow-lg"
      >
        <div className="mb-6 h-[2px] w-14 rounded-full bg-gold" />

        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-parchment text-2xl">
  ✦
    </div>

    <h3 className="font-display text-2xl text-ink">
    {benefit.title}
    </h3>

    <p className="mt-4 leading-7 text-slate">
    {benefit.description}
    </p>

        <p className="mt-4 leading-7 text-slate">
          {benefit.description}
        </p>
      </motion.div>
    ))}
  </motion.div>
</motion.section>

{/* ==========================================================
                    QUOTE
========================================================== */}

<motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="mt-36"
>
  <div className="mx-auto max-w-4xl text-center">
    <p className="font-display text-3xl md:text-5xl leading-relaxed text-ink italic">
     <span className="text-7xl text-gold/40">❝</span>

    <br />

    {data.quote}

    <br />

    <span className="text-7xl text-gold/40">❞</span>
    </p>

    <div className="mx-auto mt-10 h-px w-32 bg-gold/40" />

    <p className="mt-8 font-mono uppercase tracking-[0.35em] text-accent text-sm">
      Continuous Protection Through Better Compliance
    </p>
  </div>
</motion.section>

    
    
  
    <Divider />
    </SectionWrapper>
);
}