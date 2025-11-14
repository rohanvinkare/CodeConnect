
import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      {/* BACKDROP */}
      <div
        className="modal-backdrop cursor-pointer"
        onClick={onClose}
        style={{
          background: "rgba(0,0,20,0.75)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* MODAL BOX */}
      <div className="modal-box max-w-2xl bg-[#070C13] border border-[#1A2333] rounded-2xl shadow-[0_0_35px_rgba(0,120,255,0.15)]">

        <h3 className="font-bold text-2xl mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Create New Session
        </h3>

        <div className="space-y-8">

          {/* PROBLEM SELECTION */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-neutral-200">
                Select Problem
              </span>
              <span className="label-text-alt text-red-400">*</span>
            </label>

            <select
              className="select w-full bg-[#0A111A] border border-[#1E2838] text-white focus:border-blue-400 focus:outline-none"
              value={roomConfig.problem}
              onChange={(e) => {
                const selected = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selected.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert bg-[#0D1320] border border-blue-500/30 text-blue-200 shadow-[0_0_20px_rgba(0,120,255,0.1)]">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium text-white">
                    {roomConfig.problem}
                  </span>
                </p>
                <p>
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="modal-action">
          <button
            className="px-4 py-2 rounded-lg bg-[#0A111A] border border-[#1E2838] text-neutral-300 hover:bg-[#0F1724] transition-all"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-5 py-2.5 rounded-lg bg-[#0D1320] border border-blue-500/40 text-blue-200 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,140,255,0.3)] transition-all"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;
