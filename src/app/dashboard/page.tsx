'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  MessageSquareCode,
  CheckSquare,
  Search,
  ExternalLink,
  ChevronRight,
  Play
} from 'lucide-react';

export default function DashboardPage() {
  const {
    courses,
    selectedCourse,
    setSelectedCourseId,
    assignments,
    studySessions,
    quizAttempts,
    toggleSessionComplete,
    quizzes
  } = useAcademic();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchAnswer, setSearchAnswer] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const query = searchQuery.toLowerCase();
      if (query.includes('biology') || query.includes('bio') || query.includes('next test')) {
        setSearchAnswer(
          `**Based on Dr. Thorne's AP Bio slides and your recent 75% quiz score:**\n\nYour next exam is **Friday, Oct 30 on Unit 3 (Cellular Energetics)**. Your highest-priority learning gap is **chloroplast vs mitochondrial proton gradient orientation** (Slide 16 and Lab Handout). You should also review the DNP uncoupler calculation in your study guide.`
        );
      } else if (query.includes('assignment') || query.includes('due') || query.includes('homework')) {
        setSearchAnswer(
          `**You have 2 imminent assignments:**\n1. *Lab Report: Mitochondrial Respiration Rate with DPIP Dye* (Due Tomorrow, Oct 26 at 11:59 PM)\n2. *Problem Set 7.4: Quadratic Projectiles* (Due Wednesday, Oct 28 at 3:00 PM).`
        );
      } else {
        setSearchAnswer(
          `**Synthesized across your 3 courses:** For ${selectedCourse?.name}, you have strong mastery on foundational concepts, but 2 assignments need review before Friday. Click into the **Interactive Tutor** to drill these specific topics.`
        );
      }
    }, 500);
  };

  const latestQuizAttempt = quizAttempts[0];

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Welcome Header & Conversational Search */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Grounded Academic Intelligence</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Good afternoon, Alex
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                You have <span className="font-semibold text-rose-700">1 assignment due tomorrow</span> and an upcoming AP Biology Unit Exam on Friday.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/tutor"
                className="inline-flex items-center space-x-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
              >
                <MessageSquareCode className="h-4 w-4 text-amber-400" />
                <span>Open Socratic Tutor</span>
              </Link>
              <Link
                href="/study-guides"
                className="inline-flex items-center space-x-1.5 rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-100 transition-colors"
              >
                <FileText className="h-4 w-4 text-slate-600" />
                <span>View Study Guide</span>
              </Link>
            </div>
          </div>

          {/* Natural Language Academic Assistant Box */}
          <form onSubmit={handleAskQuestion} className="mt-5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything about your classes (e.g. 'What should I study for my next biology test?')"
                className="w-full rounded-xl border border-stone-300 bg-stone-50/70 pl-10 pr-24 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                {isSearching ? 'Thinking...' : 'Ask Copilot'}
              </button>
            </div>

            {searchAnswer && (
              <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-xs">
                <div className="flex items-center space-x-2 text-blue-900 font-semibold mb-1 text-xs">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Answer grounded in your course materials & recent quiz performance:</span>
                </div>
                <div className="whitespace-pre-line text-slate-700">{searchAnswer}</div>
                <button
                  type="button"
                  onClick={() => setSearchAnswer(null)}
                  className="mt-2 text-[11px] text-blue-700 underline font-medium"
                >
                  Dismiss
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 3 Active Courses Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-lg font-bold text-slate-900">Connected Courses</h2>
            <Link href="/courses" className="text-xs font-semibold text-blue-700 hover:underline flex items-center">
              <span>Manage Courses</span>
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => {
              const isSelected = course.id === selectedCourse?.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`academic-card p-4 cursor-pointer relative overflow-hidden transition-all ${
                    isSelected ? 'ring-2 ring-blue-600 border-transparent shadow-card' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                        {course.code} • {course.period}
                      </span>
                      <h3 className="font-serif text-base font-bold text-slate-900 mt-0.5 truncate">
                        {course.name}
                      </h3>
                      <p className="text-xs text-slate-500">{course.teacherName}</p>
                    </div>
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: course.color }}
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500">Mastery: </span>
                      <span className="font-bold text-slate-900">{course.masteryPercentage}%</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {course.assignmentCount} Assignments • {course.materialCount} Docs
                    </div>
                  </div>

                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${course.masteryPercentage}%`,
                        backgroundColor: course.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Academic Grid: Assignments & Upcoming Deadlines vs Recent Quiz Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Upcoming Assignments & Deadlines */}
          <div className="lg:col-span-7 space-y-4">
            <div className="academic-card p-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-700" />
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    Upcoming Assignments & Assessments
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Google Classroom Synced</span>
              </div>

              <div className="mt-3 space-y-3">
                {assignments.map((asg) => {
                  const course = courses.find((c) => c.id === asg.courseId);
                  const isUrgent = asg.status === 'due_today';

                  return (
                    <div
                      key={asg.id}
                      className={`p-3.5 rounded-xl border text-xs transition-colors ${
                        isUrgent
                          ? 'border-rose-300 bg-rose-50/50'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className="inline-block h-2 w-2 rounded-full"
                              style={{ backgroundColor: course?.color || '#059669' }}
                            />
                            <span className="font-semibold text-slate-800 text-[11px]">
                              {course?.name}
                            </span>
                            {isUrgent && (
                              <span className="bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                                DUE TODAY
                              </span>
                            )}
                          </div>
                          <div className="font-serif text-sm font-bold text-slate-900">
                            {asg.title}
                          </div>
                          <p className="text-slate-600 line-clamp-1 text-xs">
                            {asg.instructions}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className={`font-semibold ${isUrgent ? 'text-rose-700 font-bold' : 'text-slate-700'}`}>
                            {asg.dueDate}
                          </div>
                          <div className="text-[10px] text-slate-500">{asg.dueTime}</div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{asg.pointsTotal} Points • {asg.attachmentCount} Attachments</span>
                        <Link
                          href="/tutor"
                          className="inline-flex items-center space-x-1 font-semibold text-blue-700 hover:text-blue-900"
                        >
                          <MessageSquareCode className="h-3.5 w-3.5" />
                          <span>Review with Tutor</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Today's Scheduled Study Plan */}
            <div className="academic-card p-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-emerald-700" />
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    Today’s Spaced Retrieval Plan
                  </h3>
                </div>
                <Link href="/planner" className="text-xs font-semibold text-blue-700 hover:underline">
                  Full Schedule
                </Link>
              </div>

              <div className="mt-3 space-y-2.5">
                {studySessions.slice(0, 2).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-white text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleSessionComplete(session.id)}
                        className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${
                          session.status === 'completed'
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-300 hover:border-emerald-600'
                        }`}
                        title="Mark Complete"
                      >
                        {session.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                      </button>
                      <div>
                        <div className={`font-semibold text-slate-900 ${session.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                          {session.topicTitle}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {session.courseName} • {session.durationMinutes} min • {session.timeSlot}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={session.activityType === 'socratic_tutor' ? '/tutor' : '/quizzes'}
                      className="inline-flex items-center space-x-1 rounded bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-stone-200"
                    >
                      <Play className="h-3 w-3 text-slate-800" />
                      <span>Start</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Topic Mastery & Diagnostic Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            {/* Recent Diagnostic Card */}
            <div className="academic-card p-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="h-4 w-4 text-amber-700" />
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    Latest Diagnostic Results
                  </h3>
                </div>
                <Link href="/quizzes" className="text-xs font-semibold text-blue-700 hover:underline">
                  Take Practice Quiz
                </Link>
              </div>

              {latestQuizAttempt && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <div>
                      <div className="text-xs text-slate-500">AP Biology Unit 3 Diagnostic</div>
                      <div className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                        {latestQuizAttempt.scorePercentage}%
                      </div>
                      <div className="text-[11px] text-slate-500">Completed {latestQuizAttempt.completedAt}</div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
                        Needs Work
                      </span>
                    </div>
                  </div>

                  {/* Flagged Learning Gap Alert */}
                  <div className="p-3 rounded-lg border border-amber-300 bg-amber-50/70 text-xs">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-900">Learning Gap Detected:</span>
                        <p className="text-amber-800 mt-0.5 text-[11px] leading-relaxed">
                          Missed question on <strong>Thylakoid Lumen pH vs Mitochondrial Matrix</strong>. The AI tutor has loaded Dr. Thorne's quote from your notes to help resolve this.
                        </p>
                        <Link
                          href="/tutor"
                          className="mt-2 inline-flex items-center space-x-1 text-[11px] font-bold text-blue-700 hover:underline"
                        >
                          <span>Review with Socratic Tutor</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Topic breakdown list */}
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="font-semibold text-slate-700">Topic-by-Topic Breakdown:</div>
                    {latestQuizAttempt.topicBreakdown.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded border border-stone-100 bg-white">
                        <div className="flex justify-between font-medium text-slate-800">
                          <span className="truncate pr-2">{item.topicTitle}</span>
                          <span className="font-bold text-slate-900">{item.score}/{item.total} pts</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">{item.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Material Library Ingest Widget */}
            <div className="academic-card p-5 bg-gradient-to-br from-stone-50 to-white">
              <div className="flex items-center space-x-2 pb-2">
                <BookOpen className="h-4 w-4 text-emerald-700" />
                <h4 className="font-serif text-sm font-bold text-slate-900">
                  Import New Handout or Notes
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add a PDF, worksheet, or phone photo of your notes to ground the AI in your latest class lecture.
              </p>
              <Link
                href="/library"
                className="mt-3 w-full block text-center rounded-lg bg-emerald-700 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors shadow-2xs"
              >
                Upload Document / Photo (OCR)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
