
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const [editorSize, setEditorSize] = useState(65);
  const [outputSize, setOutputSize] = useState(35);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (!id || !PROBLEMS[id]) return;
    setCurrentProblemId(id);
    setCode(PROBLEMS[id].starterCode[selectedLanguage]);
    setOutput(null);

    setEditorSize(65);
    setOutputSize(35);
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(currentProblem.starterCode[lang]);
    setOutput(null);
  };

  const handleProblemChange = (newId) => navigate(`/problem/${newId}`);

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const normalizeOutput = (out) =>
    out
      .trim()
      .split("\n")
      .map((l) =>
        l
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((l) => l.length)
      .join("\n");

  const checkIfTestsPassed = (actual, expected) =>
    normalizeOutput(actual) === normalizeOutput(expected);

  const handleRunCode = async () => {
    setIsRunning(true);

    // Expand output panel
    setEditorSize(40);
    setOutputSize(60);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (!result.success) return toast.error("Code execution failed!");

    const expected = currentProblem.expectedOutput[selectedLanguage];
    const passed = checkIfTestsPassed(result.output, expected);

    passed ? (triggerConfetti(), toast.success("All tests passed!")) : toast.error("Test failed!");
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 35% 15%, rgba(60,90,255,0.08), transparent 60%),
          radial-gradient(circle at 85% 95%, rgba(0,140,255,0.06), transparent 60%),
          #05060A
        `,
      }}
    >
      <Navbar />

      {/* FULL HEIGHT PANEL LAYOUT */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">

          {/* LEFT: PROBLEM (scroll inside only this column) */}
          <Panel defaultSize={40} minSize={28}>
            <div className="h-full overflow-y-auto">
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-[#0A0F18] hover:bg-blue-400/40 cursor-col-resize border-l border-[#1A2333]" />

          {/* RIGHT: EDITOR + OUTPUT (scroll individually) */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">

              {/* EDITOR */}
              <Panel size={editorSize} minSize={25}>
                <div className="h-full overflow-hidden">
                  <CodeEditorPanel
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={setCode}
                    onRunCode={handleRunCode}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-[#0A0F18] hover:bg-blue-400/40 cursor-row-resize border-t border-[#1A2333]" />

              {/* OUTPUT */}
              <Panel size={outputSize} minSize={20}>
                <div className="h-full overflow-hidden">
                  <OutputPanel output={output} />
                </div>
              </Panel>

            </PanelGroup>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
