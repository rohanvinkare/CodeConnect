

import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="card bg-[#070C13] border border-[#1A2333] shadow-[0_0_25px_rgba(0,120,255,0.1)] rounded-2xl mt-10">
      <div className="card-body">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[#0D1320] border border-[#223047] rounded-xl shadow-inner">
            <Clock className="w-5 h-5 text-blue-200" />
          </div>
          <h2 className="text-2xl font-black text-white">Your Past Sessions</h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* LOADING */}
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-10 h-10 animate-spin text-blue-300" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`card relative rounded-2xl transition-all border ${
                  session.status === "active"
                    ? "bg-[#0A1510] border-[#1F4028] shadow-[0_0_20px_rgba(0,255,140,0.12)]"
                    : "bg-[#0A111A] border-[#1F2637] shadow-[0_0_20px_rgba(0,120,255,0.08)] hover:border-blue-300/40"
                }`}
              >
                {/* ACTIVE LABEL */}
                {session.status === "active" && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-600/20 rounded-xl text-green-300 text-xs border border-green-500/40">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      ACTIVE
                    </div>
                  </div>
                )}

                {/* BODY */}
                <div className="card-body p-5">

                  {/* ICON + TITLE */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner border ${
                        session.status === "active"
                          ? "bg-gradient-to-br from-green-600/70 to-green-500/40 border-green-400/30"
                          : "bg-gradient-to-br from-[#0D1320] to-[#1A2235] border-[#243147]"
                      }`}
                    >
                      <Code2 className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-base text-white truncate">
                        {session.problem}
                      </h3>

                      <span
                        className={`badge badge-sm mt-1 ${getDifficultyBadgeClass(
                          session.difficulty
                        )}`}
                      >
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-2 text-neutral-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#1D2736]">
                    <span className="text-xs text-neutral-400 font-semibold uppercase">
                      Completed
                    </span>
                    <span className="text-xs text-neutral-500">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#0D1320] border border-[#2A3650] rounded-3xl flex items-center justify-center">
                <Trophy className="w-10 h-10 text-blue-200" />
              </div>
              <p className="text-lg font-semibold text-neutral-200 mb-1">
                No sessions yet
              </p>
              <p className="text-sm text-neutral-500">
                Start your coding journey today!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;

