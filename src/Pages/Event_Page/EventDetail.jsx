import React from "react";

export default function EventDetail({ event, onClose, onPrev, onNext }) {
  if (!event) return null;

  // Render plain text with preserved line breaks and clickable URLs
  const renderTextWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split("\n").map((line, idx, arr) => {
      const parts = line.split(urlRegex);
      return (
        <React.Fragment key={idx}>
          {parts.map((part, i) => {
            if (/^https?:\/\//.test(part)) {
              return (
                <a
                  key={i}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
          {idx < arr.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-sm">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-3xl mx-4 md:mx-0 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{event.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{event.date}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              <button
                onClick={onNext}
                className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {renderTextWithLinks(event.long || event.desc)}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 flex items-center justify-center hidden md:flex">
              {/* Placeholder image or media */}
              <div className="w-full h-40 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-semibold">
                <img src={event.visual} alt={event.title} className="object-cover h-full w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
