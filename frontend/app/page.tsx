import { StatsOverview } from "@/components/StatsOverview";

export default function Page() {
  return (
    <div className="mt-5 space-y-8">
      <h1 className="text-center text-2xl tracking-tight sm:text-4xl">
        Velkommen til Mediebibliotek
      </h1>

      <p className="mx-auto mt-4 max-w-2xl px-6 text-center text-zinc-400">
        Få oversikt over bøkene og filmene du har lest, sett og eier – og de du
        ønsker å lese og se. Legg til og rediger når som helst.
      </p>
      <StatsOverview/>
    </div>
  )
}
