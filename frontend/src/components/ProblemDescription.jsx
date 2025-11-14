

import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  return (
    <div className="h-full overflow-y-auto bg-[#070C13] border-r border-[#1A2333]">

      {/* HEADER */}
      <div className="p-6 bg-[#0A0F18] border-b border-[#1A2333] shadow-[0_0_15px_rgba(0,120,255,0.05)]">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-black text-white">{problem.title}</h1>
          <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>

        <p className="text-neutral-400">{problem.category}</p>

        {/* SELECTOR */}
        <div className="mt-4">
          <select
            className="select select-sm w-full bg-[#0D1320] border border-[#233047] text-neutral-200
            focus:border-blue-400 focus:outline-none"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id}>{p.title} - {p.difficulty}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* DESCRIPTION */}
        <div className="bg-[#0A111A] border border-[#1E2838] rounded-xl shadow-inner p-5">
          <h2 className="text-xl font-bold text-white mb-3">Description</h2>

          <div className="space-y-3 text-neutral-300 leading-relaxed">
            <p>{problem.description.text}</p>
            {problem.description.notes.map((note, idx) => (
              <p key={idx}>{note}</p>
            ))}
          </div>
        </div>

        {/* EXAMPLES */}
        <div className="bg-[#0A111A] border border-[#1E2838] rounded-xl shadow-inner p-5">
          <h2 className="text-xl font-bold text-white mb-4">Examples</h2>

          <div className="space-y-5">
            {problem.examples.map((example, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="badge badge-sm bg-blue-500/30">#{idx + 1}</span>
                  <p className="font-semibold text-neutral-200">Example {idx + 1}</p>
                </div>

                <div className="bg-[#0D1320] border border-[#223047] rounded-lg p-4 text-sm font-mono space-y-2">
                  <div className="flex gap-2">
                    <span className="text-blue-300 font-bold min-w-[70px]">Input:</span>
                    <span className="text-neutral-300">{example.input}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-green-300 font-bold min-w-[70px]">Output:</span>
                    <span className="text-neutral-200">{example.output}</span>
                  </div>

                  {example.explanation && (
                    <div className="pt-2 border-t border-[#1F2A3B]">
                      <span className="text-neutral-400 text-xs">
                        <span className="font-semibold">Explanation:</span> {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div className="bg-[#0A111A] border border-[#1E2838] rounded-xl shadow-inner p-5">
          <h2 className="text-xl font-bold mb-4 text-white">Constraints</h2>
          <ul className="space-y-2 text-neutral-300">
            {problem.constraints.map((c, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-blue-300">•</span>
                <code>{c}</code>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default ProblemDescription;
