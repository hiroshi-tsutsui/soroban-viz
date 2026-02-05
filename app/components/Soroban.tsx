'use client';

import { useState } from 'react';

type ColumnState = {
  heavenActive: boolean; // true = bead is DOWN (active, value 5)
  earthCount: number;    // number of beads UP (active, value 1-4)
};

const COLS = 13;

export default function Soroban() {
  const [columns, setColumns] = useState<ColumnState[]>(
    Array(COLS).fill({ heavenActive: false, earthCount: 0 })
  );

  const toggleHeaven = (idx: number) => {
    setColumns(prev => prev.map((col, i) => 
      i === idx ? { ...col, heavenActive: !col.heavenActive } : col
    ));
  };

  const setEarth = (idx: number, clickedBeadNum: number) => {
    // Logic: Click bead N (1-4 from top).
    // If currently N beads are active (meaning we clicked the bottom-most active bead), reduce count to N-1.
    // Otherwise, set count to N.
    
    setColumns(prev => prev.map((col, i) => {
        if (i !== idx) return col;
        
        // If we click the 3rd bead, and we currently have 3 active, 
        // that means the 3rd bead is the last active one. Clicking it should deactivate it (go to 2).
        if (col.earthCount === clickedBeadNum) {
            return { ...col, earthCount: clickedBeadNum - 1 };
        }
        
        // Otherwise, activate up to this bead.
        return { ...col, earthCount: clickedBeadNum };
    }));
  };

  const calculateValue = () => {
    let total = 0;
    columns.forEach((col, i) => {
        const placeVal = Math.pow(10, (COLS - 1) - i);
        const colVal = (col.heavenActive ? 5 : 0) + col.earthCount;
        total += colVal * placeVal;
    });
    return total;
  };

  const reset = () => {
      setColumns(Array(COLS).fill({ heavenActive: false, earthCount: 0 }));
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="bg-amber-100 p-6 rounded-xl shadow-inner border border-amber-200 min-w-[300px] text-center">
        <div className="text-4xl font-mono text-amber-900 font-bold tracking-widest">
            {calculateValue().toLocaleString()}
        </div>
      </div>

      {/* Frame */}
      <div className="bg-amber-950 p-4 rounded-lg shadow-2xl flex gap-1 select-none overflow-x-auto max-w-full">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col items-center gap-1 group relative">
             {/* Rod */}
             <div className="relative flex flex-col items-center bg-amber-100/30 pt-2 pb-2 rounded w-10 md:w-12 h-[320px]">
                <div className="absolute inset-y-0 w-1 bg-neutral-400 z-0"></div>
                
                {/* Heaven Bead */}
                <div className="z-10 h-20 w-full flex justify-center items-start cursor-pointer" onClick={() => toggleHeaven(i)}>
                    <div className={`w-10 h-8 md:w-11 md:h-9 rounded-[40%] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3)] transition-all duration-300 border border-amber-900
                        ${col.heavenActive 
                            ? 'translate-y-[44px] bg-amber-600'  // Active (Down)
                            : 'translate-y-0 bg-amber-400'  // Inactive (Up)
                        }`}
                    ></div>
                </div>

                {/* Beam/Separator */}
                <div className="w-[120%] h-4 bg-amber-900 z-20 rounded-sm mb-1 shadow-md relative flex justify-center items-center">
                    {/* Unit Markers (Dots) on the beam */}
                    {(COLS - 1 - i) % 3 === 0 && (COLS - 1 - i) !== 0 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm"></div>
                    )}
                </div>

                {/* Earth Beads */}
                <div className="z-10 flex flex-col w-full items-center justify-start h-full pt-1">
                    {[1, 2, 3, 4].map((beadNum) => {
                        const isActive = col.earthCount >= beadNum;
                        // Gap Logic: 
                        // If count is 0, bead 1 has gap.
                        // If count is 1, bead 2 has gap.
                        // ...
                        // If count is 4, no beads have gap (gap is below 4).
                        const hasGap = beadNum === col.earthCount + 1;

                        return (
                            <div 
                                key={beadNum}
                                onClick={() => setEarth(i, beadNum)}
                                className={`w-10 h-8 md:w-11 md:h-9 rounded-[40%] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer border border-amber-900 z-10 mb-1
                                    ${isActive 
                                        ? 'bg-amber-600' // Active
                                        : 'bg-amber-400' 
                                    }
                                    ${hasGap ? 'mt-12' : ''}
                                `}
                            ></div>
                        );
                    })}
                </div>
             </div>
          </div>
        ))}
      </div>

      <button 
        onClick={reset}
        className="px-8 py-3 bg-amber-800 text-amber-50 rounded-lg hover:bg-amber-900 font-bold shadow-lg active:scale-95 transition-transform"
      >
        RESET
      </button>

      <div className="text-amber-800 text-sm max-w-lg text-center space-y-1">
        <p className="font-bold">Instructions</p>
        <p>Upper Deck: 1 bead = 5 (Active when moved DOWN)</p>
        <p>Lower Deck: 1 bead = 1 (Active when moved UP)</p>
      </div>
    </div>
  );
}
