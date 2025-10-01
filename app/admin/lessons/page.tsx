"use client"
import React, { useState } from "react"
import { Button } from "../../../components/ui/ButtonComponent"
import { Input } from "../../../components/ui/InputComponent"
import { StatsCard } from "../../../components/ui/StatsCard"
import { LessonCard } from "../../../components/admin/LessonCard"
import { Lesson, generateSampleLessons } from "@/types/data"

interface Props {
  className?: string;
}

const LessonsPage: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const lessons = generateSampleLessons()

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleLessonView = (lesson: Lesson) => {
    console.log('View lesson:', lesson);
  };

  const handleLessonEdit = (lesson: Lesson) => {
    console.log('Edit lesson:', lesson);
  };

  const handleLessonDelete = (lesson: Lesson) => {
    console.log('Delete lesson:', lesson);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Lessons</h2>
          <p className="text-gray-600 mt-1">Create and manage learning content</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <span className="mr-2">➕</span>
          Create Lesson
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Lessons"
          value="89"
          icon="📚"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Published"
          value="67"
          icon="📈"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Students"
          value="1,247"
          icon="👥"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Avg. Completion"
          value="87%"
          icon="⏰"
          iconColor="text-purple-600"
        />
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onView={handleLessonView}
            onEdit={handleLessonEdit}
            onDelete={handleLessonDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
