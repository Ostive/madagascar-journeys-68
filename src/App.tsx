import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";

// Pages
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Circuits from "./pages/Circuits";
import CircuitDetail from "./pages/CircuitDetail";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";

// Account pages
import Account from "./pages/account/Account";
import Reservations from "./pages/account/Reservations";
import Favorites from "./pages/account/Favorites";

// Admin pages
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
import EditCircuit from "./pages/admin/forms/EditCircuit";
import { AdminLayout } from "./components/layouts/AdminLayout";

// Legal pages
import MentionsLegales from "./pages/legal/MentionsLegales";
import PolitiqueConfidentialite from "./pages/legal/PolitiqueConfidentialite";
import CGU from "./pages/legal/CGU";
import CGV from "./pages/legal/CGV";
import PolitiqueCookies from "./pages/legal/PolitiqueCookies";

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
            <Route path="/settings" element={<Settings />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/circuits" element={<Circuits />} />
            <Route path="/circuit/:id" element={<CircuitDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Account routes */}
            <Route path="/account" element={<Account />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/favorites" element={<Favorites />} />
            
            {/* Legal routes */}
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/politique-cookies" element={<PolitiqueCookies />} />
            
            {/* Admin routes with layout */}
            <Route element={<AdminLayout />}>
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
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;