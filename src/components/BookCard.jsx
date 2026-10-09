import React from 'react';
import { User, Book, Tag } from 'lucide-react';

const categoryColorMap = {
  चरित्र: 'bg-amber-50 text-amber-700 border-amber-200',
  कादंबरी: 'bg-pink-50 text-pink-700 border-pink-200',
  कथा: 'bg-purple-50 text-purple-700 border-purple-200',
  इतिहास: 'bg-orange-50 text-orange-700 border-orange-200',
  प्रवास: 'bg-teal-50 text-teal-700 border-teal-200',
  अर्थशास्त्र: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  धर्म: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  इंग्रजी: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

export default function BookCard({ book, onClick }) {
  const badgeStyle = categoryColorMap[book.subject] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-150 flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            #{book.id}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
            {book.subject}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-indigo-600 transition mb-2" title={book.title}>
          {book.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
          <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{book.author || 'अज्ञात'}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-dashed border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          {book.pages ? (
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
              <Book className="w-3 h-3 text-slate-400" />
              {book.pages} पाने
            </span>
          ) : null}
          {book.remarks && (
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded truncate max-w-[120px]" title={book.remarks}>
              <Tag className="w-3 h-3 text-slate-400" />
              {book.remarks}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {book.status}
        </span>
      </div>
    </div>
  );
}
