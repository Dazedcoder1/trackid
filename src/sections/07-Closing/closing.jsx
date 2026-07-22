import { motion } from 'framer-motion';
import { fadeUp } from '../../motion/variants';
import { COPY } from '../../content/copy';
import * as Icons from 'lucide-react';
import OutlineMarquee from '../../components/OutlineMarquee';

const { brandStatement, footerColumns, socialLinks, copyright } = COPY.closing;

// Kept from the original copy so no content is lost — just re-labeled to match
// the "Register" column in the reference design.
const registerLinks = [
  { label: 'Sign Up', href: '#' },
  { label: 'Login', href: '#' },
  { label: 'Forgot Password', href: '#' },
];

export default function Closing() {
  const pagesCol = footerColumns.find((c) => c.heading === 'Product') || footerColumns[0];
  const legalCol = footerColumns.find((c) => c.heading === 'Legal') || footerColumns[2];
  const companyCol = footerColumns.find((c) => c.heading === 'Company');

  return (
    <section id="epilogue" className="relative bg-parchment pt-20 pb-16 px-8 md:px-12 overflow-hidden">
      {/* Epilogue banner — the wordmark drifting past in outline, OSOS-style */}
      <OutlineMarquee text={brandStatement} rows={3} brightRow={1} className="mb-20 -mx-8 md:-mx-12" />

      <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col gap-24">

        <motion.div
          {...fadeUp}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-16"
        >
          {/* Brand block */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-sm text-parchment">
                  {brandStatement.charAt(0)}
                </span>
              </div>
              <span className="font-display font-bold text-lg text-ink tracking-tight">
                {brandStatement}
              </span>
            </div>
            <p className="font-body text-xs text-slate">
              {copyright}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-14 gap-y-14">

            <div className="flex flex-col gap-5">
              <span className="font-display font-semibold text-sm text-ink">
                Pages
              </span>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="#" className="font-body text-sm text-slate hover:text-ink transition-colors duration-200">
                    All Products
                  </a>
                </li>
                {pagesCol.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-sm text-slate hover:text-ink transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <span className="font-display font-semibold text-sm text-ink">
                Company
              </span>
              <ul className="flex flex-col gap-4">
                {companyCol?.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-sm text-slate hover:text-ink transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <span className="font-display font-semibold text-sm text-ink">
                Socials
              </span>
              <ul className="flex flex-col gap-4">
                {socialLinks.map((s) => {
                  const LucideIcon = Icons[s.icon];
                  return (
                    <li key={s.label}>
                      <a href={s.href} className="inline-flex items-center gap-2 font-body text-sm text-slate hover:text-ink transition-colors duration-200">
                        {LucideIcon && <LucideIcon size={16} />}
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <span className="font-display font-semibold text-sm text-ink">
                Legal
              </span>
              <ul className="flex flex-col gap-4">
                {legalCol.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-sm text-slate hover:text-ink transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <span className="font-display font-semibold text-sm text-ink">
                Register
              </span>
              <ul className="flex flex-col gap-4">
                {registerLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-sm text-slate hover:text-ink transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Giant watermark brand name */}
      <div className="relative w-full mt-6 pointer-events-none select-none overflow-hidden leading-none">
        <span
          className="block w-full text-center font-display font-bold text-ink/[0.06] leading-none"
          style={{ fontSize: 'clamp(4rem, 17vw, 15rem)', transform: 'translateY(8%)' }}
        >
          {brandStatement.toUpperCase()}
        </span>
      </div>

      </div>
    </section>
  );
}