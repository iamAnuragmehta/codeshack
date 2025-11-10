import React from "react";

export default function Timeline({ events = [], onSelect = () => {} }) {
  return (
    <div className="relative py-6 md:py-8 w-full max-w-4xl mx-auto">
      {/* vertical line for md+ */}
      {/* <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gray-200" /> */}

      <div className="space-y-8">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start">
            {/* dot on line: inline on mobile, absolute on md+ */}
            {/* <div className="relative flex flex-col items-center mr-4 md:mr-12 min-w-12 hidden md:flex">
              <div className="mx-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-indigo-600 ring-4 ring-white shadow-lg md:absolute md:left-5 md:-top-2" />
            </div> */}

            {/* event card */}
            <div className="flex-1 md:ml-0 ml-2">
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onSelect(ev.id);
                }}
                className="p-4 md:p-6 bg-white rounded-2xl shadow cursor-pointer hover:shadow-lg transition flex items-center gap-4 md:gap-6 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                onClick={() => onSelect(ev.id)}
              >
                <img
                  src={
                    ev.visual ||
                    "https://source.unsplash.com/80x80/?event,technology"
                  }
                  alt={ev.title}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border border-gray-200 shadow shrink-0"
                  loading="lazy"
                />
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {ev.title}
                    </h3>
                    <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                      {ev.date}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    {ev.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
