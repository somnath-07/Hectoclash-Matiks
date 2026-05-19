import React from 'react';
import { Timer } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="flex flex-col w-full gap-2.5 shrink-0">
      {/* Player row */}
      <div className="flex justify-between items-start w-full text-sm">
        {/* Player 1 (You) */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
              <img src="https://i.pravatar.cc/150?img=11" alt="You" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-[13px]">You</span>
              <span className="text-[10px] text-gray-500">12 XP</span>
            </div>
          </div>
          <div className="mt-1 text-[11px] font-semibold bg-[#222] border border-gray-700/40 px-3 py-[1px] rounded-full">
            0
          </div>
        </div>

        {/* Player 2 (Opponent) */}
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col text-right leading-tight">
              <span className="font-semibold text-[13px]">Ranjan</span>
              <span className="text-[10px] text-gray-500">20 XP</span>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
              <img src="https://i.pravatar.cc/150?img=12" alt="Opponent" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mt-1 text-[11px] font-semibold bg-[#222] border border-gray-700/40 px-3 py-[1px] rounded-full">
            0
          </div>
        </div>
      </div>

      {/* Timer - centered below players */}
      <div className="flex justify-center mt-0.5">
        <div className="flex items-center space-x-1.5 border border-[var(--color-hectoc-green)] px-3 py-[3px] rounded-full text-[var(--color-hectoc-green)] bg-black/30">
          <Timer size={12} strokeWidth={2.5} />
          <span className="font-mono text-[13px] tracking-wide font-medium relative top-[0.5px]">0:59</span>
        </div>
      </div>
    </div>
  );
}
