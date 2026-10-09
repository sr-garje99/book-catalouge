import React from 'react';
import { BookOpen, Upload, Layers } from 'lucide-react';
import { safeJsonParse } from '../utils/normalizeData';

export default function Navbar({ bookCount, onFileUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') return;
        const json = safeJsonParse(text);
        if (!Array.isArray(json)) {
          alert('कृपया पुस्तकांची यादी असलेली JSON फाईल (Array) निवडा.');
          return;
        }
        onFileUpload(json);
      } catch (err) {
        alert('JSON फाईल वाचताना त्रुटी: ' + err.message);
      }
    };
    reader.readAsText(file);
    // Reset file input so re-selecting same file works
    e.target.value = '';
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shadow-inner">
            <BookOpen className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ग्रंथालय पुस्तक सूची</h1>
            <p className="text-xs text-slate-300">Library Catalog & Search System</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-2 text-xs font-semibold text-sky-300">
            <Layers className="w-4 h-4" />
            <span>{bookCount.toLocaleString('en-IN')} पुस्तके</span>
          </div>

          {/* <label className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-semibold px-3.5 py-2 rounded-lg cursor-pointer transition shadow-sm">
            <Upload className="w-4 h-4" />
            <span>नवीन JSON अपलोड करा</span>
            <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </label> */} 
        </div>
      </div>
    </header>
  );
}
