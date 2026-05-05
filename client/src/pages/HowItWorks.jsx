import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Warehouse, Store, QrCode, Database, Cpu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: ShieldCheck,
      title: "1. Batch Creation",
      desc: "Farmers create a digital entry for every harvest. The system generates a unique AGRI-ID and captures initial data points like origin, quantity, and date.",
      color: "bg-green-500"
    },
    {
      icon: Database,
      title: "2. Immutable Logging",
      desc: "Every event—from transport to storage—is logged as an append-only entry. Once recorded, the history of the batch cannot be altered, ensuring absolute integrity.",
      color: "bg-blue-500"
    },
    {
      icon: Truck,
      title: "3. Logistics Tracking",
      desc: "Transporters and warehouse managers update the batch status in real-time. This creates a detailed breadcrumb trail across the entire supply chain.",
      color: "bg-yellow-500"
    },
    {
      icon: Cpu,
      title: "4. AI Verification",
      desc: "Our Gemini-powered AI analyzes the logs to calculate freshness scores and identify potential risks or delays before they reach the consumer.",
      color: "bg-purple-500"
    },
    {
      icon: QrCode,
      title: "5. QR Transparency",
      desc: "A public QR code is generated for every batch. Retailers can display this, allowing consumers to scan and see the full story of their food.",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grow bg-white">
      {/* Header */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-white mb-6"
          >
            How AgriTrace <span className="text-primary-400">Works</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between the farm and the table through secure, transparent, and AI-driven traceability.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center shadow-lg mb-6`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="flex-1 w-full bg-gray-50 rounded-[3rem] p-8 border border-gray-100 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white rounded-2xl shadow-sm mb-4">
                       {/* Abstract Visual Placeholder */}
                       <div className="flex gap-2">
                         {[1,2,3].map(i => <div key={i} className={`w-3 h-3 rounded-full ${step.color} opacity-${i * 30}`}></div>)}
                       </div>
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">AgriTrace Module {index + 1}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to secure your supply chain?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-white text-primary-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-xl">
              Get Started Now
            </Link>
            <Link to="/login" className="w-full sm:w-auto bg-primary-700 text-white border-2 border-primary-500 px-10 py-4 rounded-2xl font-bold hover:bg-primary-800 transition-all">
              Log in to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
