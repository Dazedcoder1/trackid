import Fork from "./sections/03-Fork/Fork";

function App() {
  return (
    <>
      <Fork />

      <section
        id="institution-track"
        className="min-h-screen bg-gradient-to-b from-parchment to-stone flex items-center justify-center px-6"
      >
        <div className="max-w-3xl text-center">

          <p className="uppercase tracking-[0.35em] text-accentDeep font-mono text-sm mb-5">
            Institution Track
          </p>

          <h2 className="font-display text-6xl text-ink mb-6">
            Safety at Scale
          </h2>

          <div className="divider-teardrop text-gold my-10">
            <span className="bullet"></span>
          </div>

          <p className="text-slate text-xl leading-9">
            Designed for schools, universities, and educational organizations
            to provide visibility, safety, and peace of mind.
          </p>

        </div>
      </section>

      <section
        id="family-track"
        className="min-h-screen bg-gradient-to-b from-stone to-parchment flex items-center justify-center px-6"
      >
        <div className="max-w-3xl text-center">

          <p className="uppercase tracking-[0.35em] text-accentDeep font-mono text-sm mb-5">
            Family Track
          </p>

          <h2 className="font-display text-6xl text-ink mb-6">
            Always Connected
          </h2>

          <div className="divider-teardrop text-gold my-10">
            <span className="bullet"></span>
          </div>

          <p className="text-slate text-xl leading-9">
            Designed for families who want to stay connected with the people
            who matter most through elegant technology.
          </p>

        </div>
      </section>
    </>
  );
}

export default App;