import React from "react";

export function ApplicationsUse() {
  const gears = [
    "iPhone 15",
    "iPhone 16",
    "iPhone 17",
    "iPhone 17 Pro",
    "Camera facility available",
    "Gimbal used",
  ];

  return (
    <section className="bg-[#141416] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <h2 className="mb-10 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-[#f5f2eb] md:text-5xl">
          Applications Use & Gear
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {gears.map((item, i) => (
            <div
              key={i}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-[#f5f2eb] shadow-sm backdrop-blur-md transition-colors hover:border-[#e8c547] hover:text-[#e8c547]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
