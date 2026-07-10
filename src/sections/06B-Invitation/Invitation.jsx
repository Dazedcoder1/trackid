import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import SectionWrapper from "../../components/SectionWrapper";
import Divider from "../../components/Divider";
import FormField from "../06A-InstitutionalAsk/FormField";

import { submitLead } from "../../services/leadSubmission";
import { fadeUp, staggerContainer } from "../../motion/variants";

const INVITATION_COPY = {
  eyebrow: "Family Invitation",
  headline: "Shop the Collection",
  subtitle:
    "Join the waitlist for TrakID's family collection, designed as a keepsake children can wear with comfort, confidence, and a little everyday magic.",
  errorRequired: "This field is required.",
  submitLabel: "Join the Waitlist",
  successTitle: "You're On The List",
  successMessage:
    "Thank you for joining the family waitlist. We'll share collection updates, launch timing, and gifting details as soon as they are ready.",
};

const INVITATION_FORM_FIELDS = [
  {
    name: "parentName",
    label: "Your name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "selectedDesign",
    label: "Pendant design",
    type: "select",
    required: true,
    options: [
      {
        value: "starlight",
        label: "Starlight Pendant",
      },
      {
        value: "moonbeam",
        label: "Moonbeam Pendant",
      },
      {
        value: "sunrise",
        label: "Sunrise Pendant",
      },
      {
        value: "heartline",
        label: "Heartline Pendant",
      },
    ],
  },
  {
    name: "giftIntent",
    label: "Who is this for?",
    type: "select",
    required: true,
    options: [
      {
        value: "my-child",
        label: "My child",
      },
      {
        value: "grandchild",
        label: "My grandchild",
      },
      {
        value: "family-gift",
        label: "A family gift",
      },
      {
        value: "still-deciding",
        label: "Still deciding",
      },
    ],
  },
  {
    name: "message",
    label: "Anything you would like us to know?",
    type: "textarea",
    placeholder:
      "Tell us about the child, the occasion, or the kind of keepsake you are hoping for.",
    required: false,
  },
];

export default function Invitation() {
  const copy = INVITATION_COPY;

  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    selectedDesign: "",
    giftIntent: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validate() {
    const nextErrors = {};

    INVITATION_FORM_FIELDS.forEach((field) => {
      if (field.required && !String(formData[field.name] || "").trim()) {
        nextErrors[field.name] = copy.errorRequired;
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    const result = await submitLead({
      ...formData,
      source: "section-06b-invitation",
      track: "family",
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    }
  }

  return (
    <SectionWrapper id="invitation">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-20 lg:grid-cols-[1fr_500px]"
      >
        {/* LEFT COLUMN */}

        <motion.div variants={fadeUp} className="relative">
          {/* Background Decoration */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -top-20 left-10 h-64 w-64 rounded-full bg-amber-200/15 blur-3xl pointer-events-none"></div>
          <div className="absolute top-40 right-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl pointer-events-none"></div>

          {/* Eyebrow */}
          <p className="font-mono text-sm uppercase tracking-[0.4em] text-accent">
            {copy.eyebrow}
          </p>

          {/* Heading */}
          <h2 className="mt-6 max-w-lg font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-ink">
            {copy.headline}
          </h2>

          {/* Subtitle */}
          <p className="mt-8 max-w-xl text-xl leading-9 text-slate">
            {copy.subtitle}
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center gap-4 mt-10 mb-14">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-300"></div>

            <div className="h-3 w-3 rotate-45 border border-amber-400 bg-white"></div>

            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-5">
            {[
              {
                icon: Sparkles,
                title: "Made To Feel Special",
                text: "A safety wearable shaped like jewellery, so children feel proud to wear it every day.",
              },
              {
                icon: Gift,
                title: "A Meaningful Gift",
                text: "A thoughtful way for grandparents and family members to give something protective and personal.",
              },
              {
                icon: HeartHandshake,
                title: "For Family Peace Of Mind",
                text: "Designed to support parents and caregivers without making the child feel monitored.",
              },
              {
                icon: ShieldCheck,
                title: "Protection With Warmth",
                text: "Reliable location features wrapped in a softer, more emotionally familiar form.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                border-gold/20
                  bg-gradient-to-br
                from-white
                via-white
                to-amber-50/40
                  backdrop-blur-sm
                  p-8
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-amber-300/40
                  hover:bg-white
                  hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]"
                >
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-70"></div>
                  {/* Card Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-white/50 blur-3xl"></div>
                  </div>

                  <div className="relative flex gap-6">
                    <div
                      className="h-[45px] w-[45px] shrink-0 items-center justify-center rounded-3xl
              bg-gradient-to-br from-white via-amber-50 to-accent/15
              shadow-md transition-all duration-500
              group-hover:scale-110
              group-hover:rotate-6
              group-hover:shadow-lg"
                    >
                      <Icon size={34} strokeWidth={2} className="text-accent" />
                    </div>

                    <div>
                      <h3 className="font-display text-[28px] leading-tight text-ink">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-lg leading-8 text-slate">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        {/* RIGHT COLUMN */}

        <motion.div
          variants={fadeUp}
          className="
    relative
    overflow-hidden
    rounded-[40px]
    border
    border-gold/20
    bg-white/75
    p-10
    shadow-[0_35px_80px_rgba(0,0,0,0.12)]
    backdrop-blur-xl
    transition-all
    duration-500
    hover:shadow-[0_40px_90px_rgba(0,0,0,0.14)]
  "
        >
          {/* Background Glow */}
          <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-accent/10 blur-3xl pointer-events-none"></div>

          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl pointer-events-none"></div>

          {submitted ? (
            <div className="relative flex min-h-[560px] flex-col items-center justify-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent/10 to-amber-100 shadow-lg">
                <Gift size={42} strokeWidth={2} className="text-accent" />
              </div>

              <h3 className="mt-8 font-display text-5xl text-ink">
                {copy.successTitle}
              </h3>

              <p className="mt-6 max-w-md text-lg leading-8 text-slate">
                {copy.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-7">
              {/* Form Heading */}

              <div>
                <div className="inline-flex items-center rounded-full border border-amber-400/50 bg-amber-50 px-4 py-2 text-xs font-semibold tracking-wide text-amber-800 mb-5">
                  <Sparkles size={14} className="mr-2 text-amber-700" />
                  Early Access
                </div>
                <p className="font-mono uppercase tracking-[0.3em] text-xs text-accent">
                  Family Waitlist
                </p>

                <h3 className="mt-2 font-display text-3xl text-ink">
                  Reserve Your Place
                </h3>

                <p className="mt-3 text-slate leading-7">
                  Complete the form below and we'll notify you as soon as the
                  collection becomes available.
                </p>
              </div>

              {INVITATION_FORM_FIELDS.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  error={errors[field.name]}
                  onChange={handleChange}
                />
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="
group
mt-4
flex
w-full
items-center
justify-center
gap-3
rounded-full
bg-gradient-to-r
from-accent
to-amber-500
px-8
py-4
font-medium
text-white
shadow-lg
transition-all
duration-300
hover:-translate-y-1
hover:scale-[1.02]
hover:brightness-105
hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
disabled:cursor-not-allowed
disabled:opacity-70
"
              >
                {submitting ? "Submitting..." : copy.submitLabel}

                {!submitting && (
                  <ChevronRight
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>

              {/* Trust Note */}
              <p className="text-center text-sm text-slate/80">
                No spam. We'll only contact you with launch updates and
                collection news.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
      <Divider />
    </SectionWrapper>
  );
}
