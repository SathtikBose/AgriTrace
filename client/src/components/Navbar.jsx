import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, LogOut, LayoutDashboard, User, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'Farmer': return '/dashboard/farmer';
      default: return '/';
    }
  };

  const navLinks = [
    { name: 'Track Batch', path: '/' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">
              Agri<span className="text-primary-600">Trace</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {user && (
              <Link 
                to={getDashboardLink()} 
                className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-xl transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
            
            <div className="flex items-center gap-4 ml-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 pl-2 pr-4 py-1.5 rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary-200">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none mb-1">{user.role}</p>
                      <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-xl"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Login</Link>
                  <Link to="/register" className="bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-primary-600 transition-all shadow-xl shadow-gray-200">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-gray-50 rounded-xl text-gray-600 hover:text-primary-600 transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-50 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {user && (
                <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-3xl mb-8">
                  <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-primary-200">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary-600 uppercase tracking-widest mb-1">{user.role}</p>
                    <p className="text-lg font-bold text-gray-900">{user.name}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-4 text-lg font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 text-lg font-bold text-primary-600 bg-primary-50 rounded-2xl transition-all"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-red-500 transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    Log Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-4 text-gray-600 font-bold border-2 border-gray-100 rounded-2xl"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-100"
                    >
                      Register Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
