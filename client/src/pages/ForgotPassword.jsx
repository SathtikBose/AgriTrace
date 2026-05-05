import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/forgotpassword', { email });
      setSubmitted(true);
      toast.success('Reset email sent!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 lg:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-gray-500 mt-2">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          {submitted ? (
            <div className="text-center py-6">
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Check your email</h3>
              <p className="text-gray-500 mt-2">We've sent a password reset link to {email}.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-primary-600 font-bold hover:underline"
              >
                Didn't receive it? Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
