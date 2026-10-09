# ग्रंथालय पुस्तक सूची (Library Book Catalog React Project)

A fast, responsive, and bilingual (Marathi & English) static library book catalog project built with React and Tailwind CSS.

## 🚀 Key Features
- **Instant Search**: Search across Book Title, Author, Accession Number, Subject, and Remarks.
- **Category Filter**: Multi-facet sidebar filtering across 20+ subjects (चरित्र, इतिहास, कादंबरी, प्रवास, अर्थशास्त्र, etc.) with real-time book count badges.
- **Card Presentation**: Clean cards showing Accession Number, Category color badge, Title, Author, Pages, Remarks, and Status.
- **Detail Modal**: Click any card for a full metadata popup with a one-click "Copy Information" button.
- **Flexible Sorting**: Sort by Title (A-Z / अ ते ज्ञ), Accession Number, and Page count.
- **Smart Data Normalizer**: Automatically normalizes both standard schema (`Bookname`, `Author`) and spreadsheet exports (`Unnamed: 1` columns).
- **Client-Side Upload**: Upload any JSON file directly in the web browser at runtime to explore any dataset!

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Add your Data
Place your `combined.json` inside the `public/` folder:
```
public/
  combined.json
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production (Static Deployment)
```bash
npm run build
```
The output `dist/` directory can be deployed directly to GitHub Pages, Vercel, Netlify, or AWS S3 as a 100% static website!
