import React from 'react';
import { CheckCircle2, Clock, MapPin, User, FileText } from 'lucide-react';

const TrackingTimeline = ({ logs }) => {
  if (!logs || logs.length === 0) return (
    <div className="text-center py-10 text-gray-500 italic">No tracking logs found for this batch.</div>
  );

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-500 before:via-primary-200 before:to-transparent">
      {logs.map((log, index) => (
        <div key={log._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary-600 text-white shadow shadow-primary-200 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-sm font-bold text-primary-600 uppercase tracking-widest">{log.stage}</span>
              <time className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(log.timestamp).toLocaleString()}
              </time>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-semibold">{log.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <User className="h-3.5 w-3.5" />
                Updated by: <span className="font-medium text-gray-700">{log.updatedBy?.name}</span> ({log.updatedBy?.role})
              </div>
              {log.notes && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 flex gap-2">
                  <FileText className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                  {log.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
