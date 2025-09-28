import React from 'react';
import { Calendar } from 'lucide-react';
import WidgetControls from './WidgetControls';

interface Widget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  order: number;
}

interface LastActiveWidgetProps {
  widget: Widget;
  lastActiveAt: string | null;
  onSizeChange: (widgetId: string, newSize: 'small' | 'medium' | 'large') => void;
  onDragStart: (e: React.DragEvent, widget: Widget) => void;
}

const LastActiveWidget: React.FC<LastActiveWidgetProps> = ({
  widget,
  lastActiveAt,
  onSizeChange,
  onDragStart
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">{widget.title}</h3>
        </div>
        <WidgetControls
          widget={widget}
          onSizeChange={onSizeChange}
          onDragStart={onDragStart}
        />
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {lastActiveAt ? formatDate(lastActiveAt) : 'Never'}
        </div>
        <div className="text-sm text-gray-500">Most recent student activity</div>
      </div>
    </div>
  );
};

export default LastActiveWidget;
