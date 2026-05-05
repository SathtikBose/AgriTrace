import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-16">
        <div className="bg-primary-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Shield className="h-10 w-10 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-500 mt-4">Last updated: May 2026</p>
      </div>

      <div className="bg-white rounded-4xl p-8 lg:p-12 shadow-sm border border-gray-100 space-y-12 text-gray-600 leading-relaxed">
        <section>
          <div className="flex items-center gap-3 mb-4 text-gray-900">
            <Lock className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Information We Collect</h2>
          </div>
          <p>
            AgriTrace collects minimal personal information necessary to provide supply chain traceability. This includes name, email, and professional role (e.g., Farmer, Transporter). We also log batch data, locations, and timestamps which are essential for the traceability functionality.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 text-gray-900">
            <Eye className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold">How We Use Data</h2>
          </div>
          <p>
            The data collected is used solely for the purpose of maintaining an immutable supply chain record. Batch history and location logs are made public via QR codes to ensure transparency for consumers. Personal contact information like emails is never shared publicly.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 text-gray-900">
            <FileText className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Data Security</h2>
          </div>
          <p>
            We implement industry-standard security measures, including JWT authentication and password hashing, to protect your account. While batch logs are publicly accessible for transparency, your account credentials remain secure.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Privacy;
