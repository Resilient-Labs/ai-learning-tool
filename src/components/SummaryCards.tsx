import React from 'react';
import { Users, Clock, Calendar } from 'lucide-react';

interface StudentSummary {
  totalSessionsToday: number;
  avgSessionLengthToday: number;
  activeStudents: number;
  lastActiveAt: string;
}

interface SummaryCardsProps {
  summary: StudentSummary | null;
  selectedStudent: { name: string } | null;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary, selectedStudent }) => {
  if (!selectedStudent) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sessions Today</p>
              <p className="text-2xl font-bold text-gray-400">--</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Session Length</p>
              <p className="text-2xl font-bold text-gray-400">-- min</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last Active</p>
              <p className="text-2xl font-bold text-gray-400">--</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Sessions Today</p>
            <p className="text-2xl font-bold text-gray-900">
              {summary?.totalSessionsToday || 0}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Avg Session Length</p>
            <p className="text-2xl font-bold text-gray-900">
              {summary?.avgSessionLengthToday || 0} min
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Last Active</p>
            <p className="text-lg font-bold text-gray-900">
              {summary?.lastActiveAt ? formatDate(summary.lastActiveAt) : 'Never'}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
