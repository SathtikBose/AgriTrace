import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ShieldCheck, Truck, Warehouse, Store } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar />
      
      <main className="flex-grow">
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
          
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50 z-0"></div>
        </section>

        {/* Features Preview */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Immutable Logs", desc: "Secure tracking of every stage" },
                { icon: Truck, title: "Real-time Transit", desc: "Monitor transport conditions" },
                { icon: Warehouse, title: "Smart Storage", desc: "Warehouse state monitoring" },
                { icon: Store, title: "Retail Ready", desc: "QR codes for consumer trust" }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group">
                  <div className="bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
