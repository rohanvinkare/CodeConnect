
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session?")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden text-neutral-200"
      style={{
        background: `
          radial-gradient(circle at 35% 15%, rgba(60,90,255,0.08), transparent 60%),
          radial-gradient(circle at 85% 95%, rgba(0,140,255,0.06), transparent 60%),
          #05060A
        `,
      }}
    >
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">

          {/* LEFT PANEL — PROBLEM + EDITOR */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">

              {/* PROBLEM DESCRIPTION PANEL */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-[#070C13] border-r border-[#1A2333]">

                  {/* HEADER SECTION */}
                  <div className="p-6 bg-[#0A0F18] border-b border-[#1A2333] shadow-[0_0_15px_rgba(0,120,255,0.05)]">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-3xl font-black text-white">
                          {session?.problem || "Loading..."}
                        </h1>

                        {problemData?.category && (
                          <p className="text-neutral-400 mt-1">{problemData.category}</p>
                        )}

                        <p className="text-neutral-500 mt-2">
                          Host: {session?.host?.name || "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(
                            session?.difficulty
                          )}`}
                        >
                          {session?.difficulty
                            ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                            : "Easy"}
                        </span>

                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-error btn-sm gap-2"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}

                        {session?.status === "completed" && (
                          <span className="badge badge-ghost badge-lg">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* PROBLEM CONTENT */}
                  <div className="p-6 space-y-6">

                    {/* DESCRIPTION */}
                    {problemData?.description && (
                      <div className="bg-[#0A111A] border border-[#1E2838] rounded-xl shadow-inner p-5">
                        <h2 className="text-xl font-bold text-white mb-3">Description</h2>
                        <div className="space-y-3 text-neutral-300 leading-relaxed">
                          <p>{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx}>{note}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EXAMPLES */}
                    {problemData?.examples && problemData.examples.length > 0 && (
                      <div className="bg-[#0A111A] border border-[#1E2838] rounded-xl shadow-inner p-5">
                        <h2 className="text-xl font-bold text-white mb-4">Examples</h2>

                        <div className="space-y-5">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="badge badge-sm bg-blue-500/30">#{idx + 1}</span>
                                <p className="font-semibold text-neutral-200">Example {idx + 1}</p>
                              </div>

                              <div className="bg-[#0D1320] border border-[#223047] rounded-lg p-4 text-sm font-mono space-y-2">
                                <div className="flex gap-2">
                                  <span className="text-blue-300 font-bold min-w-[70px]">
                                    Input:
                                  </span>
                                  <span className="text-neutral-300">{example.input}</span>
                                </div>

                                <div className="flex gap-2">
                                  <span className="text-green-300 font-bold min-w-[70px]">
                                    Output:
                                  </span>
                                  <span className="text-neutral-200">{example.output}</span>
                                </div>

                                {example.explanation && (
                                  <div className="pt-2 border-t border-[#1F2A3B]">
                                    <span className="text-neutral-400 text-xs">
                                      <span className="font-semibold">Explanation:</span>{" "}
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CONSTRAINTS */}
                    {problemData?.constraints && (
                      <div className="bg-[#0A111A] border border-[#1E2838] rounded-xl shadow-inner p-5">
                        <h2 className="text-xl font-bold text-white mb-4">Constraints</h2>

                        <ul className="space-y-2 text-neutral-300">
                          {problemData.constraints.map((c, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-blue-300">•</span>
                              <code>{c}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-[#0A0F18] hover:bg-blue-400/40 cursor-row-resize border-t border-[#1A2333]" />

              {/* EDITOR + OUTPUT */}
              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">

                  {/* EDITOR */}
                  <Panel defaultSize={65} minSize={25}>
                    <div className="h-full overflow-hidden">
                      <CodeEditorPanel
                        selectedLanguage={selectedLanguage}
                        code={code}
                        isRunning={isRunning}
                        onLanguageChange={handleLanguageChange}
                        onCodeChange={(v) => setCode(v)}
                        onRunCode={handleRunCode}
                      />
                    </div>
                  </Panel>

                  <PanelResizeHandle className="h-2 bg-[#0A0F18] hover:bg-blue-400/40 cursor-row-resize border-t border-[#1A2333]" />

                  {/* OUTPUT */}
                  <Panel defaultSize={35} minSize={15}>
                    <div className="h-full overflow-hidden">
                      <OutputPanel output={output} />
                    </div>
                  </Panel>

                </PanelGroup>
              </Panel>

            </PanelGroup>
          </Panel>

          {/* RIGHT PANEL — VIDEO CALL */}
          <PanelResizeHandle className="w-2 bg-[#0A0F18] hover:bg-blue-400/40 cursor-col-resize border-l border-[#1A2333]" />

          <Panel defaultSize={50} minSize={25}>
            <div className="h-full bg-[#070C13] p-4 overflow-auto border-l border-[#1A2333]">

              {/* LOADING VIDEO CALL */}
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-blue-300 mb-4" />
                    <p className="text-lg text-neutral-400">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-[#0A111A] border border-[#1F283A] shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-red-400" />
                      </div>
                      <h2 className="card-title text-2xl text-white">Connection Failed</h2>
                      <p className="text-neutral-400">
                        Unable to connect to the video call
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;
