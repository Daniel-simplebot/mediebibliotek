"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const groups = [
  {
    label: "Bøker",
    stats: [
      { title: "Lest", value: 12 },
      { title: "Eid", value: 8 },
      { title: "På ønskeliste", value: 4 },
    ],
  },
  {
    label: "Filmer",
    stats: [
      { title: "Sett", value: 27 },
      { title: "Eid", value: 9 },
      { title: "På ønskeliste", value: 7 },
    ],
  },
]
export function StatsOverview() {
  return (
    <>
      {groups.map((group) => (
        <section key={group.label} className="space-y-3 px-6 text-center">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {group.label}
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {group.stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="items-center pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-3xl font-bold">
                  {stat.value}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
