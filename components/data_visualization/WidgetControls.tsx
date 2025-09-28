import React, { useState } from 'react';
import { Settings, GripVertical } from 'lucide-react';

interface Widget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  order: number;
}

interface WidgetControlsProps {
  widget: Widget;
  onSizeChange: (widgetId: string, newSize: 'small' | 'medium' | 'large') => void;
  onDragStart: (e: React.DragEvent, widget: Widget) => void;
}

const WidgetControls: React.FC<WidgetControlsProps> = ({
  widget,
  onSizeChange,
  onDragStart
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ] as const;

  return (
    <div className="flex items-center space-x-2">
      {/* Settings Menu */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Widget settings"
        >
          <Settings className="w-4 h-4 text-gray-400" />
        </button>
        
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 z-20 min-w-32">
              {sizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSizeChange(widget.id, option.value);
                    setShowMenu(false);
                  }}
                  className={`block w-full text-left px-3 py-1 text-sm hover:bg-gray-50 transition-colors ${
                    widget.size === option.value ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Drag Handle */}
      <div 
        className="cursor-move p-1 hover:bg-gray-100 rounded transition-colors"
        draggable
        onDragStart={(e) => onDragStart(e, widget)}
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default WidgetControls;
