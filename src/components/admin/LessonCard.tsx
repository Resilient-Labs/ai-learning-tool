import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Lesson } from '@/types/data';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';

interface Props {
  lesson: Lesson;
  onView?: (lesson: Lesson) => void;
  onEdit?: (lesson: Lesson) => void;
  onDelete?: (lesson: Lesson) => void;
}

const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const LessonCard: React.FC<Props> = (props) => {
  const { lesson, onView, onEdit, onDelete } = props;
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{lesson.title}</CardTitle>
            <CardDescription className="text-sm">{lesson.description}</CardDescription>
          </div>
          <Badge variant={lesson.status === "Published" ? "default" : "secondary"}>
            {lesson.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Category</span>
            <Badge variant="outline">{lesson.category}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Difficulty</span>
            <Badge className={getDifficultyColor(lesson.difficulty)}>
              {lesson.difficulty}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{lesson.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Students</span>
            <span className="font-medium">{lesson.students}</span>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-medium">{lesson.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full" 
                style={{ width: `${lesson.completionRate}%` }} 
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-gray-500">Updated {lesson.updatedAt}</span>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" onClick={() => onView?.(lesson)}>
                <IconEye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit?.(lesson)}>
                <IconEdit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete?.(lesson)}>
                <IconTrash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
