
import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div
      className="min-h-screen text-neutral-200"
      style={{
        background: `
          radial-gradient(circle at 35% 15%, rgba(70,110,255,0.08), transparent 60%),
          radial-gradient(circle at 85% 95%, rgba(0,140,255,0.06), transparent 55%),
          #05060A
        `,
      }}
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,120,255,0.15)]">
            Practice Problems
          </h1>

          <p className="text-neutral-400 mt-2">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-5">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block rounded-2xl bg-[#070C13] border border-[#1A2333] shadow-[0_0_25px_rgba(0,120,255,0.08)]
              hover:border-blue-400/40 hover:shadow-[0_0_35px_rgba(0,150,255,0.2)]
              transition-all hover:scale-[1.01]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="size-12 rounded-xl bg-[#0D1320] border border-[#223047] shadow-inner flex items-center justify-center">
                        <Code2Icon className="size-6 text-blue-200" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-lg font-bold text-white">{problem.title}</h2>
                          <span
                            className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-neutral-500 mt-0.5">
                          {problem.category}
                        </p>
                      </div>
                    </div>

                    <p className="text-neutral-400 leading-relaxed">
                      {problem.description.text}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-1.5 text-blue-200 font-medium">
                    <span>Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER STATS */}
        <div className="mt-14 rounded-2xl bg-[#070C13] border border-[#1A2333] shadow-[0_0_25px_rgba(0,120,255,0.08)] p-6">
          <div className="stats stats-vertical lg:stats-horizontal gap-6">

            <div className="stat">
              <div className="stat-title text-neutral-400">Total Problems</div>
              <div className="stat-value text-blue-200">{problems.length}</div>
            </div>

            <div className="stat">
              <div className="stat-title text-neutral-400">Easy</div>
              <div className="stat-value text-green-300">{easyProblemsCount}</div>
            </div>

            <div className="stat">
              <div className="stat-title text-neutral-400">Medium</div>
              <div className="stat-value text-yellow-300">{mediumProblemsCount}</div>
            </div>

            <div className="stat">
              <div className="stat-title text-neutral-400">Hard</div>
              <div className="stat-value text-red-300">{hardProblemsCount}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;

