import React from 'react';
import { Card, CardContent } from '../ui/CardComponent';
import { Button } from '../ui/ButtonComponent';
import { Badge } from '../ui/BadgeComponent';
import { Avatar } from '../ui/AvatarComponent';
import { Conversation } from '@/types/data';
import { IconEye, IconMessageCircle, IconRobot } from '@tabler/icons-react';

interface Props {
  conversation: Conversation;
  onView?: (conversation: Conversation) => void;
}

const getSentimentColor = (sentiment: string): string => {
  switch (sentiment) {
    case "Positive":
      return "bg-green-100 text-green-800";
    case "Neutral":
      return "bg-gray-100 text-gray-800";
    case "Frustrated":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Active":
      return "bg-blue-100 text-blue-800";
    case "Resolved":
      return "bg-green-100 text-green-800";
    case "Needs Help":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const ConversationCard: React.FC<Props> = (props) => {
  const { conversation, onView } = props;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar name={conversation.student.name} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{conversation.student.name}</h3>
                <Badge className={getStatusColor(conversation.status)}>
                  {conversation.status}
                </Badge>
                <Badge className={getSentimentColor(conversation.sentiment)}>
                  {conversation.sentiment}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{conversation.topic}</p>
              <p className="text-gray-800 mb-3 line-clamp-2">{conversation.lastMessage}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <IconMessageCircle className="w-4 h-4 mr-1" />
                  {conversation.messageCount} messages
                </span>
                <span className="flex items-center">
                  <IconRobot className="w-4 h-4 mr-1" />
                  {conversation.aiResponses} AI responses
                </span>
                <span>{conversation.timestamp}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onView?.(conversation)}>
              <IconEye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
