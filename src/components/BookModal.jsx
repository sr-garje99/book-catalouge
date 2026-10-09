import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Layers, CheckCircle } from 'lucide-react';

export default function BookModal({ book, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!book) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${book.title} - ${book.author} (नोंदणी क्र: ${book.id})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs px-2.5 py-0.5 rounded-md font-mono font-semibold">
            नोंदणी क्रमांक: #{book.id}
          </span>
          <h2 className="text-xl font-bold mt-2.5 leading-snug">{book.title}</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 text-sm">
            <span className="text-slate-500 font-medium">लेखक (Author):</span>
            <span className="col-span-2 font-semibold text-slate-800">{book.author}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 text-sm">
            <span className="text-slate-500 font-medium">विषय (Subject):</span>
            <span className="col-span-2 font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded w-fit">
              {book.subject}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 text-sm">
            <span className="text-slate-500 font-medium">सद्यस्थिती (Status):</span>
            <span className="col-span-2 font-semibold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              {book.status}
            </span>
          </div>

          {book.pages && (
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 text-sm">
              <span className="text-slate-500 font-medium">पृष्ठसंख्या (Pages):</span>
              <span className="col-span-2 font-semibold text-slate-800">{book.pages} पाने</span>
            </div>
          )}

          {book.remarks && (
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 text-sm">
              <span className="text-slate-500 font-medium">शेरा (Remarks):</span>
              <span className="col-span-2 text-slate-700">{book.remarks}</span>
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-semibold transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी झाले!' : 'माहिती कॉपी करा'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
            >
              बंद करा
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
