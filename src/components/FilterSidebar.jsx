import React from 'react';

export default function FilterSidebar({
  subjects,
  selectedSubject,
  onSelectSubject,
  totalCount,
}) {
  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm h-fit">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          विषय वर्गवारी (Categories)
        </h2>
        {selectedSubject !== 'all' && (
          <button
            onClick={() => onSelectSubject('all')}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            सर्व पहा
          </button>
        )}
      </div>

      <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
        <button
          onClick={() => onSelectSubject('all')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
            selectedSubject === 'all'
              ? 'bg-indigo-50 text-indigo-700 font-bold'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>सर्व विषय</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {totalCount}
          </span>
        </button>

        {subjects.map(([subject, count]) => (
          <button
            key={subject}
            onClick={() => onSelectSubject(subject)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition text-left ${
              selectedSubject === subject
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="truncate pr-2">{subject}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                selectedSubject === subject
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
