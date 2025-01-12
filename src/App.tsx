import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "@/components/layouts/MainLayout";

import CircuitDetailPage from "@/pages/admin/circuit/CircuitDetailPage";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import CircuitDetail from "@/pages/CircuitDetail";
import Circuits from "@/pages/Circuits";
import Contact from "@/pages/Contact";
import Destinations from "@/pages/Destinations";
import DestinationDetail from "@/pages/DestinationDetail";
import Quiz from "@/pages/Quiz";



// Admin pages
import { AdminLayout } from "@/components/layouts/AdminLayout";
import AdminMedia from "@/pages/admin/AdminMedia";

import AdminCircuit from "@/pages/admin/AdminCircuit";
import CreateCircuit from "@/pages/admin/forms/CreateCircuit";
import EditCircuit from "@/pages/admin/forms/EditCircuit";

import AdminAuth from "./pages/admin/AdminAuth";
import Dashboard from "./pages/admin/Dashboard";
import AdminDestination from "./pages/admin/AdminDestination";

import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";

import AdminBlog from "./pages/admin/AdminBlog";
import CreateBlog from "./pages/admin/forms/CreateBlog";
import CreateDestination from "./pages/admin/forms/CreateDestination";




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
          <Route path="/destination/:id" element={<DestinationDetail />} />
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

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/blog/create" element={<CreateBlog />} />
          <Route path="/admin/destination" element={<AdminDestination />} />
          <Route path="/admin/destination/create" element={<CreateDestination />} />
          <Route path="/admin/circuit" element={<AdminCircuit />} />
          <Route path="/admin/circuit/create" element={<CreateCircuit />} />
          <Route path="/admin/circuit/edit/:id" element={<EditCircuit />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;