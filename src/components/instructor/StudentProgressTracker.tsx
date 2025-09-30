import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { StudentProgress } from '@/types/data';
import { IconTrendingUp, IconTrendingDown, IconClock, IconTarget, IconEye } from '@tabler/icons-react';

interface Props {
  students: StudentProgress[];
  onViewStudent?: (student: StudentProgress) => void;
  className?: string;
}

export const StudentProgressTracker: React.FC<Props> = (props) => {
  const { students, onViewStudent, className = "" } = props;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'text-green-600 bg-green-100';
      case 'Behind':
        return 'text-yellow-600 bg-yellow-100';
      case 'Ahead':
        return 'text-blue-600 bg-blue-100';
      case 'Struggling':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressIcon = (progress: number, previousProgress: number) => {
    if (progress > previousProgress) {
      return <IconTrendingUp className="w-4 h-4 text-green-600" />;
    } else if (progress < previousProgress) {
      return <IconTrendingDown className="w-4 h-4 text-red-600" />;
    } else {
      return <IconClock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getProgressChange = (progress: number, previousProgress: number) => {
    const change = progress - previousProgress;
    if (change > 0) {
      return `+${change}%`;
    } else if (change < 0) {
      return `${change}%`;
    } else {
      return 'No change';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <IconTarget className="w-5 h-5 mr-2 text-red-600" />
          Student Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {students.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-600">No student data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar name={student.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {student.name}
                        </h4>
                        <Badge variant="outline" className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-2">{student.email}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progress: {student.progress}%</span>
                          <div className="flex items-center space-x-1">
                            {getProgressIcon(student.progress, student.previousProgress)}
                            <span className={student.progress > student.previousProgress ? 'text-green-600' : student.progress < student.previousProgress ? 'text-red-600' : 'text-gray-600'}>
                              {getProgressChange(student.progress, student.previousProgress)}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                        <div>
                          <div className="font-medium">{student.lessonsCompleted}/{student.totalLessons}</div>
                          <div>Lessons</div>
                        </div>
                        <div>
                          <div className="font-medium">{student.streak}</div>
                          <div>Day Streak</div>
                        </div>
                        <div>
                          <div className="font-medium">{student.lastActive}</div>
                          <div>Last Active</div>
                        </div>
                      </div>
                      
                      {/* Topics */}
                      <div className="mt-2 space-y-1">
                        {student.topics.mastered.length > 0 && (
                          <div className="flex items-center text-xs">
                            <span className="text-green-600 mr-1">✓</span>
                            <span className="text-gray-600">Mastered: </span>
                            <span className="text-green-600 ml-1">
                              {student.topics.mastered.slice(0, 2).join(', ')}
                              {student.topics.mastered.length > 2 && ` +${student.topics.mastered.length - 2} more`}
                            </span>
                          </div>
                        )}
                        
                        {student.topics.struggling.length > 0 && (
                          <div className="flex items-center text-xs">
                            <span className="text-red-600 mr-1">⚠</span>
                            <span className="text-gray-600">Struggling: </span>
                            <span className="text-red-600 ml-1">
                              {student.topics.struggling.slice(0, 2).join(', ')}
                              {student.topics.struggling.length > 2 && ` +${student.topics.struggling.length - 2} more`}
                            </span>
                          </div>
                        )}
                        
                        {student.topics.inProgress.length > 0 && (
                          <div className="flex items-center text-xs">
                            <span className="text-blue-600 mr-1">🔄</span>
                            <span className="text-gray-600">In Progress: </span>
                            <span className="text-blue-600 ml-1">
                              {student.topics.inProgress.slice(0, 2).join(', ')}
                              {student.topics.inProgress.length > 2 && ` +${student.topics.inProgress.length - 2} more`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewStudent?.(student)}
                    className="text-xs"
                  >
                    <IconEye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Summary Stats */}
        {students.length > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {students.filter(s => s.status === 'On Track').length}
                </div>
                <div className="text-xs text-gray-500">On Track</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {students.filter(s => s.status === 'Behind').length}
                </div>
                <div className="text-xs text-gray-500">Behind</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {students.filter(s => s.status === 'Ahead').length}
                </div>
                <div className="text-xs text-gray-500">Ahead</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {students.filter(s => s.status === 'Struggling').length}
                </div>
                <div className="text-xs text-gray-500">Struggling</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
