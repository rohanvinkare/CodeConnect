

import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">

      {/* ACTIVE SESSIONS */}
      <div className="card bg-[#070C13] border border-[#1A2333] rounded-2xl shadow-[0_0_25px_rgba(0,120,255,0.08)] hover:shadow-[0_0_30px_rgba(0,150,255,0.15)] transition-all">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-[#0D1320] border border-[#223047] rounded-2xl shadow-inner">
              <UsersIcon className="w-7 h-7 text-blue-200" />
            </div>
            <div className="text-xs px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30">
              Live
            </div>
          </div>
          <div className="text-4xl font-black text-blue-100">{activeSessionsCount}</div>
          <div className="text-sm text-neutral-500">Active Sessions</div>
        </div>
      </div>

      {/* RECENT SESSIONS */}
      <div className="card bg-[#070C13] border border-[#1A2333] rounded-2xl shadow-[0_0_25px_rgba(0,120,255,0.08)] hover:shadow-[0_0_30px_rgba(0,150,255,0.15)] transition-all">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-[#0D1320] border border-[#223047] rounded-2xl shadow-inner">
              <TrophyIcon className="w-7 h-7 text-blue-200" />
            </div>
          </div>
          <div className="text-4xl font-black text-blue-100">{recentSessionsCount}</div>
          <div className="text-sm text-neutral-500">Total Sessions</div>
        </div>
      </div>

    </div>
  );
}

export default StatsCards;

