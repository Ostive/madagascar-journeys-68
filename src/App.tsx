import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Circuits from "./pages/Circuits";
import CircuitDetail from "./pages/CircuitDetail";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/admin/Dashboard";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminDestination from "./pages/admin/AdminDestination";
import AdminCircuit from "./pages/admin/AdminCircuit";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import CreateBlog from "./pages/admin/forms/CreateBlog";
import CreateDestination from "./pages/admin/forms/CreateDestination";
import CreateCircuit from "./pages/admin/forms/CreateCircuit";
import { AdminLayout } from "./components/layouts/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/circuits" element={<Circuits />} />
            <Route path="/circuit/:id" element={<CircuitDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin routes with layout */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/blog/create" element={<CreateBlog />} />
              <Route path="/admin/destination" element={<AdminDestination />} />
              <Route path="/admin/destination/create" element={<CreateDestination />} />
              <Route path="/admin/circuit" element={<AdminCircuit />} />
              <Route path="/admin/circuit/create" element={<CreateCircuit />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
