import { groups } from "@/components/StatsOverview";

export default async function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl tracking-tight sm:text-4xl  text-center">
        Velkommen til Mediebibliotek
      </h1>
      
      <p className="mx-auto max-w-2xl text-center px-6 mt-4 text-zinc-400">
        Få oversikt over bøkene og filmene du har lest, sett og eier – og de du ønsker å lese og se. Legg til og rediger når som helst.
      </p>
      {groups.map((group) => (
        <section key={group.label}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
            {group.label}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {group.stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-lg bg-neutral-900 border border-neutral-800 p-6 text-center"
              >
                <p className="text-sm text-neutral-400">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}