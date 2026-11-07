import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Brands from '../pages/Brands';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';

// Admin CMS Pages
import AdminLogin from '../admin/pages/AdminLogin';
import Dashboard from '../admin/pages/Dashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import CategoriesManagement from '../admin/pages/CategoriesManagement';
import BrandsManagement from '../admin/pages/BrandsManagement';
import EnquiriesManagement from '../admin/pages/EnquiriesManagement';
import ProjectsManagement from '../admin/pages/ProjectsManagement';
import HomepageSettings from '../admin/pages/HomepageSettings';
import CompanySettings from '../admin/pages/CompanySettings';

import { ProtectedRoute } from '../context/AdminAuthContext';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <CategoriesManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/brands"
        element={
          <ProtectedRoute>
            <BrandsManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/enquiries"
        element={
          <ProtectedRoute>
            <EnquiriesManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <ProjectsManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/homepage"
        element={
          <ProtectedRoute>
            <HomepageSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <CompanySettings />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
