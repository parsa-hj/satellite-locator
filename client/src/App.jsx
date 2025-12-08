import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Tracking from "./pages/Tracking";
import Crew from "./pages/Crew";

function App() {
  return (
    <Router>
      <Layout
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/crew" element={<Crew />} />
          <Route
            path="*"
            element={
              <div style={{ padding: "48px", textAlign: "center" }}>
                404 - Not Found
              </div>
            }
          />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
