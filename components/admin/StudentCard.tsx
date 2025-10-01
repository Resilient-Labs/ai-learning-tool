import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/CardComponent';
import { Button } from '../ui/ButtonComponent';
import { Badge } from '../ui/BadgeComponent';
import { Avatar } from '../ui/AvatarComponent';
import { Student } from '@/types/data';
import { IconEye, IconEdit, IconDots } from '@tabler/icons-react';

interface Props {
  student: Student;
  onView?: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onMore?: (student: Student) => void;
}

export const StudentCard: React.FC<Props> = (props) => {
  const { student, onView, onEdit, onMore } = props;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar name={student.name} size="md" />
            <div>
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <CardDescription>{student.email}</CardDescription>
            </div>
          </div>
          <Badge variant={student.status === "Active" ? "default" : "secondary"}>
            {student.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{student.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full" 
                style={{ width: `${student.progress}%` }} 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Lessons</p>
              <p className="font-medium">
                {student.lessonsCompleted}/{student.totalLessons}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Streak</p>
              <p className="font-medium">{student.streak} days</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Last active: {student.lastActive}</div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onView?.(student)}>
              <IconEye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit?.(student)}>
              <IconEdit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onMore?.(student)}>
              <IconDots className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
