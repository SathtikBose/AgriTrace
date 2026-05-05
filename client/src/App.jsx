import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import BatchDetails from './pages/BatchDetails';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Terms from './pages/Terms';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { useAuth } from './context/AuthContext';
import { ShieldCheck, Truck, Warehouse, Store, QrCode } from 'lucide-react';

const Home = () => (
  <main className="grow">
    {/* Hero Section */}
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              Trace Every Seed <br />
              <span className="text-primary-600">To Every Table.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
              Empowering farmers and consumers with transparent, immutable traceability for agricultural products across the entire supply chain.
            </p>
            
            {/* Public Tracking Search */}
            <div className="max-w-md mb-10">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <QrCode className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Batch ID (e.g. AGRI-1234)"
                  className="block w-full pl-12 pr-32 py-4 bg-white border-2 border-gray-100 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/batch/${e.target.value.toUpperCase()}`;
                    }
                  }}
                />
                <div className="absolute inset-y-2 right-2">
                  <button 
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement.previousSibling;
                      if (input.value) window.location.href = `/batch/${input.value.toUpperCase()}`;
                    }}
                    className="h-full px-4 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-all shadow-md shadow-primary-200"
                  >
                    Track Now
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 flex items-center justify-center gap-2">
              Get Started
            </button>
            <button className="border-2 border-gray-100 text-gray-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50 z-0"></div>
    </section>

    {/* Features Preview */}
    <section className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">Process</h2>
          <h3 className="text-4xl font-extrabold text-gray-900">How AgriTrace Works</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary-200 to-transparent z-0"></div>
          
          {[
            { step: "01", icon: ShieldCheck, title: "Harvest", desc: "Farmer creates a secure digital batch ID" },
            { step: "02", icon: Truck, title: "Transit", desc: "Logistics update real-time location logs" },
            { step: "03", icon: Warehouse, title: "Storage", desc: "Warehouses verify quality and conditions" },
            { step: "04", icon: Store, title: "Retail", desc: "Consumers scan QR for full transparency" }
          ].map((feature, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-primary-100/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-gray-50">
                <feature.icon className="h-8 w-8 text-primary-600" />
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white text-xs font-bold rounded-xl flex items-center justify-center border-4 border-gray-50">
                  {feature.step}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto bg-primary-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to digitize your supply chain?</h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of producers and distributors ensuring food safety and quality through blockchain-inspired traceability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-primary-50 transition-all">
              Create Free Account
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary-900/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  </main>
);

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/batch/:id" element={<BatchDetails />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route 
            path="/dashboard/farmer" 
            element={
              <ProtectedRoute allowedRoles={['Farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
