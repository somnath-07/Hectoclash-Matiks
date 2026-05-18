import React from 'react';
import { cn } from '../lib/utils';

export function TappableOperator({ type, onTap, disabled }) {
  return (
    <button
      onClick={() => onTap(type)}
      disabled={disabled}
      className={cn(
        "w-14 h-14 rounded-full bg-[var(--color-hectoc-grid)] border border-gray-700 shadow-lg flex items-center justify-center text-[var(--color-hectoc-green)] font-semibold text-2xl transition-all duration-150 select-none",
        disabled 
          ? "opacity-40 cursor-not-allowed" 
          : "cursor-pointer active:scale-90 active:bg-[var(--color-hectoc-green)]/20 active:border-[var(--color-hectoc-green)] hover:bg-gray-800"
      )}
    >
      {type}
    </button>
  );
}

export default function OperatorDock({ onOperatorTap, onUndo, onHint, hasSelectedGap }) {
  const operators = ['+', '-', 'X', '(', '/', ')', '^'];
  
  return (
    <div className="w-full flex flex-col items-center mt-12 mb-8 gap-6 z-20">
      <div className={cn(
        "text-xs font-medium transition-all duration-300",
        hasSelectedGap 
          ? "text-[var(--color-hectoc-green)] animate-pulse" 
          : "text-gray-400"
      )}>
        {hasSelectedGap ? "Now tap an operator" : "Tap a gap first, then an operator"}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 max-w-[260px]">
        {operators.slice(0, 3).map(op => (
          <TappableOperator key={op} type={op} onTap={onOperatorTap} disabled={!hasSelectedGap} />
        ))}
        {operators.slice(3, 6).map(op => (
          <TappableOperator key={op} type={op} onTap={onOperatorTap} disabled={!hasSelectedGap} />
        ))}
        <div className="flex justify-center w-full gap-4 relative left-3">
          {operators.slice(6).map(op => (
            <TappableOperator key={op} type={op} onTap={onOperatorTap} disabled={!hasSelectedGap} />
          ))}
          <button 
            onClick={onUndo}
            className="px-6 h-14 rounded-full bg-[var(--color-hectoc-grid)] border border-gray-700 shadow-lg flex items-center justify-center text-[var(--color-hectoc-green)] font-semibold text-lg hover:bg-gray-800 active:scale-95 transition-all duration-150 cursor-pointer select-none"
          >
            Undo
          </button>
        </div>
      </div>

      <button 
        onClick={onHint}
        className="mt-6 px-6 py-2 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer select-none"
      >
        <span className="text-gray-400">💡</span> Hint
      </button>
    </div>
  );
}
