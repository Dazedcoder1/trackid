import Fork from "./sections/03-Fork/Fork";

function App() {
  return (
    <>
      <Fork />

      <section
        id="institution-track"
        className="min-h-screen bg-stone flex items-center justify-center px-6"
      >
        <div className="max-w-3xl text-center">
          <p className="uppercase tracking-[0.25em] text-accentDeep text-sm mb-4">
            Institution Track
    </p>

    <h2 className="font-display text-5xl text-ink mb-6">
      Safety at Scale
    </h2>

    <div className="divider-teardrop text-slate my-8">
      <span className="bullet"></span>
    </div>

    <p className="text-slate text-lg leading-8">
      Designed for schools, universities, and educational organizations to
      provide visibility, security, and peace of mind across every campus.
    </p>
  </div>
</section>

<section id="family-track"
  className="min-h-screen bg-parchment flex items-center justify-center px-6"
>
  <div className="max-w-3xl text-center">
    <p className="uppercase tracking-[0.25em] text-accentDeep text-sm mb-4">
      Family Track
    </p>

    <h2 className="font-display text-5xl text-ink mb-6">
      Always Connected
    </h2>

    <div className="divider-teardrop text-slate my-8">
      <span className="bullet"></span>
    </div>

    <p className="text-slate text-lg leading-8">
      Designed for families who want to stay connected with the people who
      matter most, offering reassurance through thoughtful technology.
    </p>
  </div>
  </section>

    </>
  );
}

export default App;