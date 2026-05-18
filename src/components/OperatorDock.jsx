import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '../lib/utils';

export function DraggableOperator({ type, id, isOverlay = false }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id || `source-${type}`,
    data: { type },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  let content = type;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "w-14 h-14 rounded-full bg-[var(--color-hectoc-grid)] border border-gray-700 shadow-lg flex items-center justify-center text-[var(--color-hectoc-green)] font-semibold text-2xl touch-none",
        isOverlay ? "opacity-90 scale-105 cursor-grabbing" : "cursor-grab active:cursor-grabbing hover:bg-gray-800"
      )}
    >
      {content}
    </button>
  );
}

export default function OperatorDock({ onUndo, onHint }) {
  const operators = ['+', '-', 'X', '(', '/', ')', '^'];
  
  return (
    <div className="w-full flex flex-col items-center mt-12 mb-8 gap-6 z-20">
      <div className="text-xs text-gray-400 font-medium">Drag the operations in the gaps</div>
      
      <div className="flex flex-wrap justify-center gap-4 max-w-[260px]">
        {operators.slice(0, 3).map(op => (
          <DraggableOperator key={op} type={op} />
        ))}
        {operators.slice(3, 6).map(op => (
          <DraggableOperator key={op} type={op} />
        ))}
        <div className="flex justify-center w-full gap-4 relative left-3">
          {operators.slice(6).map(op => (
            <DraggableOperator key={op} type={op} />
          ))}
          <button 
            onClick={onUndo}
            className="px-6 h-14 rounded-full bg-[var(--color-hectoc-grid)] border border-gray-700 shadow-lg flex items-center justify-center text-[var(--color-hectoc-green)] font-semibold text-lg hover:bg-gray-800 active:scale-95 transition-transform"
          >
            Undo
          </button>
        </div>
      </div>

      <button 
        onClick={onHint}
        className="mt-6 px-6 py-2 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
      >
        <span className="text-gray-400">💡</span> Hint
      </button>
    </div>
  );
}
