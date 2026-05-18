import React from 'react';
import { Timer } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="flex justify-between items-start w-full text-sm">
      {/* Player 1 (You) */}
      <div className="flex flex-col items-start">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
            <img src="https://i.pravatar.cc/150?img=11" alt="You" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">You</span>
            <span className="text-[10px] text-gray-400">12 XP</span>
          </div>
        </div>
        <div className="mt-2 text-sm font-semibold bg-[#2c2c2c] border border-gray-700 px-4 py-0.5 rounded-full ml-1">
          0
        </div>
      </div>

      {/* Center status and Timer */}
      <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 -top-2">
        <div className="text-xs text-gray-400 mb-6 font-medium tracking-wide">Multiplayer - Flow</div>
        <div className="flex items-center space-x-1.5 border border-[var(--color-hectoc-green)] px-3 py-1 rounded-full text-[var(--color-hectoc-green)] bg-[var(--color-hectoc-dark)]/50 backdrop-blur-sm">
          <Timer size={14} />
          <span className="font-mono text-sm tracking-wide font-medium relative top-[1px]">0:59</span>
        </div>
      </div>

      {/* Player 2 (Opponent) */}
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-right leading-tight">
            <span className="font-semibold">Ranjan</span>
            <span className="text-[10px] text-gray-400">20 XP</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
            <img src="https://i.pravatar.cc/150?img=12" alt="Opponent" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="mt-2 text-sm font-semibold bg-[#2c2c2c] border border-gray-700 px-4 py-0.5 rounded-full mr-1">
          0
        </div>
      </div>
    </div>
  );
}
