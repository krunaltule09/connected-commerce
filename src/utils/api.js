import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
});

export async function fetchDocuments() {
  try {
    if (!api.defaults.baseURL) throw new Error('No base URL configured');
    const { data } = await api.get('/documents');
    return data;
  } catch (e) {
    // Fallback mock data with realistic document names matching the screenshot
    const documentNames = [
      'Loan Agreement.pdf',
      'Financial Statement.pdf',
      'Covenant Summary.xlsx',
      'ESG_Report_02.pdf',
      'FR_Y_14_Analysis.pdf',
      'Risk Assessment.docx',
      'Balance Sheet.xlsx',
      'Quarterly Report.pdf',
      'Compliance Certificate.pdf',
      'Market Analysis.pptx',
      'Credit Approval.pdf',
      'Facility Agreement.pdf'
    ];
    
    const docs = documentNames.map((name, i) => {
      const isPdf = name.endsWith('.pdf');
      const isExcel = name.endsWith('.xlsx');
      const isPpt = name.endsWith('.pptx');
      const isDoc = name.endsWith('.docx');
      
      return {
        id: String(i + 1),
        name: name,
        type: isPdf ? 'pdf' : (isExcel ? 'excel' : (isPpt ? 'powerpoint' : (isDoc ? 'word' : 'image'))),
        url: '/assets/doc_preview.jpeg',
      };
    });
    return docs;
  }
}

export async function fetchDocumentById(id) {
  try {
    if (!api.defaults.baseURL) throw new Error('No base URL configured');
    const { data } = await api.get(`/documents/${id}`);
    return data;
  } catch (e) {
    const docs = await fetchDocuments();
    return docs.find((d) => d.id === String(id)) || null;
  }
}

export default api;
