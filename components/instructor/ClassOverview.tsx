import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/CardComponent';
import { IconUsers, IconClock, IconTrendingUp, IconAlertTriangle } from '@tabler/icons-react';

interface Props {
  totalStudents: number;
  activeStudents: number;
  averageTimeSpent: string;
  totalSessions: number;
  completionRate: number;
  strugglingStudents: number;
  hotTopics: string[];
  className?: string;
}

export const ClassOverview: React.FC<Props> = (props) => {
  const {
    totalStudents,
    activeStudents,
    averageTimeSpent,
    totalSessions,
    completionRate,
    strugglingStudents,
    hotTopics,
    className = ""
  } = props;

  const activePercentage = Math.round((activeStudents / totalStudents) * 100);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <IconUsers className="w-5 h-5 mr-2 text-red-600" />
          Class Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Student Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <IconUsers className="w-4 h-4 mr-1" />
              Students
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
            <div className="text-xs text-gray-500">
              {activeStudents} active ({activePercentage}%)
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <IconClock className="w-4 h-4 mr-1" />
              Avg Time
            </div>
            <div className="text-2xl font-bold text-gray-900">{averageTimeSpent}</div>
            <div className="text-xs text-gray-500">per session</div>
          </div>
        </div>

        {/* Sessions and Completion */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <IconTrendingUp className="w-4 h-4 mr-1" />
              Sessions
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalSessions}</div>
            <div className="text-xs text-gray-500">this week</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Completion</div>
            <div className="text-2xl font-bold text-gray-900">{completionRate}%</div>
            <div className="text-xs text-gray-500">overall progress</div>
          </div>
        </div>

        {/* Struggling Students Alert */}
        {strugglingStudents > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <IconAlertTriangle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-800">
                {strugglingStudents} students need attention
              </span>
            </div>
          </div>
        )}

        {/* Hot Topics */}
        {hotTopics.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">🔥 Hot Topics</div>
            <div className="flex flex-wrap gap-1">
              {hotTopics.slice(0, 3).map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
