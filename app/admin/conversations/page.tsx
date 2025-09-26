"use client"
import React, { useState } from "react"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import { StatsCard } from "../../../components/ui/StatsCard"
import { ConversationCard } from "../../../components/admin/ConversationCard"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../../components/ui/Card"
import { Conversation, generateSampleConversations } from "@/types/data"

interface Props {
  className?: string;
}

const ConversationsPage: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = generateSampleConversations()

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.topic.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleConversationView = (conversation: Conversation) => {
    console.log('View conversation:', conversation);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Conversations</h2>
          <p className="text-gray-600 mt-1">Monitor student interactions and AI responses</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <span className="mr-2">🔽</span>
          Filter
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Conversations"
          value="3,421"
          icon="💬"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Active Today"
          value="156"
          icon="📈"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Avg. Response Time"
          value="2.3s"
          icon="⏰"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Resolution Rate"
          value="89%"
          icon="🤖"
          iconColor="text-purple-600"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-4">
        {filteredConversations.map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            onView={handleConversationView}
          />
        ))}
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Summary</CardTitle>
          <CardDescription>Overview of conversation patterns and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">73%</div>
              <div className="text-sm text-gray-600">Positive Sentiment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.1 min</div>
              <div className="text-sm text-gray-600">Avg. Conversation Length</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-sm text-gray-600">AI Accuracy Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationsPage;
