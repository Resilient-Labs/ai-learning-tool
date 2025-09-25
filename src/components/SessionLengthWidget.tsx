import React from 'react';
import { Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WidgetControls from './WidgetControls';

interface Widget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  order: number;
}

interface SessionLengthData {
  range: string;
  count: number;
}

interface SessionLengthWidgetProps {
  widget: Widget;
  data: SessionLengthData[];
  onSizeChange: (widgetId: string, newSize: 'small' | 'medium' | 'large') => void;
  onDragStart: (e: React.DragEvent, widget: Widget) => void;
}

const SessionLengthWidget: React.FC<SessionLengthWidgetProps> = ({
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
          <Clock className="w-5 h-5 text-purple-500" />
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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="range" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => [value, 'Sessions']}
              labelFormatter={(label: string) => `Duration: ${label}`}
            />
            <Bar 
              dataKey="count" 
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionLengthWidget;
