import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './styles/mobile.css';

// Layout Components
import Navbar from './components/layout/navbar';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './components/home/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import EmployeeLogin from './components/auth/EmployeeLogin';
import NewAdminDashboard from './components/dashboard/NewAdminDashboard';
import NewClientDashboard from './components/dashboard/NewClientDashboard';
import PreparerDashboard from './components/PreparerDashboard';
import RefundStatusFAB from './components/RefundStatusFAB';
import RefundStatus from './components/RefundStatus';
import TaxInformation from './components/tax/TaxInformation';
import IndividualTax from './components/tax/IndividualTax';
import BusinessTax from './components/tax/BusinessTax';
import AboutUs from './components/about/AboutUs';
import TaxPlanning from './components/tax/TaxPlanning';
import Documents from './components/documents/Documents';
import Appointments from './components/appointments/Appointments';
import Notifications from './components/notifications/Notifications';

import Contacts from './components/privacy/Contacts';
import PrivacyPolicy from './components/privacy/PrivacyPolicy';
import Terms from './components/privacy/Terms';
import WhatsAppAdmin from './components/admin/WhatsAppAdmin';
import WhatsAppWidget from './components/common/WhatsAppWidget';



// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user && user.isVerified === 0) {
    return <Navigate to="/verify-otp" />;
  }

  if (requiredRole && user) {
    // Handle both single role string and array of roles
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }
  }
  
  return children;
};

// Dashboard Route Component - redirects to appropriate dashboard based on user role
const DashboardRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Redirect based on user role
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" />;
    case 'client':
      return <Navigate to="/client-dashboard" />;
    case 'preparer':
    case 'tax_professional':
      return <Navigate to="/preparer-dashboard" />;
    case 'manager':
      return <Navigate to="/manager-dashboard" />;
    case 'employee':
      return <Navigate to="/employee-dashboard" />;
    default:
      return <Navigate to="/client-dashboard" />;
  }
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content" id="main-content">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route path="/refund-status" element={<RefundStatus />} />
            <Route path="/tax-information" element={<TaxInformation />} />
            <Route path="/individual-tax" element={<IndividualTax />} />
            <Route path="/business-tax" element={<BusinessTax />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/tax-planning" element={<TaxPlanning />} />
            <Route path="/documents" element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />

            <Route path="/contacts" element={<Contacts />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />

            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <NewAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/whatsapp" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <WhatsAppAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client-dashboard" 
              element={
                <ProtectedRoute requiredRole="client">
                  <NewClientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/preparer-dashboard" 
              element={
                <ProtectedRoute requiredRole={["preparer", "tax_professional", "admin"]}>
                  <PreparerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manager-dashboard" 
              element={
                <ProtectedRoute requiredRole="manager">
                  <PreparerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee-dashboard" 
              element={
                <ProtectedRoute requiredRole="employee">
                  <PreparerDashboard />
                </ProtectedRoute>
              } 
            />
        </Routes>
      </main>
      <WhatsAppWidget />
      <RefundStatusFAB />
      <Footer />
    </div>
  );
}

export default App;
