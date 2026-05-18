import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '../lib/utils'; // Keep this one

export function Gap({ gapIndex, operators, onRemove }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `gap-${gapIndex}`,
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "relative flex items-center justify-center rounded-lg min-w-[30px] h-[50px] transition-all",
        operators.length === 0 ? "" : "min-w-fit px-1",
        isOver && "bg-[var(--color-hectoc-green)]/10 scale-110"
      )}
    >
      {operators.length === 0 && (
        <div className={cn(
          "w-1.5 h-1.5 rounded-full bg-gray-600 transition-colors",
          isOver && "bg-[var(--color-hectoc-green)]"
        )}></div>
      )}
      {operators.map((op) => (
        <button
          key={op.id}
          onClick={() => onRemove(gapIndex, op.id)}
          className="text-3xl font-bold text-[var(--color-hectoc-green)] hover:text-red-400 mx-[1px] cursor-pointer"
        >
          {op.type}
        </button>
      ))}
    </div>
  );
}

export default function GameBoard({ digits, gaps, onRemoveOperator }) {
  const renderBoard = () => {
    const elements = [];
    
    // Gap 0 (before first digit)
    elements.push(<Gap key={`gap-0`} gapIndex={0} operators={gaps[0]} onRemove={onRemoveOperator} />);
    
    for (let i = 0; i < digits.length; i++) {
        // Digit
        elements.push(
            <div key={`digit-${i}`} className="text-[2.75rem] font-bold tracking-tight text-white select-none relative -top-[2px]">
              {digits[i]}
            </div>
        );
        // Following Gap
        elements.push(<Gap key={`gap-${i+1}`} gapIndex={i+1} operators={gaps[i+1]} onRemove={onRemoveOperator} />);
    }

    return elements;
  }

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <div className="flex items-center justify-center w-full max-w-[400px]">
        {renderBoard()}
      </div>
    </div>
  );
}
