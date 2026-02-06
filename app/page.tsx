import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f4f8] p-10">
      <h1 className="text-4xl font-mono font-bold text-gray-800 mb-8">Soroban Viz そろばん</h1>

      <div className="bg-[#8d6e63] p-6 rounded-lg shadow-2xl border-4 border-[#5d4037]">
        {/* Abacus Frame */}
        <div className="flex gap-2 bg-[#d7ccc8] p-4 rounded inner-shadow">
           {/* Columns */}
           {[1000, 100, 10, 1].map((place) => (
             <div key={place} className="flex flex-col items-center space-y-2 relative">
               <span className="absolute -top-8 text-xs font-bold text-gray-600">{place}</span>
               
               {/* Heaven Bead (5) */}
               <div className="w-12 h-8 bg-amber-900 rounded-full shadow-inner border border-black cursor-pointer hover:bg-amber-800 transition"></div>
               
               {/* Divider */}
               <div className="w-full h-2 bg-black my-2"></div>
               
               {/* Earth Beads (1) */}
               {[1, 2, 3, 4].map((bead) => (
                 <div key={bead} className="w-12 h-8 bg-amber-900 rounded-full shadow-inner border border-black cursor-pointer hover:bg-amber-800 transition transform hover:translate-y-1"></div>
               ))}
             </div>
           ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-2xl font-bold text-gray-700">Current Value: <span className="text-4xl text-blue-600 font-mono">0</span></p>
        <div className="mt-6 space-x-4">
           <button className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600">Add 5</button>
           <button className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600">Reset</button>
        </div>
      </div>
    </main>
  );
}
