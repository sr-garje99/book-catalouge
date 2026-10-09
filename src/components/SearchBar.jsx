import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchTerm, onSearchChange, searchField, onFieldChange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex flex-col sm:flex-row items-center gap-2 max-w-4xl mx-auto -mt-6 relative z-10">
      <div className="relative flex-1 w-full flex items-center">
        <Search className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="पुस्तकाचे नाव, लेखक, किंवा नोंदणी क्रमांक (Accession No) शोधा..."
          className="w-full pl-10 pr-10 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none text-base rounded-lg"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            title="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <select
        value={searchField}
        onChange={(e) => onFieldChange(e.target.value)}
        className="w-full sm:w-auto bg-slate-100 border-none text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-lg focus:outline-none cursor-pointer"
      >
        <option value="all">सर्व क्षेत्रे (All)</option>
        <option value="title">पुस्तकाचे नाव (Title)</option>
        <option value="author">लेखक (Author)</option>
        <option value="id">नोंदणी क्रमांक (Acc No)</option>
        <option value="subject">विषय (Subject)</option>
      </select>
    </div>
  );
}
