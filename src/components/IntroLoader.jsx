import { forwardRef } from 'react';

const IntroLoader = forwardRef((props, ref) => (
  <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
    <span
      ref={ref}
      className="font-mono text-sm md:text-base font-medium text-black tabular-nums"
    >
      0
    </span>
  </div>
));

IntroLoader.displayName = 'IntroLoader';
export default IntroLoader;