import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import TopBar from './components/TopBar';
import GameBoard from './components/GameBoard';
import OperatorDock from './components/OperatorDock';

function App() {
  const [digits] = useState([2, 4, 9, 3, 8, 4]);
  // gaps is an array of 7 arrays. Each holds { id, type }
  const [gaps, setGaps] = useState(Array.from({ length: 7 }, () => []));
  const [history, setHistory] = useState([]); // Array of { gapIndex, opId }
  const [selectedGap, setSelectedGap] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    // Build the math expression string
    let expr = '';
    
    // Process gaps[0]
    expr += gaps[0].map(op => op.type.replace('X', '*')).join('');
    
    for (let i = 0; i < digits.length; i++) {
        expr += digits[i];
        expr += gaps[i+1].map(op => op.type.replace('X', '*')).join('');
    }

    let isDefault = true;
    for(let i=0; i< gaps.length; i++){
      if(gaps[i].length > 0) { isDefault = false; break; }
    }

    if (isDefault) {
      setCurrentResult(null);
      return;
    }

    try {
      const res = evaluate(expr);
      if (typeof res === 'number' && !isNaN(res)) {
        let finalRes = Number(res.toFixed(4));
        if (finalRes === Math.floor(finalRes)) finalRes = Math.floor(finalRes);

        setCurrentResult(finalRes);

        if (finalRes === 100 && !hasWon) {
          setHasWon(true);
        }
      } else {
        setCurrentResult(null);
      }
    } catch (e) {
      setCurrentResult(null);
    }

  }, [gaps, digits, hasWon]);

  const handleSelectGap = (gapIndex) => {
    if (hasWon) return;
    setSelectedGap(prev => prev === gapIndex ? null : gapIndex);
  };

  const handleOperatorTap = (opType) => {
    if (hasWon || selectedGap === null) return;
    
    const newOpId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setGaps(prev => {
      const next = [...prev];
      next[selectedGap] = [...next[selectedGap], { id: newOpId, type: opType }];
      return next;
    });

    setHistory(prev => [...prev, { gapIndex: selectedGap, opId: newOpId }]);
    // Keep the gap selected so user can add multiple operators to same gap
  };

  const removeOperator = (gapIndex, opId) => {
    if (hasWon) return;
    setGaps(prev => {
      const next = [...prev];
      next[gapIndex] = next[gapIndex].filter(op => op.id !== opId);
      return next;
    });
    setHistory(prev => prev.filter(h => h.opId !== opId));
  };

  const handleUndo = () => {
    if (hasWon || history.length === 0) return;
    
    const lastAction = history[history.length - 1];
    removeOperator(lastAction.gapIndex, lastAction.opId);
  };

  return (
    <div className="min-h-screen bg-[var(--color-hectoc-bg)] text-white font-sans flex flex-col items-center select-none">
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-[0.15]"></div>
      
      <div className="relative z-10 w-full max-w-md h-screen flex flex-col pt-6 pb-8 px-6 overflow-hidden">
        <TopBar />
        
        <GameBoard 
          digits={digits} 
          gaps={gaps} 
          onRemoveOperator={removeOperator}
          selectedGap={selectedGap}
          onSelectGap={handleSelectGap}
        />

        {/* Live Feed Result */}
        <div className="mt-8 mb-2 flex justify-center h-[54px]">
          {currentResult !== null ? (
            <div className="text-2xl font-bold bg-[#333] px-10 py-3 rounded-2xl shadow-inner text-white transition-all transform scale-100">
              {currentResult}
            </div>
          ) : (
            <div className="w-[120px] h-full bg-[#333] rounded-2xl opacity-60"></div>
          )}
        </div>

        <OperatorDock 
          onOperatorTap={handleOperatorTap}
          onUndo={handleUndo} 
          onHint={() => alert('Try combining 4 and 9 first!')}
          hasSelectedGap={selectedGap !== null}
        />

        {hasWon && (
           <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="text-[var(--color-hectoc-green)] mb-2 font-bold text-lg tracking-widest uppercase">Winner</div>
              <h2 className="text-5xl font-black text-white mb-6">100</h2>
              <p className="text-gray-300 text-sm mb-6 max-w-[200px] text-center">
                You successfully solved the hectoc!
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-[var(--color-hectoc-green)] text-black font-bold rounded-full hover:bg-green-400 transition-colors"
              >
                Play Again
              </button>
           </div>
        )}
      </div>
    </div>
  );
}

export default App;
