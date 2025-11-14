

function OutputPanel({ output }) {
  return (
    <div className="h-full bg-[#070C13] border-t border-[#1A2333] flex flex-col rounded-t-xl transition-all">

      <div className="px-4 py-2 bg-[#0A0F18] border-b border-[#1A2333] text-neutral-300 font-semibold text-sm">
        Output
      </div>

      <div className="flex-1 overflow-auto p-4 text-neutral-200">
        {output === null ? (
          <p className="text-neutral-500 text-sm">Click "Run Code" to see output…</p>
        ) : output.success ? (
          <pre className="text-sm font-mono text-green-300 whitespace-pre-wrap">{output.output}</pre>
        ) : (
          <>
            {output.output && (
              <pre className="text-sm font-mono text-neutral-300 whitespace-pre-wrap mb-2">{output.output}</pre>
            )}
            <pre className="text-sm font-mono text-red-400 whitespace-pre-wrap">{output.error}</pre>
          </>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
