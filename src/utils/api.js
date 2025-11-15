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
    // Fallback mock data
    const docs = Array.from({ length: 12 }).map((_, i) => ({
      id: String(i + 1),
      name: `Document ${i + 1}`,
      type: (i % 3 === 0 ? 'pdf' : 'image'),
      url: (i % 3 === 0)
        ? 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        : `https://picsum.photos/seed/doc${i + 1}/1200/800`,
    }));
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
