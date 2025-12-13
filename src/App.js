import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import routes from './routes';
import theme from './theme';
import { SyncRouteProvider } from './context/SyncRouteContext';
import { FinancialDataProvider } from './context/FinancialDataContext';
import { ScanningProvider } from './context/ScanningContext';
// SyncIndicator removed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <SyncRouteProvider>
          <ScanningProvider>
            <FinancialDataProvider>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
            {/* SyncIndicator removed */}
            </FinancialDataProvider>
          </ScanningProvider>
        </SyncRouteProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
