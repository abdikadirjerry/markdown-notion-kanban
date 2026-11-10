import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-stone-200 bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
          N
        </div>
        <div>
          <h1 className="text-xs font-semibold text-stone-900 uppercase tracking-widest">
            Workspace // Engineering Kanban
          </h1>
          <p className="text-[10px] text-stone-500">
            NOTION-STYLE EDITORIAL BOARD
          </p>
        </div>
      </div>
      <div className="text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
        Status: <strong className="text-stone-900">Active Sync</strong>
      </div>
    </header>
  );
};
