import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-200">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span>प्रति पान दाखवा:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-slate-200 rounded px-2 py-1 bg-white font-medium focus:outline-none"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={96}>96</option>
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="पहिले पान"
        >
          <ChevronsLeft className="w-4 h-4 text-slate-600" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="मागे"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>

        <span className="px-3 text-xs md:text-sm font-semibold text-slate-700">
          पान {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="पुढे"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="शेवटचे पान"
        >
          <ChevronsRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
