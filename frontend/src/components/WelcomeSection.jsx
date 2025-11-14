
import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none bg-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between flex-wrap gap-8">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0B1019] border border-[#1D2433] shadow-[0_0_15px_rgba(0,150,255,0.25)] flex items-center justify-center">
                <SparklesIcon className="w-7 h-7 text-blue-200" />
              </div>

              <h1 className="text-4xl sm:text-5xl font-black leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>

            <p className="text-lg text-neutral-400 ml-1">
              Ready to level up your coding skills?
            </p>
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={onCreateSession}
            className="group px-8 py-4 rounded-2xl bg-[#0D1320] border border-[#2A3650]
            text-blue-100 shadow-[0_0_20px_rgba(0,120,255,0.15)]
            hover:shadow-[0_0_30px_rgba(0,140,255,0.3)]
            hover:scale-[1.03] transition-all duration-500"
          >
            <div className="flex items-center gap-3 font-bold text-lg">
              <ZapIcon className="w-6 h-6 text-blue-300" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;

