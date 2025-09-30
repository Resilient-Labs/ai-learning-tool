'use client'
import { generateSampleStudents, Student, StudentData, StudentSummary } from "@/types/data";
import React, { useState, useEffect } from 'react';
import MobileMenu from '../../../../components/data_visualization/MobileMenu';
import AnalyticsHeader from '../../../../components/data_visualization/AnalyticsHeader';
import SummaryCards from '../../../../components/data_visualization/SummaryCards';
import WidgetGrid from '../../../../components/data_visualization/WidgetGrid';

interface Widget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  order: number;
}

interface PageProps {
    params: Promise<{ id: string }>;
  }
  

const StudentAnalyticsDashboard  = ({params}: PageProps) => {
  // Load saved layout on mount
  useEffect(() => {
    const loadDashboard = async () => {
      // Simulate API delay
      const { id: studentId } = await params;
      
      // Find and set the selected student
      const students = generateSampleStudents();
      const foundStudent = students.find((s) => s.id === parseInt(studentId));
      setSelectedStudent(foundStudent || null);
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Load saved layout from localStorage
      const savedLayout = JSON.parse(localStorage.getItem('dashboard-layout') || 'null');
      if (savedLayout) {
        setWidgets(savedLayout);
      }
      
      setIsLoading(false);
    };

    loadDashboard();
  }, [params]);

  // Default layout configuration
  const defaultLayout: Widget[] = [
    { id: 'last-active', type: 'card', title: 'Last Active', size: 'small', order: 0 },
    { id: 'total-sessions', type: 'line-chart', title: 'Total Sessions Over Time', size: 'large', order: 1 },
    { id: 'session-length', type: 'bar-chart', title: 'Session Length Distribution', size: 'medium', order: 2 }
  ];

  // State
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [widgets, setWidgets] = useState<Widget[]>(defaultLayout);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock students data
  const students = generateSampleStudents();

  // Mock data for selected student
  const getStudentData = (student: Student | null): StudentData | null => {
    if (!student) return null;

    return student.data;
  };

  const getStudentSummary = (student: Student | null): StudentSummary | null => {
    if (!student) return null;

    return student.summary;
  };

 

  // Save layout to localStorage
  const saveLayout = (newLayout: Widget[]) => {
    localStorage.setItem('dashboard-layout', JSON.stringify(newLayout));
  };

  // Handle widget changes
  const handleWidgetsChange = (newWidgets: Widget[]) => {
    setWidgets(newWidgets);
    saveLayout(newWidgets);
  };

  // Reset to default layout
  const resetLayout = () => {
    setWidgets(defaultLayout);
    saveLayout(defaultLayout);
  };

  // Refresh data
  const refreshData = () => {
    window.location.reload();
  };

  // Get current student data
  const studentData = getStudentData(selectedStudent);
  const studentSummary = getStudentSummary(selectedStudent);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="h-32 bg-gray-300 rounded-lg"></div>
              <div className="h-32 bg-gray-300 rounded-lg"></div>
              <div className="h-32 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 h-40 bg-gray-300 rounded-lg"></div>
              <div className="col-span-12 h-80 bg-gray-300 rounded-lg"></div>
              <div className="col-span-12 md:col-span-6 h-80 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Menu */}
        <MobileMenu
          students={students}
          selectedStudent={selectedStudent}
          onStudentSelect={setSelectedStudent}
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Header */}
        <AnalyticsHeader
          students={students}
          selectedStudent={selectedStudent}
          onStudentSelect={setSelectedStudent}
          onRefresh={refreshData}
          onResetLayout={resetLayout}
        />

        {/* Summary Cards */}
        <SummaryCards
          summary={studentSummary}
          selectedStudent={selectedStudent}
        />

        {/* Dashboard Grid */}
        <WidgetGrid
          widgets={widgets}
          studentData={studentData}
          onWidgetsChange={handleWidgetsChange}
        />

        {/* Instructions */}
        {selectedStudent && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Dashboard Instructions</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Drag the grip icon (⋮⋮) to reorder widgets</li>
              <li>• Click the settings icon (⚙) to resize widgets</li>
              <li>• Use &quot;Reset Layout&quot; to restore default arrangement</li>
              <li>• Your layout preferences are automatically saved</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAnalyticsDashboard;