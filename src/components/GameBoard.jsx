import React from 'react';
import { cn } from '../lib/utils';

export function Gap({ gapIndex, operators, onRemove, isSelected, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(gapIndex)}
      className={cn(
        "relative flex items-center justify-center min-w-[20px] h-[44px] transition-all duration-150 cursor-pointer",
        operators.length > 0 && "min-w-fit px-0.5",
        isSelected && "border border-[var(--color-hectoc-green)] rounded-[4px] px-2 py-2"
      )}
    >
      {operators.length === 0 && (
        <div className={cn(
          "w-[4px] h-[4px] rounded-full transition-all duration-200",
          isSelected 
            ? "bg-[var(--color-hectoc-green)]" 
            : "bg-gray-600"
        )}></div>
      )}
      {operators.map((op) => (
        <button
          key={op.id}
          onClick={(e) => { e.stopPropagation(); onRemove(gapIndex, op.id); }}
          className="text-xl font-bold text-[var(--color-hectoc-green)] hover:text-red-400 active:text-red-500 active:scale-90 mx-[1px] cursor-pointer transition-all duration-150 touch-manipulation"
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
        <div key={`digit-${i}`} className="text-[2rem] font-bold tracking-tight text-white select-none relative">
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
    <div className="w-full flex-1 flex flex-col mt-3 min-h-0">
      {/* Transparent card container — flex-1 fills available space */}
      <div className="w-full flex-1 overflow-hidden flex flex-col items-center justify-center">
        {/* Digits row */}
        <div className="flex items-center justify-center w-full px-3">
          {renderBoard()}
        </div>
      </div>
    </div>
  );
}
