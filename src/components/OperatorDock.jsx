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

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "w-[60px] h-[60px] rounded-full border flex items-center justify-center font-semibold text-2xl touch-none select-none transition-all duration-150",
        "bg-[var(--color-hectoc-grid)] border-gray-700/60 text-[var(--color-hectoc-green)]",
        isOverlay 
          ? "opacity-90 scale-110 cursor-grabbing shadow-xl shadow-[var(--color-hectoc-green)]/10 border-[var(--color-hectoc-green)]/40" 
          : "cursor-grab active:cursor-grabbing active:scale-95"
      )}
    >
      {type}
    </button>
  );
}

export default function OperatorDock({ onUndo }) {
  const row1 = ['+', '-', 'X'];
  const row2 = ['(', '/', ')'];
  
  return (
    <div className="w-full flex flex-col items-center mt-6 gap-5 z-20">
      {/* Instruction */}
      <div className="text-xs text-gray-500 font-medium tracking-wide">
        Drag the  operations in the gaps
      </div>
      
      {/* Operator grid */}
      <div className="flex flex-col items-center gap-4">
        {/* Row 1: + - X */}
        <div className="flex items-center gap-5">
          {row1.map(op => (
            <DraggableOperator key={op} type={op} />
          ))}
        </div>
        
        {/* Row 2: ( / ) */}
        <div className="flex items-center gap-5">
          {row2.map(op => (
            <DraggableOperator key={op} type={op} />
          ))}
        </div>
        
        {/* Row 3: ^ + Undo */}
        <div className="flex items-center gap-4">
          <DraggableOperator type="^" />
          <button 
            onClick={onUndo}
            className="px-8 h-[60px] rounded-full bg-[var(--color-hectoc-grid)] border border-gray-700/60 flex items-center justify-center text-gray-300 font-semibold text-base active:scale-95 transition-all duration-150 cursor-pointer select-none touch-manipulation"
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  );
}
