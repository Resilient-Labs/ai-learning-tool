import React from 'react';
import { RefreshCw, RotateCcw } from 'lucide-react';
import StudentSelector from './StudentSelector';

interface Student {
  id: string;
  name: string;
  lastActive: string;
  totalSessions: number;
}

interface AnalyticsHeaderProps {
  students: Student[];
  selectedStudent: Student | null;
  onStudentSelect: (student: Student) => void;
  onRefresh: () => void;
  onResetLayout: () => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  students,
  selectedStudent,
  onStudentSelect,
  onRefresh,
  onResetLayout
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
      {/* Title Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900">Student Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          {selectedStudent 
            ? `Analytics for ${selectedStudent.name}` 
            : 'Select a student to view their analytics'
          }
        </p>
      </div>
      
      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
        {/* Student Selector */}
        <div className="w-full sm:w-auto">
          <StudentSelector
            students={students}
            selectedStudent={selectedStudent}
            onStudentSelect={onStudentSelect}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onResetLayout}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset Layout</span>
            <span className="sm:hidden">Reset</span>
          </button>
          
          <button
            onClick={onRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh Data</span>
            <span className="sm:hidden">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
