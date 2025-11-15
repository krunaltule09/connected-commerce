import './App.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from './routes';
import DocumentCentrePage from './pages/DocumentCentrePage';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path={ROUTES.documentCentre} element={<DocumentCentrePage />} />
        <Route path="*" element={<Navigate to={ROUTES.documentCentre} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
