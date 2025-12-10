import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { SyncRouteProvider } from './context/SyncRouteContext';
import { FinancialDataProvider } from './context/FinancialDataContext';
import { ScanningProvider } from './context/ScanningContext';
// SyncIndicator removed

function App() {
  return (
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
  );
}

export default App;
