import React, { useState } from 'react';
import LastActiveWidget from './LastActiveWidget';
import TotalSessionsWidget from './TotalSessionsWidget';
import SessionLengthWidget from './SessionLengthWidget';

interface Widget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  order: number;
}

interface StudentData {
  lastActiveAt: string;
  totalSessions: Array<{ date: string; sessions: number }>;
  sessionLengthDistribution: Array<{ range: string; count: number }>;
}

interface WidgetGridProps {
  widgets: Widget[];
  studentData: StudentData | null;
  onWidgetsChange: (widgets: Widget[]) => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({
  widgets,
  studentData,
  onWidgetsChange
}) => {
  const [draggedItem, setDraggedItem] = useState<Widget | null>(null);
  const [dragOverItem, setDragOverItem] = useState<Widget | null>(null);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, widget: Widget) => {
    setDraggedItem(widget);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, widget: Widget) => {
    e.preventDefault();
    setDragOverItem(widget);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetWidget: Widget) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetWidget.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newWidgets = [...widgets];
    const draggedIndex = newWidgets.findIndex(w => w.id === draggedItem.id);
    const targetIndex = newWidgets.findIndex(w => w.id === targetWidget.id);

    // Swap order values
    const tempOrder = newWidgets[draggedIndex].order;
    newWidgets[draggedIndex].order = newWidgets[targetIndex].order;
    newWidgets[targetIndex].order = tempOrder;

    // Sort by order
    newWidgets.sort((a, b) => a.order - b.order);
    
    onWidgetsChange(newWidgets);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Change widget size
  const changeWidgetSize = (widgetId: string, newSize: 'small' | 'medium' | 'large') => {
    const newWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, size: newSize } : widget
    );
    onWidgetsChange(newWidgets);
  };

  // Render widget based on type
  const renderWidget = (widget: Widget) => {
    const baseClasses = `transition-all duration-200 ${
      dragOverItem?.id === widget.id ? 'ring-2 ring-blue-400' : ''
    }`;
    
    const sizeClasses = {
      small: 'col-span-12 md:col-span-6 lg:col-span-4',
      medium: 'col-span-12 md:col-span-6',
      large: 'col-span-12'
    };

    const widgetClasses = `${baseClasses} ${sizeClasses[widget.size]}`;

    return (
      <div
        key={widget.id}
        className={widgetClasses}
        onDragOver={(e) => handleDragOver(e, widget)}
        onDrop={(e) => handleDrop(e, widget)}
      >
        {widget.type === 'card' && (
          <LastActiveWidget
            widget={widget}
            lastActiveAt={studentData?.lastActiveAt || null}
            onSizeChange={changeWidgetSize}
            onDragStart={handleDragStart}
          />
        )}
        {widget.type === 'line-chart' && (
          <TotalSessionsWidget
            widget={widget}
            data={studentData?.totalSessions || []}
            onSizeChange={changeWidgetSize}
            onDragStart={handleDragStart}
          />
        )}
        {widget.type === 'bar-chart' && (
          <SessionLengthWidget
            widget={widget}
            data={studentData?.sessionLengthDistribution || []}
            onSizeChange={changeWidgetSize}
            onDragStart={handleDragStart}
          />
        )}
      </div>
    );
  };

  if (!studentData) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Student Selected</h3>
            <p className="text-gray-500">Please select a student from the menu to view their analytics</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {widgets
        .sort((a, b) => a.order - b.order)
        .map(widget => renderWidget(widget))
      }
    </div>
  );
};

export default WidgetGrid;
