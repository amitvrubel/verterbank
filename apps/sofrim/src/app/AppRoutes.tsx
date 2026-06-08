import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticatedApp } from './AuthenticatedApp.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { Dashboard } from '../pages/Dashboard.tsx';

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedApp />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
