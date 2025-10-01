"use client"
import React, { useState } from "react"
import { Button } from "../../../components/ui/ButtonComponent"
import { Input } from "../../../components/ui/InputComponent"
import { StatsCard } from "../../../components/ui/StatsCard"
import { StudentCard } from "../../../components/admin/StudentCard"
import { StudentTable } from "../../../components/admin/StudentTable"
import { Student, generateSampleStudents, generateSampleStudentProgress } from "@/types/data"
import { StudentProgressTracker } from "../../../components/instructor/StudentProgressTracker"
import { IconSearch, IconUsers, IconBook, IconTrendingUp, IconClock } from "@tabler/icons-react"

interface Props {
  className?: string;
}

const StudentsPage: React.FC<Props> = () => {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [searchTerm, setSearchTerm] = useState("")

  const students = generateSampleStudents()
  const studentProgress = generateSampleStudentProgress()

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStudentView = (student: Student) => {
    console.log('View student:', student);
  };

  const handleStudentEdit = (student: Student) => {
    console.log('Edit student:', student);
  };

  const handleStudentDelete = (student: Student) => {
    console.log('Delete student:', student);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Students</h2>
          <p className="text-gray-600 mt-1">Manage and monitor student progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button 
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className={viewMode === "cards" ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-200"}
            >
              Cards
            </Button>
            <Button 
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-200"}
            >
              Table
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <IconSearch className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="1,247"
          icon={<IconUsers className="w-6 h-6" />}
          iconColor="text-red-600"
        />
        <StatsCard
          title="Active Students"
          value="1,089"
          icon={<IconTrendingUp className="w-6 h-6" />}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Avg. Progress"
          value="73%"
          icon={<IconBook className="w-6 h-6" />}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Completion Rate"
          value="87%"
          icon={<IconClock className="w-6 h-6" />}
          iconColor="text-purple-600"
        />
      </div>

      {/* Students Display */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={handleStudentView}
              onEdit={handleStudentEdit}
              onMore={handleStudentDelete}
            />
          ))}
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onView={handleStudentView}
          onEdit={handleStudentEdit}
          onDelete={handleStudentDelete}
        />
      )}

      {/* Student Progress Tracker */}
      <StudentProgressTracker
        students={studentProgress}
        onViewStudent={(student) => console.log('View student:', student.name)}
      />
    </div>
  );
};

export default StudentsPage;

