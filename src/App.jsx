import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { evaluate } from 'mathjs';
import TopBar from './components/TopBar';
import GameBoard from './components/GameBoard';
import OperatorDock, { DraggableOperator } from './components/OperatorDock';

function App() {
  const [digits] = useState([1, 9, 6, 2, 6, 4]);
  // gaps is an array of 7 arrays. Each holds { id, type }
  const [gaps, setGaps] = useState(Array.from({ length: 7 }, () => []));
  const [history, setHistory] = useState([]); // Array of { gapIndex, opId }
  const [activeDragOp, setActiveDragOp] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [hasWon, setHasWon] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

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

  const handleDragStart = (event) => {
    if (hasWon) return;
    setActiveDragOp(event.active.data.current?.type);
  };

  const handleDragEnd = (event) => {
    setActiveDragOp(null);
    if (hasWon) return;
    
    const { over, active } = event;
    if (over && over.id.startsWith('gap-')) {
      const gapIndex = parseInt(over.id.replace('gap-', ''), 10);
      const opType = active.data.current?.type;
      
      const newOpId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      setGaps(prev => {
        const next = [...prev];
        next[gapIndex] = [...next[gapIndex], { id: newOpId, type: opType }];
        return next;
      });

      setHistory(prev => [...prev, { gapIndex, opId: newOpId }]);
    }
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
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen h-[100dvh] bg-[var(--color-hectoc-bg)] text-white font-sans flex flex-col items-center select-none overflow-hidden">
        <div className="relative z-10 w-full max-w-md h-full flex flex-col pt-3 pb-4 px-5">
          <TopBar />
          
          <GameBoard 
            digits={digits} 
            gaps={gaps} 
            onRemoveOperator={removeOperator}
            currentResult={currentResult}
          />

          <OperatorDock 
            onUndo={handleUndo} 
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
                  className="px-8 py-3 bg-[var(--color-hectoc-green)] text-black font-bold rounded-full hover:bg-green-400 transition-colors touch-manipulation"
                >
                  Play Again
                </button>
             </div>
          )}
        </div>
      </div>
      
      <DragOverlay dropAnimation={{ duration: 150 }}>
        {activeDragOp ? (
          <DraggableOperator type={activeDragOp} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
