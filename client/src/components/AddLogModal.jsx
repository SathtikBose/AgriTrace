import React, { useState } from 'react';
import { X, Plus, MapPin, ClipboardList, Info } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

const AddLogModal = ({ isOpen, onClose, batchId, onSuccess }) => {
  const [formData, setFormData] = useState({
    stage: 'In Transit',
    location: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const stages = ['In Transit', 'In Warehouse', 'Processed', 'At Retailer', 'Sold'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/logs', { ...formData, batchId });
      toast.success('Status updated successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-2 rounded-xl">
              <Plus className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Update Batch Status</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Stage</label>
            <div className="relative">
              <ClipboardList className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all appearance-none"
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              >
                {stages.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                placeholder="e.g. Distribution Center, NY"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
            <div className="relative">
              <Info className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all min-h-[100px]"
                placeholder="Add any additional details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Append Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLogModal;
