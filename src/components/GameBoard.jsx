import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '../lib/utils';

export function Gap({ gapIndex, operators, onRemove }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `gap-${gapIndex}`,
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "relative flex items-center justify-center min-w-[20px] h-[44px] transition-all duration-150",
        operators.length > 0 && "min-w-fit px-0.5",
        isOver && "scale-110"
      )}
    >
      {operators.length === 0 && (
        <div className={cn(
          "w-[4px] h-[4px] rounded-full transition-all duration-200",
          isOver 
            ? "bg-[var(--color-hectoc-green)] shadow-[0_0_8px_var(--color-hectoc-green)]" 
            : "bg-gray-600"
        )}></div>
      )}
      {operators.map((op) => (
        <button
          key={op.id}
          onClick={() => onRemove(gapIndex, op.id)}
          className="text-xl font-bold text-[var(--color-hectoc-green)] hover:text-red-400 active:text-red-500 active:scale-90 mx-[1px] cursor-pointer transition-all duration-150 touch-manipulation"
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
        <div key={`digit-${i}`} className="text-[2rem] font-bold tracking-tight text-white select-none">
          {digits[i]}
        </div>
      );
      // Following Gap
      elements.push(<Gap key={`gap-${i+1}`} gapIndex={i+1} operators={gaps[i+1]} onRemove={onRemoveOperator} />);
    }

    return elements;
  }

  return (
    <div className="w-full flex-1 flex flex-col mt-3 min-h-0">
      {/* Solid card container — flex-1 fills available space */}
      <div className="w-full flex-1 rounded-xl border border-gray-700/30 bg-[#1E1E1E] overflow-hidden flex flex-col items-center justify-center">
        {/* Digits row */}
        <div className="flex items-center justify-center w-full px-3">
          {renderBoard()}
        </div>
      </div>
    </div>
  );
}
