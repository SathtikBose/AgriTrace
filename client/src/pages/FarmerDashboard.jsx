import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, MapPin, Calendar, Clock, ChevronRight, Activity, TrendingUp, CheckCircle } from 'lucide-react';
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

  const stats = [
    { label: 'Total Batches', value: batches.length, icon: Package, color: 'bg-primary-500' },
    { label: 'In Transit', value: batches.filter(b => b.status === 'In Transit').length, icon: Activity, color: 'bg-blue-500' },
    { label: 'Warehouse', value: batches.filter(b => b.status === 'In Warehouse').length, icon: TrendingUp, color: 'bg-yellow-500' },
    { label: 'Completed', value: batches.filter(b => b.status === 'Sold').length, icon: CheckCircle, color: 'bg-green-500' },
  ];

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-8">
        <div className="h-20 bg-gray-100 rounded-3xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-100 rounded-3xl"></div>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-3xl"></div>)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Farmer Dashboard</h1>
          <p className="text-gray-500 mt-1">Hello, {user?.name}. Here is your farm's overview.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 flex items-center gap-2 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          Create New Batch
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-2xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Recent Batches</h2>
        <div className="text-sm text-gray-500 font-medium">Showing {batches.length} items</div>
      </div>

      {batches.length === 0 ? (
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
            <div key={batch._id} className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-1 rounded">
                    {batch.batchId}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-primary-600 transition-colors">{batch.cropName}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 ${
                  batch.status === 'Sold' ? 'bg-green-100 text-green-700' : 'bg-primary-100 text-primary-700'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${batch.status === 'Sold' ? 'bg-green-500' : 'bg-primary-500 animate-pulse'}`}></div>
                  {batch.status}
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <div className="p-1.5 bg-gray-50 rounded-lg"><MapPin className="h-4 w-4 text-primary-500" /></div>
                  <span className="font-medium">{batch.origin}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <div className="p-1.5 bg-gray-50 rounded-lg"><Package className="h-4 w-4 text-primary-500" /></div>
                  <span className="font-medium">{batch.quantity}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <div className="p-1.5 bg-gray-50 rounded-lg"><Calendar className="h-4 w-4 text-primary-500" /></div>
                  <span className="font-medium">Harvested: {new Date(batch.harvestDate).toLocaleDateString()}</span>
                </div>
              </div>

              <Link 
                to={`/batch/${batch.batchId}`}
                className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-bold hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
              >
                View Details
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
