import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
});

export async function fetchDocuments() {
  try {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/case/1/documents`);
    const result = await response.json();
    const documents = result.data?.documents || [];
    
    // Map documents from API and assign local SVG URLs for preview
    const docs = documents.map((doc, i) => {
      // Rotate between the three SVG files for preview
      const svgIndex = i % 3;
      let previewUrl;
      
      if (svgIndex === 0) {
        previewUrl = '/assets/doc1.svg';
      } else if (svgIndex === 1) {
        previewUrl = '/assets/doc2.svg';
      } else {
        previewUrl = '/assets/doc3.svg';
      }
      
      return {
        id: String(doc.id),
        name: doc.filename || doc.name,
        type: doc.type || 'pdf',
        url: previewUrl, // Use local SVG for preview, not the API URL
        description: doc.description,
        filename: doc.filename,
      };
    });
    
    return docs;
  } catch (e) {
    console.error('Failed to fetch documents from API:', e);
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
      
      // Use local SVG files for document previews
      let url;
      // Rotate between the three SVG files
      const svgIndex = i % 3;
      
      if (svgIndex === 0) {
        url = '/assets/doc1.svg';
      } else if (svgIndex === 1) {
        url = '/assets/doc2.svg';
      } else {
        url = '/assets/doc3.svg';
      }
      
      return {
        id: String(i + 1),
        name: name,
        type: isPdf ? 'pdf' : (isExcel ? 'excel' : (isPpt ? 'powerpoint' : (isDoc ? 'word' : 'image'))),
        url: url,
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
