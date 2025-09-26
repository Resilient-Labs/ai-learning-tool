import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { StrugglingStudent } from '@/types/data';
import { IconAlertTriangle, IconMessageCircle, IconClock, IconTrendingDown } from '@tabler/icons-react';

interface Props {
  students: StrugglingStudent[];
  onReachOut?: (student: StrugglingStudent) => void;
  onViewDetails?: (student: StrugglingStudent) => void;
  className?: string;
}

export const StrugglingStudentsAlert: React.FC<Props> = (props) => {
  const { students, onReachOut, onViewDetails, className = "" } = props;

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High':
        return <IconAlertTriangle className="w-4 h-4" />;
      case 'Medium':
        return <IconTrendingDown className="w-4 h-4" />;
      case 'Low':
        return <IconClock className="w-4 h-4" />;
      default:
        return <IconAlertTriangle className="w-4 h-4" />;
    }
  };

  if (students.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <IconMessageCircle className="w-5 h-5 mr-2" />
            All Students On Track
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-gray-600">No students currently need attention!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center text-red-600">
          <IconAlertTriangle className="w-5 h-5 mr-2" />
          Students Needing Attention ({students.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className={`p-4 rounded-lg border ${getRiskColor(student.riskLevel)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Avatar name={student.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {student.name}
                    </h4>
                    <Badge variant="outline" className={getRiskColor(student.riskLevel)}>
                      {getRiskIcon(student.riskLevel)}
                      <span className="ml-1">{student.riskLevel} Risk</span>
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{student.email}</p>
                  
                  {/* Progress and Activity */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs text-gray-600">
                      <span>Progress: {student.progress}%</span>
                      <span className="mx-2">•</span>
                      <span>Last active: {student.lastActive}</span>
                      {student.daysSinceLastSession > 3 && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-red-600">
                            {student.daysSinceLastSession} days since session
                          </span>
                        </>
                      )}
                    </div>
                    
                    {/* Struggling Topics */}
                    {student.strugglingTopics.length > 0 && (
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">Struggling with: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {student.strugglingTopics.slice(0, 3).map((topic, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-200 text-red-700 text-xs rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                          {student.strugglingTopics.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                              +{student.strugglingTopics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails?.(student)}
                  className="text-xs"
                >
                  View Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onReachOut?.(student)}
                  className="text-xs bg-red-600 hover:bg-red-700"
                >
                  Reach Out
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Summary Actions */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {students.filter(s => s.riskLevel === 'High').length} high risk, {' '}
              {students.filter(s => s.riskLevel === 'Medium').length} medium risk
            </span>
            <Button variant="outline" size="sm" className="text-xs">
              View All Students
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
