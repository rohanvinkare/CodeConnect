
import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div
      className="min-h-screen text-neutral-200"
      style={{
        background: `
          radial-gradient(circle at 40% 18%, rgba(70,110,255,0.10), transparent 55%),
          radial-gradient(circle at 85% 88%, rgba(0,140,255,0.08), transparent 50%),
          #000000
        `,
      }}
    >

      {/* NAVBAR */}
      <nav className="bg-[#0a0d14]/80 backdrop-blur-xl border-b border-[#1a1f29] sticky top-0 z-50 shadow-[0_4px_25px_rgba(0,0,0,0.45)]">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-[1.06] transition-transform duration-500"
          >
            <div className="size-10 rounded-xl bg-[linear-gradient(145deg,#0e121a,#090c12)] border border-[#1d2230] shadow-[0_0_15px_rgba(90,120,255,0.25)] flex items-center justify-center">
              <SparklesIcon className="size-6 text-blue-200 drop-shadow-[0_0_6px_rgba(0,150,255,0.4)]" />
            </div>

            <div>
              <span className="font-black text-xl tracking-wide bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                CodeConnect
              </span>
              <span className="text-xs text-neutral-500 -mt-1 block">Code Together</span>
            </div>
          </Link>

          {/* AUTH BUTTON */}
          <SignInButton mode="modal">
            <button
              className="group px-6 py-3 rounded-xl text-white font-semibold text-sm 
              bg-[#0e121a] border border-[#1f2433]
              shadow-[0_0_20px_rgba(0,0,0,0.5)]
              hover:shadow-[0_0_35px_rgba(30,130,255,0.3)]
              transition-all duration-500 hover:scale-[1.07] flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform duration-500" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-10">

            <div className="px-6 py-2 rounded-full bg-[#0a0f18] border border-[#1b2230] text-blue-100 shadow-[0_0_8px_rgba(0,150,255,0.15)] w-fit flex items-center gap-2">
              <ZapIcon className="size-4 text-blue-300" />
              Real-time Collaboration
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                Code Together,
              </span>
              <br />
              <span className="text-blue-200 drop-shadow-[0_3px_12px_rgba(0,120,255,0.35)]">
                Learn Faster
              </span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
              Build, collaborate, and master interviews in an ultra-polished, high-performance environment designed for serious developers.
            </p>

            {/* FEATURE TAGS */}
            <div className="flex flex-wrap gap-4">
              {["HD Video Chat", "Code Editor", "Multi-Language"].map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 rounded-full bg-[#08101a] border border-[#1b232f] text-blue-100 shadow-[inset_0_0_10px_rgba(0,120,255,0.10)] flex items-center gap-2"
                >
                  <CheckIcon className="size-4 text-blue-300" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-5">
              <SignInButton mode="modal">
                <button
                  className="btn btn-lg text-white border-none
                  bg-[linear-gradient(145deg,#0f131d,#080b12)]
                  border border-[#1e2533]
                  shadow-[0_0_25px_rgba(0,0,0,0.6)]
                  hover:shadow-[0_0_40px_rgba(0,150,255,0.3)]
                  hover:scale-[1.05]
                  transition-all duration-500"
                >
                  Start Coding Now <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg border-[#29313f] text-blue-200 hover:bg-[#0b1018] hover:border-blue-400 transition-all duration-500">
                <VideoIcon className="size-5" /> Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div
              className="stats stats-vertical lg:stats-horizontal 
              bg-[#060a11] border border-[#1a2433]
              shadow-[0_0_35px_rgba(0,0,0,0.55)] rounded-2xl"
            >
              {[
                { value: "10K+", label: "Problems" },
                { value: "50K+", label: "Sessions" },
                { value: "99.9%", label: "Uptime" },
              ].map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-value text-blue-200">{s.value}</div>
                  <div className="stat-title text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src="/hero2.png"
            alt="CodeCollab Platform"
            className="w-full h-auto rounded-3xl border border-[#1a2230] shadow-[0_0_55px_rgba(0,150,255,0.12)] hover:scale-[1.03] transition-transform duration-700"
          />
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
            Everything You Need to <span className="text-blue-200">Succeed</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Built for elite performance. Designed to impress.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: VideoIcon,
              title: "HD Video Call",
              text: "Ultra-clear and stable video for interviews.",
            },
            {
              icon: Code2Icon,
              title: "Live Code Editor",
              text: "Fast, synced, and designed for professionals.",
            },
            {
              icon: UsersIcon,
              title: "Easy Collaboration",
              text: "Work together smoothly with precision tools.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="card bg-[#070c13] border border-[#1a2333] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl"
            >
              <div className="card-body items-center text-center py-12">
                <div className="size-16 bg-[#0a111d] border border-[#233045] rounded-2xl flex items-center justify-center mb-5 shadow-[inset_0_0_20px_rgba(0,120,255,0.15)]">
                  <card.icon className="size-8 text-blue-200" />
                </div>
                <h3 className="card-title text-white">{card.title}</h3>
                <p className="text-neutral-400 mt-2">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
