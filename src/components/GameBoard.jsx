import React from 'react';
import { cn } from '../lib/utils';

export function Gap({ gapIndex, operators, onRemove, isSelected, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(gapIndex)}
      className={cn(
        "relative flex items-center justify-center rounded-lg min-w-[34px] h-[54px] transition-all duration-200 cursor-pointer",
        operators.length === 0 ? "" : "min-w-fit px-1",
        isSelected && "bg-[var(--color-hectoc-green)]/15 ring-2 ring-[var(--color-hectoc-green)] ring-offset-1 ring-offset-[var(--color-hectoc-bg)] scale-110",
        !isSelected && operators.length === 0 && "active:scale-110 active:bg-white/5"
      )}
    >
      {operators.length === 0 && (
        <div className={cn(
          "w-2 h-2 rounded-full transition-all duration-200",
          isSelected ? "bg-[var(--color-hectoc-green)] scale-125 shadow-[0_0_8px_var(--color-hectoc-green)]" : "bg-gray-600"
        )}></div>
      )}
      {operators.map((op) => (
        <button
          key={op.id}
          onClick={(e) => { e.stopPropagation(); onRemove(gapIndex, op.id); }}
          className="text-3xl font-bold text-[var(--color-hectoc-green)] hover:text-red-400 active:text-red-500 active:scale-90 mx-[1px] cursor-pointer transition-all duration-150"
        >
          {op.type}
        </button>
      ))}
    </div>
  );
}

export default function GameBoard({ digits, gaps, onRemoveOperator, selectedGap, onSelectGap }) {
  const renderBoard = () => {
    const elements = [];
    
    // Gap 0 (before first digit)
    elements.push(
      <Gap 
        key={`gap-0`} 
        gapIndex={0} 
        operators={gaps[0]} 
        onRemove={onRemoveOperator} 
        isSelected={selectedGap === 0}
        onSelect={onSelectGap}
      />
    );
    
    for (let i = 0; i < digits.length; i++) {
      // Digit
      elements.push(
        <div key={`digit-${i}`} className="text-[2.75rem] font-bold tracking-tight text-white select-none relative -top-[2px]">
          {digits[i]}
        </div>
      );
      // Following Gap
      elements.push(
        <Gap 
          key={`gap-${i+1}`} 
          gapIndex={i+1} 
          operators={gaps[i+1]} 
          onRemove={onRemoveOperator}
          isSelected={selectedGap === i+1}
          onSelect={onSelectGap}
        />
      );
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
