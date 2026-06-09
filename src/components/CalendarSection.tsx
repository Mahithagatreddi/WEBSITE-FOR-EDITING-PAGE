"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const FullCalendar = dynamic(
  () => import("@/components/FullCalendar").then((mod) => mod.FullCalendar),
  { ssr: false }
);

export function CalendarSection() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const now = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(now.getDate() + 14);

  const upcomingEvents = events.filter((ev) => {
    const evDate = new Date(ev.date);
    return evDate >= now && evDate <= twoWeeksFromNow;
  });


  return (
    <section className="bg-[#0a0a0b] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8c547]">Schedule</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl">
            Availability & Upcoming Events
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Upcoming 2 weeks */}
          <div className="rounded-2xl border border-[#e8c547]/20 bg-[#141416] p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-2 font-[family-name:var(--font-syne)] text-2xl font-bold text-[#e8c547]">
              <CalendarIcon className="h-6 w-6" /> Next 14 Days
            </h3>
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-4">
                {upcomingEvents.map((ev) => (
                  <div key={ev._id} className="flex gap-4 border-l-2 border-[#e8c547] pl-4">
                    <div className="min-w-16">
                      <p className="text-sm font-bold uppercase text-[#e8c547]">
                        {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-[#f5f2eb]">{ev.title}</p>
                      <p className="flex items-center gap-1 text-sm text-[#9a9590]">
                        <MapPin className="h-3 w-3" /> {ev.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#9a9590]">No events scheduled in the next 2 weeks. Slots are open!</p>
            )}
          </div>

          {/* Full Calendar Grid */}
          <div className="md:col-span-2">
            <FullCalendar events={events} />
          </div>
        </div>
      </div>
    </section>
  );
}
