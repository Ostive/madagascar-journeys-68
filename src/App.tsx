import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import AdminCircuit from "@/pages/admin/AdminCircuit";
import AdminMedia from "@/pages/admin/AdminMedia";
import CreateCircuit from "@/pages/admin/forms/CreateCircuit";
import EditCircuit from "@/pages/admin/forms/EditCircuit";
import CircuitDetailPage from "@/pages/admin/circuit/CircuitDetailPage";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import CircuitDetail from "@/pages/CircuitDetail";
import Circuits from "@/pages/Circuits";
import Contact from "@/pages/Contact";
import Destinations from "@/pages/Destinations";
import Quiz from "@/pages/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/circuit/:id" element={<CircuitDetail />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/circuit" element={<AdminCircuit />} />
          <Route path="/admin/circuit/create" element={<CreateCircuit />} />
          <Route path="/admin/circuit/edit/:id" element={<EditCircuit />} />
          <Route path="/admin/circuit/:id" element={<CircuitDetailPage />} />
          <Route path="/admin/media" element={<AdminMedia />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;