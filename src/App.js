import HomePage from './components/HomePage';
import ServicesHome from './components/ServicesHome';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/servicesHome" element={<ServicesHome />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
