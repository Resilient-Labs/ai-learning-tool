"use client"
import React from "react"
import {
  generateSampleStrugglingStudents,
  generateSampleTopicDifficulties,
  generateSampleHotTopics
} from "@/types/data"
import { Button } from "../../components/ui/ButtonComponent"
import { StatsCard } from "../../components/ui/StatsCard"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../components/ui/CardComponent"
import { Badge } from "../../components/ui/BadgeComponent"
import { Avatar } from "../../components/ui/AvatarComponent"
import { ClassOverview } from "../../components/instructor/ClassOverview"
import { TopicDifficultyAnalysis } from "../../components/instructor/TopicDifficultyAnalysis"
import { StrugglingStudentsAlert } from "../../components/instructor/StrugglingStudentsAlert"
import { HotTopics } from "../../components/instructor/HotTopics"
import { IconUsers, IconBook, IconMessageCircle, IconTrendingUp, IconPlus, IconEye, IconEdit, IconTrash } from "@tabler/icons-react"

interface Props {
  className?: string;
}

const AdminDashboard: React.FC<Props> = () => {
  // const stats = generateSampleDashboardStats()
  // const recentActivity = generateSampleRecentActivity()
  const strugglingStudents = generateSampleStrugglingStudents()
  const topicDifficulties = generateSampleTopicDifficulties()
  const hotTopics = generateSampleHotTopics()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Monitor your AI learning platform performance</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <IconPlus className="w-4 h-4 mr-2" />
          Quick Action
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="1,247"
          icon={<IconUsers className="w-6 h-6" />}
          iconColor="text-red-600"
        />
        <StatsCard
          title="Active Lessons"
          value="89"
          icon={<IconBook className="w-6 h-6" />}
          iconColor="text-red-600"
        />
        <StatsCard
          title="Conversations"
          value="3,421"
          icon={<IconMessageCircle className="w-6 h-6" />}
          iconColor="text-red-600"
        />
        <StatsCard
          title="Completion Rate"
          value="87.3%"
          icon={<IconTrendingUp className="w-6 h-6" />}
          iconColor="text-red-600"
        />
      </div>

      {/* Instructor-Specific Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClassOverview
          totalStudents={1247}
          activeStudents={1089}
          averageTimeSpent="2.3 hours"
          totalSessions={156}
          completionRate={78}
          strugglingStudents={strugglingStudents.length}
          hotTopics={hotTopics.slice(0, 3).map(topic => topic.name)}
        />
        
        <StrugglingStudentsAlert
          students={strugglingStudents}
          onReachOut={(student) => console.log('Reach out to:', student.name)}
          onViewDetails={(student) => console.log('View details for:', student.name)}
        />
      </div>

      {/* Topic Analysis and Hot Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopicDifficultyAnalysis topics={topicDifficulties} />
        <HotTopics topics={hotTopics} />
      </div>


      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alex Johnson", email: "alex@example.com", joined: "2 hours ago", status: "Active" },
                { name: "Maria Garcia", email: "maria@example.com", joined: "5 hours ago", status: "Active" },
                { name: "David Chen", email: "david@example.com", joined: "1 day ago", status: "Pending" },
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar name={student.name} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                      {student.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{student.joined}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Lessons</CardTitle>
            <CardDescription>Latest lesson activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "JavaScript Fundamentals", students: 45, completion: 92, updated: "1 hour ago" },
                { title: "React Components", students: 38, completion: 87, updated: "3 hours ago" },
                { title: "API Integration", students: 29, completion: 78, updated: "6 hours ago" },
              ].map((lesson, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{lesson.title}</p>
                    <p className="text-sm text-gray-500">
                      {lesson.students} students • {lesson.completion}% completion
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <IconEye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <IconEdit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <IconTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
