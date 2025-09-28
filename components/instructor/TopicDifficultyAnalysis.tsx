import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { TopicDifficulty } from '@/types/data';
import { IconChartBar, IconAlertCircle, IconClock, IconCheck } from '@tabler/icons-react';

interface Props {
  topics: TopicDifficulty[];
  className?: string;
}

export const TopicDifficultyAnalysis: React.FC<Props> = (props) => {
  const { topics, className = "" } = props;


  const highDifficultyTopics = topics.filter(t => t.difficulty === 'High');
  const mediumDifficultyTopics = topics.filter(t => t.difficulty === 'Medium');
  const lowDifficultyTopics = topics.filter(t => t.difficulty === 'Low');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <IconChartBar className="w-5 h-5 mr-2 text-red-600" />
          Topic Difficulty Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* High Difficulty Topics */}
        {highDifficultyTopics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium text-red-700">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              High Difficulty ({highDifficultyTopics.length})
            </div>
            <div className="space-y-1">
              {highDifficultyTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <IconAlertCircle className="w-4 h-4 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-red-800">{topic.name}</span>
                  </div>
                  <div className="text-xs text-red-600">
                    {topic.studentsStruggling} struggling
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medium Difficulty Topics */}
        {mediumDifficultyTopics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium text-yellow-700">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              Medium Difficulty ({mediumDifficultyTopics.length})
            </div>
            <div className="space-y-1">
              {mediumDifficultyTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <IconClock className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">{topic.name}</span>
                  </div>
                  <div className="text-xs text-yellow-600">
                    {topic.completionRate}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Difficulty Topics */}
        {lowDifficultyTopics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium text-green-700">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Low Difficulty ({lowDifficultyTopics.length})
            </div>
            <div className="space-y-1">
              {lowDifficultyTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <IconCheck className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">{topic.name}</span>
                  </div>
                  <div className="text-xs text-green-600">
                    {topic.completionRate}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-600">{highDifficultyTopics.length}</div>
              <div className="text-xs text-gray-500">High</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">{mediumDifficultyTopics.length}</div>
              <div className="text-xs text-gray-500">Medium</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{lowDifficultyTopics.length}</div>
              <div className="text-xs text-gray-500">Low</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
