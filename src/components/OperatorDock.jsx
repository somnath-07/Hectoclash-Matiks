import React from 'react';
import { cn } from '../lib/utils';

export function TappableOperator({ type, onTap, isSelected }) {
  return (
    <button
      onClick={() => onTap(type)}
      className={cn(
        "w-[64px] h-[64px] rounded-full flex items-center justify-center font-normal text-[28px] touch-none select-none transition-all duration-150",
        "bg-transparent border border-[#333] border-b-[5px] border-b-[#4a4a4a] text-[var(--color-hectoc-green)]",
        isSelected 
          ? "bg-[#222] border-[var(--color-hectoc-green)] border-b-[var(--color-hectoc-green)] scale-105" 
          : "cursor-pointer active:scale-95 active:border-b-[1px] active:translate-y-[4px]"
      )}
    >
      {type}
    </button>
  );
}

export default function OperatorDock({ onOperatorTap, selectedOperator, onUndo, hasSelectedGap }) {
  const row1 = ['+', '-', 'X'];
  const row2 = ['(', '/', ')'];
  
  return (
    <div className="w-full flex flex-col items-center pt-5 pb-2 gap-5 z-20 shrink-0">
      <div className={cn(
        "text-[13px] font-medium tracking-wide transition-all duration-300",
        hasSelectedGap 
          ? "text-[var(--color-hectoc-green)]" 
          : selectedOperator ? "text-[var(--color-hectoc-green)]" : "text-gray-300"
      )}>
        {hasSelectedGap 
          ? "Now tap an operator" 
          : selectedOperator ? "Now tap a gap" : "Tap on the gaps to add operators"}
      </div>
      
      <div className="flex flex-col items-center gap-4">
        {/* Row 1: + - X */}
        <div className="flex items-center gap-5">
          {row1.map(op => (
            <TappableOperator key={op} type={op} onTap={onOperatorTap} isSelected={selectedOperator === op} />
          ))}
        </div>
        
        {/* Row 2: ( / ) */}
        <div className="flex items-center gap-5">
          {row2.map(op => (
            <TappableOperator key={op} type={op} onTap={onOperatorTap} isSelected={selectedOperator === op} />
          ))}
        </div>
        
        {/* Row 3: ^ + Undo */}
        <div className="flex items-center gap-5">
          <TappableOperator type="^" onTap={onOperatorTap} isSelected={selectedOperator === '^'} />
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
