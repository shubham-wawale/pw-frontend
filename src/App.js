import HomePage from './components/HomePage';
import RegisterSitter from './components/RegisterSitter';
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
          <Route path="/registerSitter" element={<RegisterSitter />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
