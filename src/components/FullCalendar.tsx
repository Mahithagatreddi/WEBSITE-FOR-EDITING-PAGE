"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function FullCalendar({ events }: { events: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState<any[] | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const daysInterval = eachDayOfInterval({ start: startDate, end: endDate });

  const getEventCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "wedding":
        return "bg-[#e8c547]"; // Gold
      case "birthday":
        return "bg-blue-400";
      case "brand":
        return "bg-emerald-400";
      case "event":
      default:
        return "bg-purple-400";
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#f5f2eb]">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="rounded-lg bg-white/5 p-2 transition hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={nextMonth}
            className="rounded-lg bg-white/5 p-2 transition hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wider text-[#9a9590]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {daysInterval.map((day) => {
          const dayEvents = events.filter((ev) =>
            isSameDay(new Date(ev.date), day)
          );
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <div
              key={day.toString()}
              onClick={() => dayEvents.length > 0 && setSelectedDayEvents(dayEvents)}
              className={`min-h-[80px] rounded-lg border p-1 transition-colors md:p-2 ${
                isCurrentMonth
                  ? "border-white/5 bg-[#1a1a1c]"
                  : "border-transparent bg-transparent opacity-30"
              } ${
                dayEvents.length > 0
                  ? "cursor-pointer hover:border-[#e8c547]/50"
                  : ""
              }`}
            >
              <p
                className={`text-right text-xs md:text-sm ${
                  isSameDay(day, new Date())
                    ? "font-bold text-[#e8c547]"
                    : "text-[#9a9590]"
                }`}
              >
                {format(day, "d")}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {dayEvents.map((ev, i) => (
                  <div
                    key={ev._id || i}
                    title={ev.title}
                    className={`h-2 w-2 rounded-full ${getEventCategoryColor(
                      ev.category
                    )}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-[#9a9590]">
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#e8c547]"></div> Wedding</div>
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-400"></div> Birthday</div>
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-400"></div> Brand</div>
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-purple-400"></div> Event</div>
      </div>

      {/* Event Details Modal */}
      {selectedDayEvents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[#e8c547]/20 bg-[#141416] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#f5f2eb]">
                {format(new Date(selectedDayEvents[0].date), "MMMM d, yyyy")}
              </h4>
              <button
                onClick={() => setSelectedDayEvents(null)}
                className="rounded-full bg-white/5 p-1 text-[#9a9590] transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {selectedDayEvents.map((ev, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${getEventCategoryColor(
                      ev.category
                    )}`}
                  />
                  <div>
                    <p className="font-bold text-[#e8c547]">{ev.title}</p>
                    <p className="text-sm text-[#f5f2eb] capitalize">{ev.category}</p>
                    <p className="mt-1 text-sm text-[#9a9590]">{ev.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
