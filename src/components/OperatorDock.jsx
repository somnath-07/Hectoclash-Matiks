import React from 'react';

export default function OperatorDock({ onOperatorTap }) {
  const operators = ['+', '-', 'X', '(', ')', '/', '^'];
  
  return (
    <div className="w-full flex flex-col items-center pt-5 pb-6 gap-6 z-20 shrink-0">
      <div className="text-[14px] text-white font-medium tracking-wide">
        Type your entire solution using these operators
      </div>
      
      <div className="flex items-center gap-5 text-[28px] font-bold text-[#555]">
        {operators.map(op => (
          <button 
            key={op} 
            onClick={() => onOperatorTap(op)} 
            className="hover:text-white active:scale-90 active:text-[var(--color-hectoc-green)] transition-all cursor-pointer touch-manipulation px-2 py-1"
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
