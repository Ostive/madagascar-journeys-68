import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import AdminCircuit from "@/pages/admin/AdminCircuit";
import AdminMedia from "@/pages/admin/AdminMedia";
import CreateCircuit from "@/pages/admin/forms/CreateCircuit";
import EditCircuit from "@/pages/admin/forms/EditCircuit";
import CircuitDetailPage from "@/pages/admin/circuit/CircuitDetailPage";

function App() {
  return (
    <Router>
      <Routes>
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