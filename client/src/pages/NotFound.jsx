import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="grow flex items-center justify-center px-4 py-12 bg-gray-50/50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="relative mb-12">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-[12rem] font-black text-gray-100 leading-none select-none"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary-50 p-8 rounded-full shadow-inner">
              <Search className="h-24 w-24 text-primary-600 animate-pulse" />
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Lost in the fields?
        </h2>
        <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          The batch or page you are looking for has either been harvested or never planted. Let's get you back to familiar ground.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Check ID</p>
            <p className="text-sm text-gray-500">Ensure the Batch ID (AGRI-XXXX) is typed correctly.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Login</p>
            <p className="text-sm text-gray-500">Some dashboards require authentication to view.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Support</p>
            <p className="text-sm text-gray-500">Contact us if you think this is a technical error.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
