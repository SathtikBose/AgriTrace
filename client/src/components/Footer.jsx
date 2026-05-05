import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary-600 p-1.5 rounded-lg">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-gray-900">AgriTrace</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering global food security through transparent, immutable supply chain traceability.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-primary-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-primary-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-primary-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/" className="hover:text-primary-600">How it Works</Link></li>
              <li><Link to="/register" className="hover:text-primary-600">Join as Farmer</Link></li>
              <li><Link to="/support" className="hover:text-primary-600">Stakeholder Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/privacy" className="hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-600">Terms of Service</Link></li>
              <li><Link to="/support" className="hover:text-primary-600">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <p className="text-sm text-gray-500 mb-4 font-medium">Have questions or feedback?</p>
            <Link 
              to="/support" 
              className="inline-flex items-center justify-center w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-primary-600 transition-all text-sm"
            >
              Get Help
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-medium">
            © 2026 AgriTrace. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-medium">
            <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-900">Terms</Link>
            <Link to="/support" className="hover:text-gray-900">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
