
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  // inject monaco theme
  const handleEditorMount = (editor, monaco) => {
    monaco.editor.defineTheme("neonmatrix-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", foreground: "C8D1FF", background: "070C13" },
      ],
      colors: {
        "editor.background": "#070C13",
        "editor.lineHighlightBackground": "#0D1320",
        "editorGutter.background": "#050A12",
        "editorLineNumber.foreground": "#3A4A6A",
        "editorCursor.foreground": "#64A9FF",
      },
    });

    monaco.editor.setTheme("neonmatrix-dark");
  };

  return (
    <div className="h-full bg-[#070C13] border-b border-[#1A2333] flex flex-col rounded-b-xl">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A0F18] border-b border-[#1A2333]">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select
            className="select select-sm bg-[#0D1320] border border-[#233047] text-neutral-200"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>{lang.name}</option>
            ))}
          </select>
        </div>

        <button
          disabled={isRunning}
          onClick={onRunCode}
          className="btn btn-sm bg-[#0D1320] border border-blue-500/40 text-blue-200 hover:shadow-[0_0_15px_rgba(0,140,255,0.3)]"
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height="100%"
          className="bg-black"
          value={code}
          onChange={onCodeChange}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          onMount={handleEditorMount}
          theme="neonmatrix-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;
