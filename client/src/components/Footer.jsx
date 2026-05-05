import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">AgriTrace</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 AgriTrace. End-to-end supply chain transparency.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
