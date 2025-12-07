import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Tracking from "./pages/Tracking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
