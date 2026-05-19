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
        "relative flex items-center justify-center min-w-[24px] h-[50px] transition-all duration-150",
        operators.length > 0 && "min-w-fit px-0.5",
        isOver && "scale-110"
      )}
    >
      {operators.length === 0 && (
        <div className={cn(
          "w-[5px] h-[5px] rounded-full transition-all duration-200",
          isOver 
            ? "bg-[var(--color-hectoc-green)] shadow-[0_0_8px_var(--color-hectoc-green)]" 
            : "bg-gray-600"
        )}></div>
      )}
      {operators.map((op) => (
        <button
          key={op.id}
          onClick={() => onRemove(gapIndex, op.id)}
          className="text-2xl font-bold text-[var(--color-hectoc-green)] hover:text-red-400 active:text-red-500 active:scale-90 mx-[1px] cursor-pointer transition-all duration-150 touch-manipulation"
        >
          {op.type}
        </button>
      ))}
    </div>
  );
}

export default function GameBoard({ digits, gaps, onRemoveOperator, currentResult }) {
  const renderBoard = () => {
    const elements = [];
    
    // Gap 0 (before first digit)
    elements.push(<Gap key={`gap-0`} gapIndex={0} operators={gaps[0]} onRemove={onRemoveOperator} />);
    
    for (let i = 0; i < digits.length; i++) {
      // Digit
      elements.push(
        <div key={`digit-${i}`} className="text-[2.25rem] font-bold tracking-tight text-white select-none">
          {digits[i]}
        </div>
      );
      // Following Gap
      elements.push(<Gap key={`gap-${i+1}`} gapIndex={i+1} operators={gaps[i+1]} onRemove={onRemoveOperator} />);
    }

    return elements;
  }

  return (
    <div className="w-full mt-4">
      {/* Grid card container */}
      <div className="w-full rounded-2xl bg-[var(--color-hectoc-card)] bg-grid-pattern overflow-hidden">
        {/* Digits row */}
        <div className="flex items-center justify-center w-full px-4 pt-10 pb-4">
          {renderBoard()}
        </div>

        {/* Result display inside the card */}
        <div className="flex justify-center px-4 pb-8">
          {currentResult !== null ? (
            <div className="text-xl font-bold bg-[#2a2a2a] px-10 py-2.5 rounded-2xl text-white min-w-[120px] text-center">
              {currentResult}
            </div>
          ) : (
            <div className="w-[120px] h-[42px] bg-[#2a2a2a] rounded-2xl"></div>
          )}
        </div>
      </div>
    </div>
  );
}
