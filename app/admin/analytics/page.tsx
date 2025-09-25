"use client"
import React from "react"
import { generateSampleAnalytics } from "@/types/data"
import { Button } from "../../../components/ui/Button"
import { StatsCard } from "../../../components/ui/StatsCard"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../../components/ui/Card"
import { Badge } from "../../../components/ui/Badge"

interface Props {
  // Add any props that might be passed from parent components
}

const AnalyticsPage: React.FC<Props> = (props) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive platform performance insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <span className="mr-2">🔽</span>
            Filter
          </Button>
          <Button variant="outline">
            <span className="mr-2">📥</span>
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="1,247"
          icon="👥"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Course Completion"
          value="87.3%"
          icon="📚"
          iconColor="text-red-600"
        />
        <StatsCard
          title="AI Interactions"
          value="15,432"
          icon="💬"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Avg. Session Time"
          value="24.5 min"
          icon="⏰"
          iconColor="text-red-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trends</CardTitle>
            <CardDescription>Monthly student registration over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <span className="text-6xl text-gray-400">📊</span>
                <p className="text-gray-500 mt-2">Enrollment chart visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Completion rates by course category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "JavaScript", completion: 92, students: 456 },
                { category: "React", completion: 87, students: 389 },
                { category: "Node.js", completion: 78, students: 234 },
                { category: "Database", completion: 85, students: 198 },
                { category: "CSS", completion: 94, students: 567 },
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{course.category}</span>
                      <span className="text-sm text-gray-500">{course.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${course.completion}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{course.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Patterns</CardTitle>
            <CardDescription>Student engagement insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Peak Learning Hours</span>
                <Badge variant="outline">2-4 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Most Active Day</span>
                <Badge variant="outline">Tuesday</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Questions/Session</span>
                <Badge variant="outline">7.3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Preferred Learning Style</span>
                <Badge variant="outline">Interactive</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Performance</CardTitle>
            <CardDescription>AI assistant effectiveness metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">94.2%</div>
                <p className="text-sm text-gray-600">Response Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1.8s</div>
                <p className="text-sm text-gray-600">Avg. Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">89%</div>
                <p className="text-sm text-gray-600">Student Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
            <CardDescription>Platform expansion indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Growth Rate</span>
                <span className="text-sm font-medium text-green-600">+12.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Student Retention</span>
                <span className="text-sm font-medium text-green-600">91.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Course Completion Rate</span>
                <span className="text-sm font-medium text-green-600">87.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">NPS Score</span>
                <span className="text-sm font-medium text-green-600">8.4/10</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key findings and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  High student engagement in interactive lessons
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Excellent AI response accuracy and speed
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Strong completion rates across all courses
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Weekend engagement could be increased
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Advanced courses need more support materials
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Mobile app usage is below desktop
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;