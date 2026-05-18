import React from 'react';
import { cn } from '../lib/utils';

function KeyButton({ label, onPress, variant = 'default', wide = false }) {
  return (
    <button
      onClick={() => onPress(label)}
      className={cn(
        "h-14 rounded-xl flex items-center justify-center font-semibold text-xl transition-all duration-100 select-none active:scale-90",
        wide ? "col-span-2 px-4" : "w-full",
        variant === 'default' && "bg-[var(--color-hectoc-grid)] border border-gray-700 text-[var(--color-hectoc-green)] active:bg-[var(--color-hectoc-green)]/20 active:border-[var(--color-hectoc-green)] cursor-pointer",
        variant === 'action' && "bg-[var(--color-hectoc-green)]/15 border border-[var(--color-hectoc-green)]/40 text-[var(--color-hectoc-green)] active:bg-[var(--color-hectoc-green)]/30 cursor-pointer",
        variant === 'danger' && "bg-red-500/10 border border-red-500/30 text-red-400 active:bg-red-500/25 cursor-pointer"
      )}
    >
      {label}
    </button>
  );
}

export default function OperatorDock({ onKeyPress, onBackspace, onClear, onUndo, onHint, onMoveLeft, onMoveRight, activeGap }) {
  const operators = ['+', '-', 'X'];
  const extras = ['(', '/', ')'];
  const special = ['^'];
  
  return (
    <div className="w-full flex flex-col items-center mt-8 mb-6 gap-4 z-20">
      <div className={cn(
        "text-xs font-medium transition-all duration-300",
        activeGap !== null
          ? "text-[var(--color-hectoc-green)]" 
          : "text-gray-400"
      )}>
        {activeGap !== null 
          ? `Typing in gap ${activeGap} — use keys below` 
          : "Tap a gap to start typing operators"}
      </div>
      
      {/* Operator keyboard */}
      <div className="w-full max-w-[320px] flex flex-col gap-2.5">
        {/* Row 1: Main operators */}
        <div className="grid grid-cols-4 gap-2.5">
          {operators.map(op => (
            <KeyButton key={op} label={op} onPress={onKeyPress} />
          ))}
          <KeyButton label="^" onPress={onKeyPress} />
        </div>
        
        {/* Row 2: Parens + extras */}
        <div className="grid grid-cols-4 gap-2.5">
          {extras.map(op => (
            <KeyButton key={op} label={op} onPress={onKeyPress} />
          ))}
          <KeyButton label="⌫" onPress={onBackspace} variant="danger" />
        </div>

        {/* Row 3: Navigation + actions */}
        <div className="grid grid-cols-4 gap-2.5">
          <KeyButton label="◀" onPress={onMoveLeft} variant="action" />
          <KeyButton label="▶" onPress={onMoveRight} variant="action" />
          <KeyButton label="Undo" onPress={onUndo} variant="action" />
          <KeyButton label="Clear" onPress={onClear} variant="danger" />
        </div>
      </div>

      <button 
        onClick={onHint}
        className="mt-4 px-6 py-2 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer select-none"
      >
        <span className="text-gray-400">💡</span> Hint
      </button>
    </div>
  );
}
