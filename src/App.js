import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { SyncRouteProvider } from './context/SyncRouteContext';
import SyncIndicator from './components/SyncIndicator/SyncIndicator';

function App() {
  return (
    <Router>
      <SyncRouteProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <SyncIndicator />
      </SyncRouteProvider>
    </Router>
  );
}

export default App;
