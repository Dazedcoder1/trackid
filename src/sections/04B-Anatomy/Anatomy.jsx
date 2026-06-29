import {
  Feather,
  Droplets,
  BatteryFull,
  Radio,
  ShieldAlert,
  Gem,
} from "lucide-react";
import { motion } from "framer-motion";

import SectionWrapper from "../../components/SectionWrapper";
import Divider from "../../components/Divider";
import PendantCard from "./PendantCard";

import { COPY } from "../../content/copy";
import { ASSETS } from "../../content/assets";

import { fadeUp, staggerContainer } from "../../motion/variants";

export default function Anatomy() {
  const data = COPY.anatomy;

  return (
    <SectionWrapper id="anatomy">

      {/* ==========================================================
                            HERO
      ========================================================== */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]"
      >
        {/* LEFT */}

        <motion.div
          variants={fadeUp}
          className="space-y-8"
        >
          <p className="font-mono uppercase tracking-[0.35em] text-accent text-sm">
            {data.eyebrow}
          </p>

          <h2 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-ink max-w-xl">
            Crafted for every personality.
            <br />
            Designed for everyday protection.
          </h2>

          <p className="max-w-lg text-lg leading-8 text-slate">
            Explore our collection of premium smart pendants where timeless
            craftsmanship meets intelligent protection.
          </p>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          variants={fadeUp}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl scale-110" />

            <img
              src={ASSETS.pendants.classicTeardrop.heroImage}
              alt="TrakID Pendant"
              className="relative z-10 w-[340px] lg:w-[430px]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ==========================================================
                      COLLECTION TITLE
      ========================================================== */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-36 text-center"
      >
        <p className="font-mono uppercase tracking-[0.35em] text-accent text-sm">
          Our Collection
        </p>

        <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink">
          Four Designs.
          <br />
          Endless Stories.
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate">
          Every TrakID pendant blends premium jewellery craftsmanship with
          discreet smart safety technology.
        </p>
      </motion.div>

      {/* ==========================================================
                          COLLECTION GRID
      ========================================================== */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-20 mb-28 grid gap-10 lg:grid-cols-2"
      >
        {data.collectionItems.map((item) => (
          <PendantCard
            key={item.id}
            item={item}
          />
        ))}
      </motion.div>

      {/* ==========================================================
                    FEATURE INTRO
========================================================== */}

<div className="mt-32">
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="mb-12 text-center"
  >
    <p className="font-mono uppercase tracking-[0.35em] text-accent text-sm">
      ENGINEERED FOR EVERYDAY LIFE
    </p>

    <h3 className="mt-5 font-display text-4xl text-ink">
      Built for comfort. Designed for protection.
    </h3>

    <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-slate">
      Every TrakID pendant combines premium materials with reliable
      technology, making it comfortable enough to wear and dependable
      enough to protect.
    </p>
  </motion.div>

{/* ==========================================================
                    FEATURE STRIP
========================================================== */}

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="
    rounded-[32px]
    border
    border-gold/20
    bg-white/60
    backdrop-blur-md
    overflow-hidden
  "
>
  <div className="grid md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-gold/10">

    {[
      {
        icon: Feather,
        title: "Lightweight",
        subtitle: "Everyday comfort",
      },
      {
        icon: Droplets,
        title: "Water Resistant",
        subtitle: "Ready for adventures",
      },
      {
        icon: BatteryFull,
        title: "Long Battery",
        subtitle: "Power that lasts",
      },
      {
        icon: Radio,
        title: "LTE Connected",
        subtitle: "Always reachable",
      },
      {
        icon: ShieldAlert,
        title: "SOS Ready",
        subtitle: "One-touch emergency",
      },
      {
        icon: Gem,
        title: "Made to Wear",
        subtitle: "Designed with children",
      },
    ].map((feature) => {
      const Icon = feature.icon;

      return (
        <div
          key={feature.title}
          className="group p-8 text-center transition-all duration-300 hover:bg-gold/5"
        >
          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-gold/5 transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/10">
              <Icon
                size={24}
                strokeWidth={1.75}
                className="text-accent"
              />
            </div>
          </div>

          <h4 className="font-display text-2xl text-ink">
            {feature.title}
          </h4>

          <p className="mt-3 leading-7 text-slate">
            {feature.subtitle}
          </p>
        </div>
      );
    })}

  </div>
</motion.div>
</div>

      <Divider />

    </SectionWrapper>
  );
}