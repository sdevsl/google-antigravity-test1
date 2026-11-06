'use client';

import React, { useState } from 'react';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import { QuizQuestion, QuizAttempt } from '@/lib/types/academic';
import {
  CheckSquare,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Award,
  ChevronRight,
  Plus,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

export default function QuizzesPage() {
  const {
    quizzes,
    selectedCourse,
    submitQuizAttempt,
    quizAttempts
  } = useAcademic();

  const activeQuiz = quizzes[0];

  // Quiz Taking Mode State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [activeAttempt, setActiveAttempt] = useState<QuizAttempt | null>(quizAttempts[0] || null);
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentQ: QuizQuestion | undefined = activeQuiz?.questions[currentQuestionIndex];

  const handleSelectOption = (opt: string) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleTextInput = (val: string) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const handleStartQuiz = () => {
    setUserAnswers({});
    setShowHint({});
    setCurrentQuestionIndex(0);
    setActiveAttempt(null);
    setIsTakingQuiz(true);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const formattedAnswers = activeQuiz.questions.map((q) => ({
        questionId: q.id,
        answer: userAnswers[q.id] || ''
      }));
      const attempt = submitQuizAttempt(activeQuiz.id, formattedAnswers);
      setActiveAttempt(attempt);
      setIsTakingQuiz(false);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <CheckSquare className="h-4 w-4 text-amber-700" />
              <span>Practice Diagnostic & Rubric Engine</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Active Recall Quizzes & Topic Diagnostics
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Targeted multiple-choice, short-answer, and application questions evaluated against official teacher rubrics.
            </p>
          </div>

          {!isTakingQuiz && (
            <button
              onClick={handleStartQuiz}
              className="inline-flex items-center space-x-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Start New Diagnostic Quiz</span>
            </button>
          )}
        </div>

        {/* 1. QUIZ TAKING INTERFACE */}
        {isTakingQuiz && currentQ && (
          <div className="academic-card p-6 sm:p-8 bg-white max-w-3xl mx-auto space-y-6 shadow-card">
            {/* Top progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-stone-200 pb-3">
              <span className="font-semibold text-slate-800">
                Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
              </span>
              <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                {currentQ.topicTitle}
              </span>
            </div>

            {/* Visual progress bar */}
            <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%`
                }}
              />
            </div>

            {/* Question Prompt */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                {currentQ.type.replace('_', ' ')}
              </span>
              <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-relaxed pt-1">
                {currentQ.prompt}
              </h2>
            </div>

            {/* Answer Options / Input based on question type */}
            <div className="space-y-3 pt-2">
              {currentQ.type === 'multiple_choice' && currentQ.options && (
                <div className="space-y-2">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQ.id] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start space-x-3 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600'
                            : 'border-stone-200 bg-white hover:bg-stone-50 text-slate-800'
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-stone-300 text-slate-500'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{option}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {(currentQ.type === 'short_answer' || currentQ.type === 'fill_in_blank') && (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={userAnswers[currentQ.id] || ''}
                    onChange={(e) => handleTextInput(e.target.value)}
                    placeholder="Type your explanation or term here (graded by substantive accuracy)..."
                    className="w-full rounded-xl border border-stone-300 p-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans"
                  />
                  <div className="text-[11px] text-slate-500">
                    The rubric checks your conceptual reasoning, not exact wording.
                  </div>
                </div>
              )}
            </div>

            {/* Socratic Hint Accordion */}
            {currentQ.hints && currentQ.hints.length > 0 && (
              <div className="pt-2">
                {!showHint[currentQ.id] ? (
                  <button
                    onClick={() => setShowHint((prev) => ({ ...prev, [currentQ.id]: true }))}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>Need a hint? (Won't affect score)</span>
                  </button>
                ) : (
                  <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-3.5 text-xs text-amber-900 space-y-1">
                    <div className="font-bold flex items-center space-x-1">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                      <span>Socratic Hint:</span>
                    </div>
                    {currentQ.hints.map((h, i) => (
                      <p key={i} className="text-amber-800 leading-relaxed">
                        • {h}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className="rounded-lg border border-stone-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50 disabled:opacity-40"
              >
                Previous Question
              </button>

              {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors flex items-center space-x-1"
                >
                  <span>Next Question</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="rounded-lg bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <span>{isSubmitting ? 'Evaluating Rubric...' : 'Submit Diagnostic'}</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 2. QUIZ RESULTS & RUBRIC ANALYSIS INTERFACE */}
        {!isTakingQuiz && activeAttempt && (
          <div className="space-y-6">
            {/* Scorecard Banner */}
            <div className="academic-card p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                  Diagnostic Performance Analysis
                </span>
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  {activeQuiz.title}
                </h2>
                <p className="text-xs text-slate-500">
                  Completed {activeAttempt.completedAt} • Graded via Subject-Specific Rubric
                </p>
              </div>

              <div className="flex items-center space-x-6 shrink-0">
                <div className="text-center">
                  <div className="font-serif text-4xl font-bold text-slate-900">
                    {activeAttempt.scorePercentage}%
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                    Mastery Score
                  </div>
                </div>

                <button
                  onClick={handleStartQuiz}
                  className="rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 transition-colors shadow-2xs"
                >
                  Retake Diagnostic
                </button>
              </div>
            </div>

            {/* Rubric Evaluated Questions Review */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Detailed Question Rubric & Feedback ({activeAttempt.answers.length} Questions)
              </h3>

              {activeAttempt.answers.map((ans, idx) => {
                const questionObj = activeQuiz.questions.find((q) => q.id === ans.questionId);
                if (!questionObj) return null;

                return (
                  <div
                    key={idx}
                    className={`academic-card p-5 space-y-3 ${
                      ans.isCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            ans.isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          {questionObj.topicTitle}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          ans.isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {ans.isCorrect ? `Correct (+${ans.earnedScore} pts)` : 'Incorrect (0 pts)'}
                      </span>
                    </div>

                    <div className="font-serif text-sm font-bold text-slate-900">
                      {questionObj.prompt}
                    </div>

                    <div className="text-xs space-y-1 bg-stone-50 p-3 rounded-lg border border-stone-200">
                      <div>
                        <span className="font-semibold text-slate-700">Your Answer: </span>
                        <span className={ans.isCorrect ? 'text-emerald-800 font-medium' : 'text-rose-800 font-medium'}>
                          {ans.submittedAnswer || '(No answer provided)'}
                        </span>
                      </div>
                      {!ans.isCorrect && (
                        <div>
                          <span className="font-semibold text-slate-700">Expected Correct Concept: </span>
                          <span className="text-slate-900 font-medium">{questionObj.correctAnswer}</span>
                        </div>
                      )}
                    </div>

                    {/* Teacher Rubric Explanation & Citations */}
                    <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 text-xs space-y-1">
                      <div className="font-bold text-blue-900 flex items-center space-x-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-700" />
                        <span>Rubric Reasoning & Feedback:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{ans.feedback}</p>
                      <div className="pt-1 text-[10px] text-blue-800 font-mono font-medium">
                        Grounding Source: {questionObj.sourceCitation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Targeted Follow-up Action Banner */}
            <div className="rounded-xl border border-stone-200 bg-stone-100/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-sm font-bold text-slate-900">
                  Want to master missed concepts before your exam?
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Launch the interactive tutor in "Explain My Mistake" mode to resolve remaining confusion.
                </p>
              </div>
              <Link
                href="/tutor"
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shrink-0 shadow-2xs"
              >
                Explain My Mistakes with Tutor
              </Link>
            </div>
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
