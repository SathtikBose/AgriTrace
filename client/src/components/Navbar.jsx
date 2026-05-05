import React from 'react';
import { Leaf, Menu, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Agri<span className="text-primary-600">Trace</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Track Batch</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">How it works</a>
            <div className="flex items-center gap-4 ml-4">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Login</button>
              <button className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition-all shadow-md shadow-primary-200">
                Register
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
