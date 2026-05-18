import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import TopBar from './components/TopBar';
import GameBoard from './components/GameBoard';
import OperatorDock from './components/OperatorDock';

const VALID_OPERATORS = ['+', '-', 'X', '(', ')', '/', '^'];

function App() {
  const [digits] = useState([2, 4, 9, 3, 8, 4]);
  // gapContents is an array of 7 strings — one per gap
  const [gapContents, setGapContents] = useState(Array.from({ length: 7 }, () => ''));
  const [history, setHistory] = useState([]); // Array of snapshots of gapContents
  const [activeGap, setActiveGap] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [hasWon, setHasWon] = useState(false);

  // Evaluate expression whenever gapContents change
  useEffect(() => {
    let expr = '';
    
    expr += gapContents[0].replace(/X/g, '*');
    
    for (let i = 0; i < digits.length; i++) {
      expr += digits[i];
      expr += gapContents[i+1].replace(/X/g, '*');
    }

    let isDefault = gapContents.every(g => g === '');

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
  }, [gapContents, digits, hasWon]);

  // Listen for physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasWon || activeGap === null) return;

      const key = e.key;
      
      // Map keyboard keys to operator types
      const keyMap = {
        '+': '+', '-': '-', '*': 'X', 'x': 'X', 'X': 'X',
        '(': '(', ')': ')', '/': '/', '^': '^'
      };

      if (keyMap[key]) {
        e.preventDefault();
        handleKeyPress(keyMap[key]);
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'ArrowLeft') {
        e.preventDefault();
        handleMoveLeft();
      } else if (key === 'ArrowRight') {
        e.preventDefault();
        handleMoveRight();
      } else if (key === 'Escape') {
        e.preventDefault();
        setActiveGap(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGap, hasWon, gapContents]);

  const handleGapTap = (gapIndex) => {
    if (hasWon) return;
    setActiveGap(prev => prev === gapIndex ? null : gapIndex);
  };

  const handleKeyPress = useCallback((key) => {
    if (hasWon || activeGap === null) return;
    
    // Save snapshot for undo
    setHistory(prev => [...prev, [...gapContents]]);
    
    setGapContents(prev => {
      const next = [...prev];
      next[activeGap] = next[activeGap] + key;
      return next;
    });
  }, [hasWon, activeGap, gapContents]);

  const handleBackspace = useCallback(() => {
    if (hasWon || activeGap === null) return;
    
    setHistory(prev => [...prev, [...gapContents]]);
    
    setGapContents(prev => {
      const next = [...prev];
      if (next[activeGap].length > 0) {
        next[activeGap] = next[activeGap].slice(0, -1);
      }
      return next;
    });
  }, [hasWon, activeGap, gapContents]);

  const handleClear = () => {
    if (hasWon || activeGap === null) return;
    
    setHistory(prev => [...prev, [...gapContents]]);
    
    setGapContents(prev => {
      const next = [...prev];
      next[activeGap] = '';
      return next;
    });
  };

  const handleUndo = () => {
    if (hasWon || history.length === 0) return;
    
    const lastSnapshot = history[history.length - 1];
    setGapContents(lastSnapshot);
    setHistory(prev => prev.slice(0, -1));
  };

  const handleMoveLeft = () => {
    if (activeGap === null) return;
    setActiveGap(prev => prev > 0 ? prev - 1 : prev);
  };

  const handleMoveRight = () => {
    if (activeGap === null) return;
    setActiveGap(prev => prev < 6 ? prev + 1 : prev);
  };

  const removeGapContent = (gapIndex) => {
    if (hasWon) return;
    setHistory(prev => [...prev, [...gapContents]]);
    setGapContents(prev => {
      const next = [...prev];
      next[gapIndex] = '';
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-hectoc-bg)] text-white font-sans flex flex-col items-center select-none">
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-[0.15]"></div>
      
      <div className="relative z-10 w-full max-w-md h-screen flex flex-col pt-6 pb-8 px-6 overflow-hidden">
        <TopBar />
        
        <GameBoard 
          digits={digits} 
          gapContents={gapContents}
          activeGap={activeGap}
          onGapTap={handleGapTap}
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
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onClear={handleClear}
          onUndo={handleUndo} 
          onHint={() => alert('Try combining 4 and 9 first!')}
          onMoveLeft={handleMoveLeft}
          onMoveRight={handleMoveRight}
          activeGap={activeGap}
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
