import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 card bg-[#070C13] border border-[#1A2333] rounded-2xl shadow-[0_0_30px_rgba(0,120,255,0.1)]">
      <div className="card-body">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0D1320] border border-[#223047] rounded-xl shadow-inner">
              <ZapIcon className="size-5 text-blue-200" />
            </div>
            <h2 className="text-2xl font-black text-white">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm text-blue-300">{sessions.length} active</span>
          </div>
        </div>

        {/* BODY */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-blue-300" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="card bg-[#0A111A] border border-[#1E2838] rounded-2xl hover:border-blue-400/40 transition-all"
              >
                <div className="flex items-center justify-between gap-4 p-5">
                  
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-14 rounded-xl bg-[#0D1320] border border-[#233047] flex items-center justify-center shadow-[0_0_10px_rgba(0,120,255,0.2)]">
                      <Code2Icon className="size-7 text-blue-200" />
                      <div className="absolute -top-1 -right-1 size-4 bg-blue-400 rounded-full border-2 border-[#060A12] animate-pulse" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-white truncate">
                          {session.problem}
                        </h3>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty.charAt(0).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-4" />
                          <span>{session.host?.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4" />
                          <span>{session.participant ? "2/2" : "1/2"}</span>
                        </div>

                        {session.participant && !isUserInSession(session) ? (
                          <span className="badge badge-error badge-sm">FULL</span>
                        ) : (
                          <span className="badge badge-success badge-sm">OPEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BUTTON */}
                  {session.participant && !isUserInSession(session) ? (
                    <button className="btn btn-disabled btn-sm">Full</button>
                  ) : (
                    <Link
                      to={`/session/${session._id}`}
                      className="btn btn-sm bg-[#0D1320] border border-blue-500/40 text-blue-200 hover:shadow-[0_0_15px_rgba(0,140,255,0.3)]"
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#0D1320] border border-[#2A3650] rounded-3xl flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-blue-300" />
              </div>
              <p className="text-lg text-neutral-300 font-semibold mb-1">
                No active sessions
              </p>
              <p className="text-sm text-neutral-500">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;

