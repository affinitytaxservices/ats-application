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
import NewAdminDashboard from './components/dashboard/NewAdminDashboard';
import NewClientDashboard from './components/dashboard/NewClientDashboard';
import RefundStatusFAB from './components/RefundStatusFAB';
import RefundStatus from './components/RefundStatus';
import TaxInformation from './components/tax/TaxInformation';
import IndividualTax from './components/tax/IndividualTax';
import BusinessTax from './components/tax/BusinessTax';
import AboutUs from './components/about/AboutUs';
import TaxPlanning from './components/tax/TaxPlanning';



import Contacts from './components/privacy/Contacts';
import PrivacyPolicy from './components/privacy/PrivacyPolicy';
import Terms from './components/privacy/Terms';



// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/refund-status" element={<RefundStatus />} />
            <Route path="/tax-information" element={<TaxInformation />} />
            <Route path="/individual-tax" element={<IndividualTax />} />
            <Route path="/business-tax" element={<BusinessTax />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/tax-planning" element={<TaxPlanning />} />



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
              path="/client-dashboard" 
              element={
                <ProtectedRoute requiredRole="client">
                  <NewClientDashboard />
                </ProtectedRoute>
              } 
            />
        </Routes>
      </main>
      <RefundStatusFAB />
      <Footer />
    </div>
  );
}

export default App;