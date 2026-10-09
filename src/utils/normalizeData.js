/**
 * Safe JSON parser that handles Python / Pandas export quirks such as unquoted NaN and Infinity.
 */
export function safeJsonParse(text) {
  if (typeof text !== 'string') return text;
  const sanitized = text
    .replace(/:\s*NaN\b/g, ': null')
    .replace(/:\s*Infinity\b/g, ': null')
    .replace(/:\s*-Infinity\b/g, ': null');
  return JSON.parse(sanitized);
}

/**
 * Normalizes library catalog items whether they follow the standard key schema
 * or the spreadsheet export format with 'Unnamed: X' headers.
 */
export function normalizeLibraryItem(item) {
  if (!item || typeof item !== 'object') return null;

  // Handle spreadsheet export with "Unnamed: X" headers
  if ('Unnamed: 1' in item) {
    const accKey = Object.keys(item).find(k => k.includes('Pune Marathi') || k.includes('Accession'));
    const acc = accKey ? item[accKey] : item['AccessionNumber'];
    
    // Skip empty or header rows
    if (!acc || ['AccessionNumber', 'Accession Number', 'None', '', 'nan'].includes(String(acc).trim())) {
      return null;
    }

    const title = item['Unnamed: 1'];
    if (!title || ['Bookname', 'None', 'nan', ''].includes(String(title).trim())) return null;

    let subject = String(item['Unnamed: 5'] || 'इतर').trim();
    if (subject === 'ार्म') subject = 'धर्म';
    if (subject.includes('गुढविद्या')) subject = 'गूढविद्या / ज्योतिष';

    return {
      id: String(acc).trim(),
      title: String(title).replaceAll('*', '').trim(),
      author: String(item['Unnamed: 2'] || 'अज्ञात').replace(/[---]/g, '').trim() || 'अज्ञात',
      remarks: String(item['Unnamed: 3'] || '').replace(/[---]/g, '').trim(),
      status: String(item['Unnamed: 4'] || 'उपलब्ध').trim(),
      subject: subject || 'इतर',
      pages: item.noofpages && !isNaN(item.noofpages) ? Number(item.noofpages) : null,
    };
  }

  // Standard schema
  const acc = item.AccessionNumber;
  if (!acc || ['', 'None', 'nan', '‘'].includes(String(acc).trim())) return null;

  const title = item.Bookname;
  if (!title || ['Bookname', 'None', 'nan', ''].includes(String(title).trim())) return null;

  let subject = String(item.subject || 'इतर').trim();
  if (subject === 'ार्म') subject = 'धर्म';
  if (subject.includes('गुढविद्या')) subject = 'गूढविद्या / ज्योतिष';

  return {
    id: String(acc).trim(),
    title: String(title).replaceAll('*', '').trim(),
    author: String(item.Author || 'अज्ञात').replace(/[---]/g, '').trim() || 'अज्ञात',
    remarks: String(item.remarks || '').replace(/[---]/g, '').trim(),
    status: String(item.currentstatus || 'उपलब्ध').trim(),
    subject: subject || 'इतर',
    pages: item.noofpages && !isNaN(item.noofpages) ? Number(item.noofpages) : null,
  };
}

export function parseLibraryData(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList
    .map(normalizeLibraryItem)
    .filter(Boolean);
}
