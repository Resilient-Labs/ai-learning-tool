import React, { useState } from 'react';
import { ChevronDown, Users, Check } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  lastActive: string;
  totalSessions: number;
}

interface StudentSelectorProps {
  students: Student[];
  selectedStudent: Student | null;
  onStudentSelect: (student: Student) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
  students,
  selectedStudent,
  onStudentSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center space-x-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-64"
      >
        <div className="p-2 bg-blue-100 rounded-lg">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 text-left">
          {selectedStudent ? (
            <div>
              <p className="font-semibold text-gray-900">{selectedStudent.name}</p>
              <p className="text-sm text-gray-500">
                {selectedStudent.totalSessions} sessions
              </p>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-gray-900">Select a student</p>
              <p className="text-sm text-gray-500">Choose a student to view analytics</p>
            </div>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Desktop Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="hidden lg:block fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="hidden lg:block absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => {
                  onStudentSelect(student);
                  setIsOpen(false);
                }}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500">
                      {student.totalSessions} sessions • Last active: {new Date(student.lastActive).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedStudent?.id === student.id && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
            
            {students.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p>No students found</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentSelector;
