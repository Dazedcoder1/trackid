import { forwardRef } from 'react';
import { COPY } from '../content/copy';
import IntroLoader from './IntroLoader';

const IntroCurtain = forwardRef(
  ({ smokeVideoRef, loaderRef, cornerTagRef, cornerCollectionRef, cornerFeatureRef, cornerStatusRef }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 z-50 bg-ink overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        <video
          ref={smokeVideoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.12,
          }}
        >
          <source src="/assets/video/smoke.mp4" type="video/mp4" />
        </video>

        <IntroLoader ref={loaderRef} />

        {/* Four-column header row — flex + justify-between so all four
            space evenly across the true full width, instead of mixing
            fixed-pixel corner insets with raw viewport percentages. */}
        <div className="absolute top-8 left-8 right-8 z-10 flex justify-between pointer-events-none">

          {/* Column 1: brand + tagline */}
          <div ref={cornerTagRef} className="max-w-[200px]" style={{ opacity: 0 }}>
            <div className="font-mono text-sm uppercase tracking-premium text-black font-bold mb-1.5">
              {COPY.hero.wordmark}
            </div>
            <div className="font-mono text-xs uppercase tracking-normal text-black/80 leading-relaxed font-medium">
              {COPY.hero.tagline}
            </div>
          </div>

          {/* Column 2: collection marker */}
          <div ref={cornerCollectionRef} className="max-w-[200px]" style={{ opacity: 0 }}>
            <div className="font-mono text-sm uppercase tracking-premium text-black font-bold mb-1.5">
              The Collection
            </div>
            <div className="font-mono text-xs uppercase tracking-normal text-black/70 leading-relaxed font-medium">
              {COPY.hero.showcase.productName}
            </div>
          </div>

          {/* Column 3: feature/spec line */}
          <div ref={cornerFeatureRef} className="max-w-[200px]" style={{ opacity: 0 }}>
            <div className="font-mono text-sm uppercase tracking-premium text-black font-bold mb-1.5">
              Inside
            </div>
            <div className="font-mono text-xs uppercase tracking-normal text-black/70 leading-relaxed font-medium">
              {COPY.hero.showcase.features.join(' · ')}
            </div>
          </div>

          {/* Column 4: status cluster, right-aligned */}
          <div ref={cornerStatusRef} className="text-right" style={{ opacity: 0 }}>
            <div className="font-mono text-sm uppercase tracking-premium text-black font-bold mb-1">
              Unveiling
            </div>
            <div className="font-mono text-xs uppercase tracking-normal text-black/70 font-medium">
              Est. 2026
            </div>
          </div>

        </div>
      </div>
    );
  }
);

IntroCurtain.displayName = 'IntroCurtain';
export default IntroCurtain;