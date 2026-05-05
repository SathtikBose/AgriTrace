import React from 'react';
import { Gavel, Scale, AlertCircle, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-16">
        <div className="bg-primary-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Gavel className="h-10 w-10 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="text-gray-500 mt-4">Last updated: May 2026</p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-gray-100 space-y-12 text-gray-600 leading-relaxed">
        <section>
          <div className="flex items-center gap-3 mb-4 text-gray-900">
            <Scale className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          </div>
          <p>
            By accessing or using the AgriTrace platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the platform.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 text-gray-900">
            <AlertCircle className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold">2. Use of the Service</h2>
          </div>
          <p>
            You agree to use AgriTrace only for lawful purposes related to agricultural supply chain management. You are responsible for the accuracy of any data you input into the system (batches, logs, locations).
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 text-gray-900">
            <FileCheck className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold">3. Public Data</h2>
          </div>
          <p>
            You acknowledge that batch traceability data is intended to be public. Once a batch log is added, it may be viewable by anyone with the Batch ID or QR code to maintain supply chain transparency.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Terms;
