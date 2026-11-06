'use client';

import React, { useState, useRef, useEffect } from 'react';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import { TutorMode } from '@/lib/types/academic';
import {
  MessageSquareCode,
  Sparkles,
  Send,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function TutorPage() {
  const {
    tutorMessages,
    tutorMode,
    setTutorMode,
    sendTutorMessage,
    clearTutorHistory,
    selectedCourse,
    courses,
    selectedCourseId,
    setSelectedCourseId
  } = useAcademic();

  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const modes: { id: TutorMode; label: string; desc: string; icon: any }[] = [
    { id: 'teach', label: 'Teach me', desc: 'Clear conceptual explanations', icon: BookOpen },
    { id: 'hint', label: 'Give me a hint', desc: 'Nudges without spoiling', icon: Lightbulb },
    { id: 'example', label: 'Worked example', desc: 'Step-by-step problem walk', icon: Sparkles },
    { id: 'test', label: 'Test understanding', desc: 'Challenges with questions', icon: CheckCircle2 },
    { id: 'mistake', label: 'Explain my mistake', desc: 'Unpacks errors and traps', icon: AlertTriangle },
    { id: 'review', label: 'Review topic', desc: 'Summarizes key exam traps', icon: HelpCircle }
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;
    sendTutorMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handlePromptClick = (prompt: string) => {
    sendTutorMessage(prompt);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tutorMessages]);

  return (
    <WorkspaceShell>
      <div className="space-y-4">
        {/* Header with Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-200 pb-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <MessageSquareCode className="h-4 w-4 text-blue-700" />
              <span>Socratic Academic Tutor</span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-stone-300" />
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                {selectedCourse?.name} Grounded
              </span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Interactive Dialogue & Guided Problem-Solving
            </h1>
          </div>

          <button
            onClick={clearTutorHistory}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-stone-50 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Reset Dialogue</span>
          </button>
        </div>

        {/* 6 Learning Mode Toggle Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {modes.map((m) => {
            const Icon = m.icon;
            const isCurrent = tutorMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setTutorMode(m.id)}
                className={`flex items-center space-x-2 rounded-xl px-3 py-2 text-xs font-medium transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-slate-700 hover:bg-stone-50'
                }`}
                title={m.desc}
              >
                <Icon className={`h-3.5 w-3.5 ${isCurrent ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Stream Window */}
        <div className="academic-card p-4 sm:p-6 bg-white min-h-[480px] max-h-[620px] flex flex-col justify-between shadow-xs">
          {/* Scrollable Messages Area */}
          <div className="space-y-4 overflow-y-auto pr-2 pb-2">
            {tutorMessages.map((msg) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-stone-50 border border-stone-200 text-slate-800 shadow-2xs'
                        : 'bg-slate-900 text-white shadow-xs'
                    }`}
                  >
                    {/* Header for assistant message */}
                    {isAssistant && (
                      <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 mb-2 text-[11px] text-slate-500">
                        <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                          <Sparkles className="h-3.5 w-3.5 text-blue-700" />
                          <span>StudyPilot Socratic Tutor</span>
                          {msg.mode && (
                            <span className="capitalize font-normal text-slate-500">
                              • Mode: {msg.mode}
                            </span>
                          )}
                        </div>
                        <span>{msg.timestamp}</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="whitespace-pre-line font-sans space-y-1">
                      {msg.content}
                    </div>

                    {/* Source Citations Pill */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="font-semibold text-slate-700">Grounded Sources:</span>
                        {msg.citations.map((c, i) => (
                          <span
                            key={i}
                            className="bg-white border border-stone-200 text-slate-700 px-2 py-0.5 rounded font-mono shadow-2xs"
                          >
                            {c.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Suggested Next Prompts / Socratic Chips */}
                    {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-stone-200/80 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Suggested Responses:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedPrompts.map((prompt, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handlePromptClick(prompt)}
                              className="text-left bg-white border border-blue-200 text-blue-800 text-[11px] font-medium px-2.5 py-1 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-2xs"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Interactive Chat Input Box */}
          <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-stone-200">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about a concept, paste a homework problem, or explain your thinking..."
                className="w-full rounded-xl border border-stone-300 bg-stone-50/70 pl-4 pr-24 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="absolute right-2 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors disabled:opacity-40 flex items-center space-x-1"
              >
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>Socratic tutoring encourages reasoning rather than directly handing out homework solutions.</span>
              <span className="hidden sm:inline">Press Enter to send</span>
            </div>
          </form>
        </div>
      </div>
    </WorkspaceShell>
  );
}
