import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Contact from "@/pages/Contact";
import Destinations from "@/pages/Destinations";
import DestinationDetail from "@/pages/DestinationDetail";
import Circuits from "@/pages/Circuits";
import CircuitDetail from "@/pages/CircuitDetail";
import Quiz from "@/pages/Quiz";
import Reservation from "@/pages/Reservation";
import AdminAuth from "@/pages/admin/AdminAuth";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import Dashboard from "@/pages/admin/Dashboard";
import AdminDestination from "@/pages/admin/AdminDestination";
import AdminCircuit from "@/pages/admin/AdminCircuit";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminSettings from "@/pages/admin/AdminSettings";
import CreateDestination from "@/pages/admin/forms/CreateDestination";
import CreateCircuit from "@/pages/admin/forms/CreateCircuit";
import EditCircuit from "@/pages/admin/forms/EditCircuit";
import CreateBlog from "@/pages/admin/forms/CreateBlog";
import HomeSettings from "@/pages/admin/settings/HomeSettings";
import OptionsSettings from "@/pages/admin/settings/OptionsSettings";
import CircuitDetailPage from "@/pages/admin/circuit/CircuitDetailPage";
import MentionsLegales from "@/pages/legal/MentionsLegales";
import PolitiqueDeConfidentialite from "@/pages/legal/PolitiqueDeConfidentialite";
import PolitiqueCookies from "@/pages/legal/PolitiqueCookies";
import CGV from "@/pages/legal/CGV";
import CGU from "@/pages/legal/CGU";
import NotFoundPage from "@/pages/error/404";
import InspirationPage from "@/pages/inspiration";
import ThemesPage from "@/pages/inspiration/themes";
import PopularPage from "@/pages/inspiration/popular";
import SeasonsPage from "@/pages/inspiration/seasons";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="destination/:id" element={<DestinationDetail />} />
          <Route path="circuits" element={<Circuits />} />
          <Route path="circuit/:id" element={<CircuitDetail />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="reservation" element={<Reservation />} />
          
          {/* Inspiration Routes */}
          <Route path="inspiration" element={<InspirationPage />} />
          <Route path="inspiration/themes" element={<ThemesPage />} />
          <Route path="inspiration/popular" element={<PopularPage />} />
          <Route path="inspiration/seasons" element={<SeasonsPage />} />

          {/* Legal Routes */}
          <Route path="legal">
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} />
            <Route path="politique-cookies" element={<PolitiqueCookies />} />
            <Route path="cgv" element={<CGV />} />
            <Route path="cgu" element={<CGU />} />
          </Route>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminAuth />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="destination" element={<AdminDestination />} />
          <Route path="destination/create" element={<CreateDestination />} />
          <Route path="circuit" element={<AdminCircuit />} />
          <Route path="circuit/create" element={<CreateCircuit />} />
          <Route path="circuit/edit/:id" element={<EditCircuit />} />
          <Route path="circuit/:id" element={<CircuitDetailPage />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/create" element={<CreateBlog />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />}>
            <Route path="home" element={<HomeSettings />} />
            <Route path="options" element={<OptionsSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
