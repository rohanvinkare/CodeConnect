

import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-blue-300 mb-4" />
          <p className="text-lg text-neutral-300">Joining call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-3 relative str-video bg-[#04060A] text-neutral-200">

      <div className="flex-1 flex flex-col gap-3">

        {/* ─── PARTICIPANT HEADER (NeonMatrix) ───────────────────────────── */}
        <div
          className="
            flex items-center justify-between gap-2
            bg-[#0A0F18]/80 backdrop-blur-xl
            border border-[#1A2233]
            rounded-xl px-4 py-3
            shadow-[0_0_25px_rgba(0,150,255,0.06)]
          "
        >
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-blue-300 drop-shadow-[0_0_6px_rgba(0,120,255,0.4)]" />
            <span className="font-semibold text-neutral-300">
              {participantCount} {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>

          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm
                transition-all duration-300
                ${
                  isChatOpen
                    ? "bg-blue-600/20 border-blue-500 text-blue-300"
                    : "bg-[#0F151E] border-[#1F2A39] text-neutral-400 hover:text-blue-300 hover:border-blue-500/40"
                }
              `}
            >
              <MessageSquareIcon className="size-4" />
              Chat
            </button>
          )}
        </div>

        {/* ─── VIDEO PANEL (SAME, but NeonMatrix container) ───────────────── */}
        <div
          className="
            flex-1 rounded-xl overflow-hidden relative
            bg-[#0A0F18] border border-[#1A2233]
            shadow-[0_0_35px_rgba(0,0,0,0.4)]
          "
        >
          <SpeakerLayout />
        </div>

        {/* ─── CALL CONTROLS (UNCHANGED AS REQUESTED) ────────────────────── */}
        <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">
          <CallControls onLeave={() => navigate('/dashboard')} />
        </div>
      </div>

      {/* ─── CHAT SECTION (NeonMatrix styled) ─────────────────────────────── */}
      {chatClient && channel && (
        <div
          className={`
            flex flex-col rounded-xl overflow-hidden
            transition-all duration-300 ease-in-out
            border border-[#1A2233]
            shadow-[0_0_30px_rgba(0,120,255,0.1)]
            bg-[#0A0F18]
            ${isChatOpen ? "w-80 opacity-100" : "w-0 opacity-0"}
          `}
        >
          {isChatOpen && (
            <>
              {/* Chat header */}
              <div className="bg-[#0F151E] p-3 border-b border-[#1F2A39] flex items-center justify-between">
                <h3 className="font-semibold text-neutral-200">Session Chat</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              {/* Chat UI */}
              <div className="flex-1 overflow-hidden stream-chat-dark">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoCallUI;
