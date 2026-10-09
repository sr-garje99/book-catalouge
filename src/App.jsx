import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import Pagination from './components/Pagination';
import { parseLibraryData, safeJsonParse } from './utils/normalizeData';
import { BookX, ArrowUpDown } from 'lucide-react';

export default function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [activeBook, setActiveBook] = useState(null);

  // Load dataset from public/combined.json
  useEffect(() => {
    fetch('/combined.json')
      .then((res) => {
        if (!res.ok) throw new Error('Data file not found: ' + res.status);
        return res.text();
      })
      .then((text) => {
        const raw = safeJsonParse(text);
        setBooks(parseLibraryData(raw));
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn('Load error:', err);
        setIsLoading(false);
      });
  }, []);

  const handleFileUpload = (rawJson) => {
    const parsed = parseLibraryData(rawJson);
    setBooks(parsed);
    setSelectedSubject('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const subjectCounts = useMemo(() => {
    const counts = {};
    books.forEach((b) => {
      const s = b.subject || 'इतर';
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [books]);

  const filteredBooks = useMemo(() => {
    let list = books;

    if (selectedSubject !== 'all') {
      list = list.filter((b) => b.subject === selectedSubject);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter((b) => {
        const titleMatch = (b.title || '').toLowerCase().includes(q);
        const authorMatch = (b.author || '').toLowerCase().includes(q);
        const idMatch = (b.id || '').toLowerCase().includes(q);
        const subjMatch = (b.subject || '').toLowerCase().includes(q);
        const remMatch = (b.remarks || '').toLowerCase().includes(q);

        if (searchField === 'title') return titleMatch;
        if (searchField === 'author') return authorMatch;
        if (searchField === 'id') return idMatch;
        if (searchField === 'subject') return subjMatch;
        return titleMatch || authorMatch || idMatch || subjMatch || remMatch;
      });
    }

    const sorted = [...list];
    if (sortBy === 'title-asc') {
      sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'title-desc') {
      sorted.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    } else if (sortBy === 'id-asc') {
      sorted.sort((a, b) => (parseInt(a.id) || 0) - (parseInt(b.id) || 0));
    } else if (sortBy === 'id-desc') {
      sorted.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
    } else if (sortBy === 'pages-desc') {
      sorted.sort((a, b) => (b.pages || 0) - (a.pages || 0));
    }

    return sorted;
  }, [books, selectedSubject, searchTerm, searchField, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchField, selectedSubject, sortBy, pageSize]);

  const totalPages = Math.ceil(filteredBooks.length / pageSize) || 1;
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBooks.slice(start, start + pageSize);
  }, [filteredBooks, currentPage, pageSize]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar bookCount={books.length} onFileUpload={handleFileUpload} />

      <main className="max-w-7xl mx-auto px-4 w-full flex-1 mb-12 mt-12">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchField={searchField}
          onFieldChange={setSearchField}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterSidebar
              subjects={subjectCounts}
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
              totalCount={books.length}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
              <div className="text-sm text-slate-600">
                एकूण सापडलेली पुस्तके: <strong className="text-slate-900">{filteredBooks.length.toLocaleString('en-IN')}</strong>
                {selectedSubject !== 'all' && <span className="ml-1 text-slate-500">• विषय: <em>{selectedSubject}</em></span>}
                {searchTerm && <span className="ml-1 text-slate-500">• शोध: "<em>{searchTerm}</em>"</span>}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold py-1.5 px-2.5 rounded-lg focus:outline-none cursor-pointer"
                >
                  <option value="relevance">मूळ क्रम (Default)</option>
                  <option value="title-asc">नाव (A-Z / अ ते ज्ञ)</option>
                  <option value="title-desc">नाव (Z-A)</option>
                  <option value="id-asc">नोंदणी क्र. (लहान ते मोठा)</option>
                  <option value="id-desc">नोंदणी क्र. (मोठा ते लहान)</option>
                  <option value="pages-desc">पृष्ठसंख्या (जास्त ते कमी)</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-20 text-slate-400">पुस्तके लोड होत आहेत...</div>
            ) : paginatedBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedBooks.map((book) => (
                  <BookCard
                    key={book.id + book.title}
                    book={book}
                    onClick={() => setActiveBook(book)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <BookX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 text-lg">कोणतेही पुस्तक आढळले नाही</h3>
                <p className="text-sm text-slate-500 mt-1">
                  कृपया वेगळा शोध शब्द किंवा विषय निवडून पुन्हा प्रयत्न करा.
                </p>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </main>

      <BookModal book={activeBook} onClose={() => setActiveBook(null)} />
    </div>
  );
}
