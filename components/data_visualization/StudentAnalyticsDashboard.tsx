import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import AnalyticsHeader from './AnalyticsHeader';
import SummaryCards from './SummaryCards';
import WidgetGrid from './WidgetGrid';

interface Student {
  id: string;
  name: string;
  lastActive: string;
  totalSessions: number;
}

interface StudentData {
  lastActiveAt: string;
  totalSessions: Array<{ date: string; sessions: number }>;
  sessionLengthDistribution: Array<{ range: string; count: number }>;
}

interface StudentSummary {
  totalSessionsToday: number;
  avgSessionLengthToday: number;
  activeStudents: number;
  lastActiveAt: string;
}

interface Widget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  order: number;
}

const StudentAnalyticsDashboard: React.FC = () => {
  // Mock students data
  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      lastActive: '2024-09-07T14:23:00Z',
      totalSessions: 45
    },
    {
      id: '2',
      name: 'Bob Smith',
      lastActive: '2024-09-06T09:15:00Z',
      totalSessions: 32
    },
    {
      id: '3',
      name: 'Carol Davis',
      lastActive: '2024-09-07T16:45:00Z',
      totalSessions: 67
    },
    {
      id: '4',
      name: 'David Wilson',
      lastActive: '2024-09-05T11:30:00Z',
      totalSessions: 28
    },
    {
      id: '5',
      name: 'Eva Brown',
      lastActive: '2024-09-07T13:20:00Z',
      totalSessions: 51
    }
  ];

  // Default layout configuration
  const defaultLayout: Widget[] = [
    { id: 'last-active', type: 'card', title: 'Last Active', size: 'small', order: 0 },
    { id: 'total-sessions', type: 'line-chart', title: 'Total Sessions Over Time', size: 'large', order: 1 },
    { id: 'session-length', type: 'bar-chart', title: 'Session Length Distribution', size: 'medium', order: 2 }
  ];

  // State
  const [students] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [widgets, setWidgets] = useState<Widget[]>(defaultLayout);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for selected student
  const getStudentData = (student: Student | null): StudentData | null => {
    if (!student) return null;

    return {
      lastActiveAt: student.lastActive,
      totalSessions: [
        { date: '2024-09-01', sessions: Math.floor(Math.random() * 20) + 10 },
        { date: '2024-09-02', sessions: Math.floor(Math.random() * 20) + 10 },
        { date: '2024-09-03', sessions: Math.floor(Math.random() * 20) + 10 },
        { date: '2024-09-04', sessions: Math.floor(Math.random() * 20) + 10 },
        { date: '2024-09-05', sessions: Math.floor(Math.random() * 20) + 10 },
        { date: '2024-09-06', sessions: Math.floor(Math.random() * 20) + 10 },
        { date: '2024-09-07', sessions: Math.floor(Math.random() * 20) + 10 }
      ],
      sessionLengthDistribution: [
        { range: '0-5min', count: Math.floor(Math.random() * 20) + 5 },
        { range: '5-15min', count: Math.floor(Math.random() * 30) + 10 },
        { range: '15-30min', count: Math.floor(Math.random() * 25) + 15 },
        { range: '30-60min', count: Math.floor(Math.random() * 20) + 8 },
        { range: '60min+', count: Math.floor(Math.random() * 15) + 5 }
      ]
    };
  };

  const getStudentSummary = (student: Student | null): StudentSummary | null => {
    if (!student) return null;

    return {
      totalSessionsToday: Math.floor(Math.random() * 20) + 5,
      avgSessionLengthToday: Math.floor(Math.random() * 30) + 15,
      activeStudents: students.length,
      lastActiveAt: student.lastActive
    };
  };

  // Load saved layout on mount
  useEffect(() => {
    const loadDashboard = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load saved layout from localStorage
      const savedLayout = JSON.parse(localStorage.getItem('dashboard-layout') || 'null');
      if (savedLayout) {
        setWidgets(savedLayout);
      }
      
      setIsLoading(false);
    };

    loadDashboard();
  }, []);

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
