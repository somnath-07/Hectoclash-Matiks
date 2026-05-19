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
        "w-[64px] h-[64px] rounded-full flex items-center justify-center font-normal text-[28px] touch-none select-none transition-all duration-150",
        "bg-transparent border border-[#333] border-b-[5px] border-b-[#4a4a4a] text-[var(--color-hectoc-green)]",
        isOverlay 
          ? "opacity-90 scale-110 cursor-grabbing shadow-xl shadow-[var(--color-hectoc-green)]/10" 
          : "cursor-grab active:cursor-grabbing active:scale-95 active:border-b-[1px] active:translate-y-[4px]"
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
    <div className="w-full flex flex-col items-center pt-5 pb-2 gap-5 z-20 shrink-0">
      {/* Instruction */}
      <div className="text-[13px] text-gray-300 font-medium tracking-wide">
        Drag the operations in the gaps
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
        <div className="flex items-center gap-5">
          <DraggableOperator type="^" />
          <button 
            onClick={onUndo}
            className="w-[148px] h-[64px] rounded-[24px] bg-transparent border border-[#333] border-b-[5px] border-b-[#4a4a4a] flex items-center justify-center text-white font-semibold text-lg active:scale-95 active:border-b-[1px] active:translate-y-[4px] transition-all duration-150 cursor-pointer select-none touch-manipulation"
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  );
}
