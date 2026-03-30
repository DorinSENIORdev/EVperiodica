export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-14">
          <section className="space-y-6">
            <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Next.js 16 starter
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                EVperiodica ruleaza acum pe Next.js.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                Proiectul a fost mutat de la Vite la App Router si este pregatit
                pentru dezvoltare in folderul curent.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentatie Next.js
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                href="https://vercel.com/templates?framework=next.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vezi template-uri
              </a>
            </div>
          </section>

          <section className="rounded-[1.5rem] bg-slate-950 p-6 text-slate-50">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Quick start
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Pornire dezvoltare</p>
                <code className="mt-2 block text-sm text-emerald-300">
                  npm run dev
                </code>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Pagina principala</p>
                <code className="mt-2 block text-sm text-sky-300">
                  src/app/page.js
                </code>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Layout global</p>
                <code className="mt-2 block text-sm text-fuchsia-300">
                  src/app/layout.js
                </code>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
