import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import CreateBatchModal from '../components/CreateBatchModal';
import { useAuth } from '../context/AuthContext';

const FarmerDashboard = () => {
  const [batches, setBatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBatches = async () => {
    try {
      const { data } = await api.get('/batches');
      setBatches(data);
    } catch (error) {
      console.error('Failed to fetch batches', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and track your crop harvests</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create New Batch
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : batches.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-100">
          <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No batches yet</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Start by creating your first crop batch to track its journey through the supply chain.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div key={batch._id} className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-1 rounded">
                    {batch.batchId}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">{batch.cropName}</h3>
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  {batch.status}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  {batch.origin}
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <Package className="h-4 w-4 text-primary-500" />
                  {batch.quantity}
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  Harvested: {new Date(batch.harvestDate).toLocaleDateString()}
                </div>
              </div>

              <Link 
                to={`/batch/${batch.batchId}`}
                className="w-full bg-gray-50 text-gray-900 py-3 rounded-xl font-bold group-hover:bg-primary-600 group-hover:text-white transition-all flex items-center justify-center gap-2"
              >
                View Details
                <ChevronRight className="h-4 w-4" />
              </Link>
              
              {/* Background accent */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      )}

      <CreateBatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchBatches}
      />
    </div>
  );
};

export default FarmerDashboard;
