import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { SyncRouteProvider } from './context/SyncRouteContext';
// SyncIndicator removed

function App() {
  return (
    <Router>
      <SyncRouteProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        {/* SyncIndicator removed */}
      </SyncRouteProvider>
    </Router>
  );
}

export default App;
