import React from 'react';

export default function GameBoard({ digits, inputValue, onInputChange }) {
  return (
    <div className="w-full shrink-0 flex flex-col items-center justify-center gap-6 mt-6">
      {/* Digits row */}
      <div className="flex items-center justify-center gap-4 text-white">
        {digits.map((digit, i) => (
          <span key={i} className="text-[2rem] font-bold tracking-tight">{digit}</span>
        ))}
      </div>
      
      {/* Input box */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        className="w-full max-w-[320px] h-[64px] bg-[#2a2a2a] border border-[var(--color-hectoc-green)] rounded-xl text-center text-[28px] font-semibold tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-hectoc-green)] focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
        placeholder=""
        autoFocus
        spellCheck="false"
        autoComplete="off"
      />
    </div>
  );
}
