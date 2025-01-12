import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Circuits from "@/pages/Circuits";
import CircuitDetail from "@/pages/CircuitDetail";
import Destinations from "@/pages/Destinations";
import DestinationDetail from "@/pages/DestinationDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Quiz from "@/pages/Quiz";
import AdminCircuit from "@/pages/admin/AdminCircuit";
import AdminMedia from "@/pages/admin/AdminMedia";
import CreateCircuit from "@/pages/admin/forms/CreateCircuit";
import EditCircuit from "@/pages/admin/forms/EditCircuit";
import CircuitDetailPage from "@/pages/admin/circuit/CircuitDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/circuits" element={<Circuits />} />
        <Route path="/circuits/:id" element={<CircuitDetail />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin/circuit" element={<AdminCircuit />} />
        <Route path="/admin/circuit/create" element={<CreateCircuit />} />
        <Route path="/admin/circuit/edit/:id" element={<EditCircuit />} />
        <Route path="/admin/circuit/:id" element={<CircuitDetailPage />} />
        <Route path="/admin/media" element={<AdminMedia />} />
      </Routes>
    </Router>
  );
}

export default App;