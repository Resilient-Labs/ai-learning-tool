'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StudentAnalyticsDashboard from '../../components/StudentAnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <div>
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
      
      {/* Analytics Dashboard */}
      <StudentAnalyticsDashboard />
    </div>
  );
}
