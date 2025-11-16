import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
