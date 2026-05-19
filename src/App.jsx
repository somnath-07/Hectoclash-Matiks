import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import TopBar from './components/TopBar';
import GameBoard from './components/GameBoard';
import OperatorDock from './components/OperatorDock';

function App() {
  const [digits] = useState([1, 9, 6, 2, 6, 4]);
  const [inputValue, setInputValue] = useState('');
  const [currentResult, setCurrentResult] = useState(null);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      setCurrentResult(null);
      return;
    }

    try {
      const formattedExpr = inputValue.replace(/X/g, '*').replace(/x/g, '*');
      const res = evaluate(formattedExpr);
      
      if (typeof res === 'number' && !isNaN(res)) {
        let finalRes = Number(res.toFixed(4));
        if (finalRes === Math.floor(finalRes)) finalRes = Math.floor(finalRes);

        setCurrentResult(finalRes);

        if (finalRes === 100 && !hasWon) {
          // Verify if digits are correct
          const stripped = inputValue.replace(/[^0-9]/g, '');
          const required = digits.join('');
          if (stripped === required) {
            setHasWon(true);
          }
        }
      } else {
        setCurrentResult(null);
      }
    } catch (e) {
      setCurrentResult(null);
    }
  }, [inputValue, digits, hasWon]);

  const handleInputChange = (val) => {
    if (hasWon) return;
    setInputValue(val);
  };

  const handleOperatorTap = (op) => {
    if (hasWon) return;
    setInputValue(prev => prev + op);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[var(--color-hectoc-bg)] text-white font-sans flex flex-col items-center select-none overflow-y-auto">
      <div className="relative z-10 w-full max-w-md h-full min-h-[100dvh] flex flex-col justify-start pt-3 px-5">
        <TopBar />
        
        <GameBoard 
          digits={digits} 
          inputValue={inputValue}
          onInputChange={handleInputChange}
        />

        {/* Live Feed Result (Optional, keeps it consistent or hide if we just want them to submit? No, feedback is good) */}
        {inputValue && currentResult !== null && !hasWon && (
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 text-xl font-bold text-gray-500">
            = {currentResult}
          </div>
        )}

        <OperatorDock 
          onOperatorTap={handleOperatorTap}
        />

        {hasWon && (
           <div className="absolute inset-0 z-50 bg-[#1E1E1E]/95 flex flex-col items-center justify-center backdrop-blur-md">
              <div className="text-[var(--color-hectoc-green)] mb-2 font-bold text-lg tracking-widest uppercase">Winner</div>
              <h2 className="text-5xl font-black text-white mb-6">100</h2>
              <p className="text-gray-300 text-sm mb-6 max-w-[200px] text-center">
                You successfully solved the hectoc!
              </p>
              <button 
                onClick={() => {
                  setInputValue('');
                  setHasWon(false);
                }}
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
