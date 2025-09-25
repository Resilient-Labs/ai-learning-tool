import React from 'react';
import { Menu, X, Users } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  lastActive: string;
  totalSessions: number;
}

interface MobileMenuProps {
  students: Student[];
  selectedStudent: Student | null;
  onStudentSelect: (student: Student) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  students,
  selectedStudent,
  onStudentSelect,
  isOpen,
  onToggle
}) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={onToggle}
          className="p-3 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Toggle student menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onToggle} />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Students</h2>
              <p className="text-sm text-gray-500">Select a student to view analytics</p>
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-2">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => {
                  onStudentSelect(student);
                  onToggle(); // Close menu after selection
                }}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedStudent?.id === student.id
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-500">
                      {student.totalSessions} sessions
                    </p>
                  </div>
                  {selectedStudent?.id === student.id && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Last active: {new Date(student.lastActive).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>

          {/* No Students Message */}
          {students.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No students found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
