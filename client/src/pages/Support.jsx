import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Support = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-[3rem] overflow-hidden shadow-xl border border-gray-100">
        <div className="bg-primary-600 p-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Support & Contact</h1>
          <p className="text-primary-100 text-lg mb-10">
            Have questions about your supply chain? Need help with your account? Our team is here to assist you 24/7.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-primary-200">Email us</p>
                <p className="font-bold">support@agritrace.io</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-primary-200">Live Chat</p>
                <p className="font-bold">Available in Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-12">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
              <p className="text-gray-500 mt-2">We'll get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-primary-600 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form action="https://api.web3forms.com/submit" method="POST" onSubmit={() => setTimeout(() => setSubmitted(true), 1000)}>
              {/* Replace with actual access key if needed, or keep for demo */}
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              <input type="hidden" name="subject" value="New AgriTrace Support Request" />
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary-500 focus:ring-0 transition-all outline-none" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary-500 focus:ring-0 transition-all outline-none" 
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message" 
                    required
                    rows="4"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary-500 focus:ring-0 transition-all outline-none resize-none" 
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-primary-600 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Support;
