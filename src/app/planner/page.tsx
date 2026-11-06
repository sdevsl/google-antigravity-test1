'use client';

import React, { useState } from 'react';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import {
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  ChevronRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function PlannerPage() {
  const {
    studySessions,
    toggleSessionComplete,
    courses,
    selectedCourse
  } = useAcademic();

  const [availableDailyMinutes, setAvailableDailyMinutes] = useState<number>(60);
  const [confidenceLevel, setConfidenceLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);

  const handleRegeneratePlan = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 600);
  };

  const completedCount = studySessions.filter((s) => s.status === 'completed').length;

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <CalendarDays className="h-4 w-4 text-rose-700" />
              <span>Spaced Retrieval & Deadline Scheduler</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Personalized Academic Study Planner
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Balanced daily study sessions prioritizing approaching exam deadlines and detected learning gaps.
            </p>
          </div>

          <button
            onClick={handleRegeneratePlan}
            disabled={isRegenerating}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <RotateCcw className={`h-3.5 w-3.5 text-amber-300 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Optimizing Schedule...' : 'Rebalance Study Plan'}</span>
          </button>
        </div>

        {/* Configuration Controls Bar */}
        <div className="academic-card p-4 sm:p-5 bg-white space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Sliders className="h-4 w-4 text-blue-700" />
            <span>Planner Constraints & Preferences</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Study Time / Day ({availableDailyMinutes} min)
              </label>
              <input
                type="range"
                min="30"
                max="180"
                step="15"
                value={availableDailyMinutes}
                onChange={(e) => setAvailableDailyMinutes(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>30 min (Light)</span>
                <span>60 min (Standard)</span>
                <span>180 min (Exam Cram)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Self-Reported Confidence
              </label>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value as any)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 bg-white"
              >
                <option value="low">Needs Heavy Practice (Focus on Fundamentals)</option>
                <option value="medium">Moderate Confidence (Balanced Practice)</option>
                <option value="high">High Confidence (Diagnostic & Review Only)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Upcoming Assessment Focus
              </label>
              <div className="text-xs p-2 rounded-lg bg-stone-50 border border-stone-200 text-slate-700 font-medium">
                AP Bio Unit 3 Exam (Friday, Oct 30)
              </div>
            </div>
          </div>
        </div>

        {/* Spaced Retrieval Schedule List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Weekly Study Sessions ({completedCount} of {studySessions.length} Completed)
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Spaced over 4 days to maximize retention
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studySessions.map((session) => {
              const isDone = session.status === 'completed';
              return (
                <div
                  key={session.id}
                  className={`academic-card p-5 flex flex-col justify-between transition-all ${
                    isDone ? 'bg-stone-50/70 border-stone-200 opacity-80' : 'bg-white hover:border-slate-400'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: session.courseColor }}
                        />
                        <span className="text-xs font-bold text-slate-800">
                          {session.courseName}
                        </span>
                        {session.urgency === 'high' && (
                          <span className="bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            HIGH PRIORITY
                          </span>
                        )}
                      </div>

                      <div className="text-right text-xs text-slate-500">
                        <div className="font-semibold text-slate-800">{session.dayLabel}</div>
                        <div className="text-[10px]">{session.timeSlot}</div>
                      </div>
                    </div>

                    <h4 className={`font-serif text-base font-bold text-slate-900 mt-2.5 ${isDone ? 'line-through text-slate-400' : ''}`}>
                      {session.topicTitle}
                    </h4>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {session.goal}
                    </p>

                    {session.assessmentDateUpcoming && (
                      <div className="mt-2.5 inline-block text-[10px] font-medium text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                        Target: {session.assessmentDateUpcoming}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => toggleSessionComplete(session.id)}
                      className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'border border-stone-300 text-slate-700 hover:bg-stone-50'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isDone ? 'Completed' : 'Mark as Done'}</span>
                    </button>

                    <Link
                      href={session.activityType === 'socratic_tutor' ? '/tutor' : '/quizzes'}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                      <span>Start Session</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ethical Academic Disclaimer Banner */}
        <div className="p-4 rounded-xl border border-stone-200 bg-stone-100/70 text-xs text-slate-600 leading-relaxed">
          <strong>Academic Honesty Note:</strong> StudyPilot organizes your study time and practice questions to build genuine conceptual understanding. It does not promise specific exam grades or replace active classroom attendance and teacher instruction.
        </div>
      </div>
    </WorkspaceShell>
  );
}
