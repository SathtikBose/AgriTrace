import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Package, MapPin, Calendar, User, QrCode, Plus } from 'lucide-react';
import api from '../utils/api';
import TrackingTimeline from '../components/TrackingTimeline';
import AddLogModal from '../components/AddLogModal';
import AIInsights from '../components/AIInsights';
import { useAuth } from '../context/AuthContext';

const BatchDetails = () => {
  const { batchId } = useParams();
  const { user } = useAuth();
  const [batch, setBatch] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const batchRes = await api.get(`/batches/${batchId}`);
      setBatch(batchRes.data);
      
      const logsRes = await api.get(`/logs/${batchRes.data._id}`);
      setLogs(logsRes.data);
    } catch (error) {
      console.error('Error fetching batch details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [batchId]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );

  if (!batch) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Batch not found</h2>
      <Link to="/" className="text-primary-600 mt-4 inline-block">Go back home</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Batch Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 sticky top-24">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-1 rounded">
                {batch.batchId}
              </span>
              <div className="flex flex-col items-end gap-2">
                <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  {batch.status}
                </div>
                {!user && (
                  <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    Public Verified
                  </span>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{batch.cropName}</h1>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium">{batch.origin}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Package className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium">{batch.quantity}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium">Harvested: {new Date(batch.harvestDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <User className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium">Farmer: {batch.farmerId?.name}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
                <QrCode className="h-5 w-5 text-primary-600" />
                Batch QR Code
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-center shadow-inner">
                <QRCodeSVG value={window.location.href} size={150} />
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-3 px-4">
                Scan to view public traceability history for this batch.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="lg:col-span-2 space-y-8">
          <AIInsights batchId={batch._id} />
          
          <div className="bg-gray-50/50 rounded-3xl p-8 lg:p-12">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                Traceability Journey
                <span className="text-xs font-normal text-gray-500 bg-white border border-gray-100 px-2 py-1 rounded-full">
                  {logs.length} Updates
                </span>
              </h2>
              
              {user && user.role !== 'Consumer' && (
                <button
                  onClick={() => setIsLogModalOpen(true)}
                  className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Update
                </button>
              )}
            </div>

            <TrackingTimeline logs={logs} />
          </div>
        </div>
      </div>

      <AddLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        batchId={batch._id}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default BatchDetails;
