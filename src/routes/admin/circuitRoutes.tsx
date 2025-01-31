import React from 'react';
import { Route } from 'react-router-dom';
import AdminCircuit from '@/pages/admin/AdminCircuit';
import CreateCircuit from '@/pages/admin/forms/CreateCircuit';
import EditCircuit from '@/pages/admin/forms/EditCircuit';
import CircuitDetailPage from '@/pages/admin/circuit/CircuitDetailPage';

export const circuitAdminRoutes = (
  <>
    <Route path="/admin/circuits" element={<AdminCircuit />} />
    <Route path="/admin/circuits/create" element={<CreateCircuit />} />
    <Route path="/admin/circuits/edit/:id" element={<EditCircuit />} />
    <Route path="/admin/circuits/:id" element={<CircuitDetailPage />} />
  </>
);
