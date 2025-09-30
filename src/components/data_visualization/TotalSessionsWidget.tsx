import React from 'react';
import { Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WidgetControls from './WidgetControls';

interface Widget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  order: number;
}

interface SessionData {
  date: string;
  sessions: number;
}

interface TotalSessionsWidgetProps {
  widget: Widget;
  data: SessionData[];
  onSizeChange: (widgetId: string, newSize: 'small' | 'medium' | 'large') => void;
  onDragStart: (e: React.DragEvent, widget: Widget) => void;
}

const TotalSessionsWidget: React.FC<TotalSessionsWidgetProps> = ({
  widget,
  data,
  onSizeChange,
  onDragStart
}) => {
  const chartHeight = widget.size === 'small' ? 200 : 300;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800">{widget.title}</h3>
        </div>
        <WidgetControls
          widget={widget}
          onSizeChange={onSizeChange}
          onDragStart={onDragStart}
        />
      </div>
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value: string) => new Date(value).toLocaleDateString()}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              labelFormatter={(value: string) => new Date(value).toLocaleDateString()}
              formatter={(value: number) => [value, 'Sessions']}
            />
            <Line 
              type="monotone" 
              dataKey="sessions" 
              stroke="#10b981" 
              strokeWidth={2} 
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalSessionsWidget;
