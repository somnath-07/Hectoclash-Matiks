import React, { useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export function Gap({ gapIndex, content, isActive, onTap }) {
  return (
    <div 
      onClick={() => onTap(gapIndex)}
      className={cn(
        "relative flex items-center justify-center rounded-lg min-w-[30px] h-[54px] transition-all duration-200 cursor-pointer",
        content ? "min-w-fit px-0.5" : "",
        isActive && "bg-[var(--color-hectoc-green)]/15 ring-2 ring-[var(--color-hectoc-green)] ring-offset-1 ring-offset-[var(--color-hectoc-bg)]",
        !isActive && !content && "active:scale-110 active:bg-white/5"
      )}
    >
      {!content && (
        <div className={cn(
          "transition-all duration-200",
          isActive 
            ? "w-[2px] h-7 bg-[var(--color-hectoc-green)] animate-pulse rounded-full shadow-[0_0_6px_var(--color-hectoc-green)]" 
            : "w-2 h-2 rounded-full bg-gray-600"
        )}></div>
      )}
      {content && (
        <span className="text-3xl font-bold text-[var(--color-hectoc-green)] select-none">
          {content}
        </span>
      )}
    </div>
  );
}

export default function GameBoard({ digits, gapContents, activeGap, onGapTap }) {
  const renderBoard = () => {
    const elements = [];
    
    // Gap 0 (before first digit)
    elements.push(
      <Gap 
        key={`gap-0`} 
        gapIndex={0} 
        content={gapContents[0]}
        isActive={activeGap === 0}
        onTap={onGapTap}
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
          content={gapContents[i+1]}
          isActive={activeGap === i+1}
          onTap={onGapTap}
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
