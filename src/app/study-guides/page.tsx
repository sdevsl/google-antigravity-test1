'use client';

import React, { useState } from 'react';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import {
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Calendar,
  Share2,
  Printer,
  ChevronRight,
  Plus,
  HelpCircle,
  Hash
} from 'lucide-react';

export default function StudyGuidesPage() {
  const {
    studyGuides,
    generateStudyGuide,
    courses,
    selectedCourseId,
    setSelectedCourseId,
    selectedCourse
  } = useAcademic();

  const [activeGuideId, setActiveGuideId] = useState<string>(studyGuides[0]?.id || '');
  const [showGenModal, setShowGenModal] = useState(false);

  // Generator form state
  const [genTitle, setGenTitle] = useState('');
  const [genDifficulty, setGenDifficulty] = useState('exam_prep');
  const [genFormat, setGenFormat] = useState('deep_dive');
  const [genAssessmentDate, setGenAssessmentDate] = useState('Friday, Oct 30');
  const [isGenerating, setIsGenerating] = useState(false);

  const activeGuide = studyGuides.find((g) => g.id === activeGuideId) || studyGuides[0];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const created = generateStudyGuide({
        courseId: selectedCourseId,
        title: genTitle || `Mastery Guide: ${selectedCourse?.name}`,
        difficulty: genDifficulty,
        format: genFormat,
        assessmentDate: genAssessmentDate
      });
      setIsGenerating(false);
      setShowGenModal(false);
      setActiveGuideId(created.id);
      setGenTitle('');
    }, 800);
  };

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Header with Generator Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <FileText className="h-4 w-4 text-blue-700" />
              <span>Source-Grounded Study Studio</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              AI Study Guide Generator & Reader
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Comprehensive exam study guides citing specific teacher slides, lab handouts, and textbook formulas.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50 transition-colors shadow-2xs"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={() => setShowGenModal(true)}
              className="inline-flex items-center space-x-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Generate New Guide</span>
            </button>
          </div>
        </div>

        {/* 2-Column: Left Guides List; Right Guide Reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Guides Library */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider px-1">
              Generated Study Guides ({studyGuides.length})
            </div>

            <div className="space-y-2">
              {studyGuides.map((guide) => {
                const isCurrent = guide.id === activeGuide?.id;
                const course = courses.find((c) => c.id === guide.courseId);

                return (
                  <div
                    key={guide.id}
                    onClick={() => setActiveGuideId(guide.id)}
                    className={`academic-card p-4 cursor-pointer transition-all ${
                      isCurrent
                        ? 'border-blue-600 bg-blue-50/20 ring-1 ring-blue-600 shadow-card'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${course?.color}15`, color: course?.color }}
                      >
                        {course?.name}
                      </span>
                      <span className="text-[10px] text-slate-500">{guide.createdAt}</span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-slate-900 mt-2 line-clamp-1">
                      {guide.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{guide.unitTitle}</p>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-slate-600">
                      <span className="capitalize">{guide.format.replace('_', ' ')}</span>
                      {guide.verifiedAgainstMaterials && (
                        <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Source Verified</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Study Guide Document Reader */}
          <div className="lg:col-span-8">
            {activeGuide ? (
              <div className="academic-card p-6 sm:p-8 bg-white space-y-8 print:p-0 print:border-none print:shadow-none">
                {/* Guide Title Banner */}
                <div className="border-b border-stone-200 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                        {activeGuide.unitTitle}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Teacher Notes Grounded</span>
                      </span>
                    </div>
                    {activeGuide.assessmentDate && (
                      <div className="flex items-center space-x-1.5 text-xs text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-lg">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Target Exam: {activeGuide.assessmentDate}</span>
                      </div>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                    {activeGuide.title}
                  </h2>
                </div>

                {/* Source Grounding Legend Banner (Crucial for Section 4.E) */}
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 text-xs">
                  <div className="font-semibold text-slate-800 mb-1.5 flex items-center space-x-1.5">
                    <Layers className="h-4 w-4 text-blue-700" />
                    <span>Academic Grounding Transparency Standard</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span><strong>Explicit in Course Notes:</strong> Directly extracted from teacher slides or lab packets.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shrink-0" />
                      <span><strong>AI Synthesis / Elaboration:</strong> Added to explain the mechanism step-by-step.</span>
                    </div>
                  </div>
                </div>

                {/* Section 1: Learning Objectives */}
                {activeGuide.learningObjectives.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-slate-900 flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                        1
                      </span>
                      <span>Target Learning Objectives</span>
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside bg-stone-50/50 p-4 rounded-xl border border-stone-100 leading-relaxed">
                      {activeGuide.learningObjectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section 2: Core Vocabulary & Definitions with Sourcing */}
                {activeGuide.vocabulary.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-slate-900 flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                        2
                      </span>
                      <span>Essential Vocabulary & Rigorous Definitions</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeGuide.vocabulary.map((vocab, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-1">
                          <div className="font-serif font-bold text-slate-900 text-sm">
                            {vocab.term}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {vocab.definition}
                          </p>
                          <div className="pt-1.5 text-[10px] text-emerald-800 font-medium flex items-center space-x-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Cited: {vocab.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 3: In-Depth Conceptual Explanations with Citations */}
                {activeGuide.sections.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-base font-bold text-slate-900 flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                        3
                      </span>
                      <span>Step-by-Step Conceptual Explanations</span>
                    </h3>
                    <div className="space-y-3">
                      {activeGuide.sections.map((sec, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-bold text-slate-900 text-sm">
                              {sec.title}
                            </h4>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                sec.isAiExpanded
                                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {sec.isAiExpanded ? 'AI Pedagogical Elaboration' : 'Direct Note Excerpt'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                            {sec.content}
                          </p>
                          {sec.citations.length > 0 && (
                            <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-2 text-[10px] text-slate-500">
                              <span className="font-medium text-slate-700">Source References:</span>
                              {sec.citations.map((c, cIdx) => (
                                <span key={cIdx} className="bg-stone-100 px-1.5 py-0.5 rounded font-mono">
                                  {c.title}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Formulas & Mathematical Rules */}
                {activeGuide.formulasAndRules.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-slate-900 flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                        4
                      </span>
                      <span>Key Governing Formulas & Decision Rules</span>
                    </h3>
                    <div className="space-y-3">
                      {activeGuide.formulasAndRules.map((formula, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
                          <div className="font-serif font-bold text-slate-900 text-sm">
                            {formula.name}
                          </div>
                          <div className="font-mono text-xs sm:text-sm font-semibold text-blue-900 bg-white p-3 rounded-lg border border-stone-200 overflow-x-auto">
                            {formula.formula}
                          </div>
                          <div className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-800">Application: </span>
                            {formula.whenToUse}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 5: Worked Example with Reasoning Steps & Pitfalls */}
                {activeGuide.workedExamples.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-slate-900 flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                        5
                      </span>
                      <span>Exam-Style Worked Example</span>
                    </h3>
                    {activeGuide.workedExamples.map((ex, idx) => (
                      <div key={idx} className="rounded-xl border border-stone-200 bg-white p-5 shadow-2xs space-y-3">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Problem Prompt (from {ex.sourceCitation})
                        </div>
                        <div className="font-serif text-sm font-bold text-slate-900 bg-stone-50 p-3.5 rounded-lg border border-stone-100">
                          {ex.problem}
                        </div>

                        <div className="space-y-2 pt-1">
                          <div className="text-xs font-bold text-slate-700">Step-by-Step Solution:</div>
                          {ex.steps.map((st) => (
                            <div key={st.stepNumber} className="flex items-start space-x-2 text-xs text-slate-700">
                              <span className="font-bold text-blue-700 shrink-0">Step {st.stepNumber}:</span>
                              <span>{st.description} {st.ruleOrFormula && <em className="text-slate-500">({st.ruleOrFormula})</em>}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                          <span className="font-bold text-emerald-900">Final Conclusion: </span>
                          <span className="text-emerald-800">{ex.solution}</span>
                        </div>

                        {ex.commonPitfall && (
                          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs">
                            <span className="font-bold text-rose-900">Common Student Trap: </span>
                            <span className="text-rose-800">{ex.commonPitfall}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Section 6: Misconceptions & Exam Traps */}
                {activeGuide.misconceptions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-slate-900 flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                        6
                      </span>
                      <span>High-Frequency Misconceptions</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeGuide.misconceptions.map((m, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 text-xs space-y-1.5">
                          <div className="font-bold text-rose-800 line-through">
                            Misconception: "{m.misconception}"
                          </div>
                          <div className="font-medium text-emerald-900">
                            Correction: {m.correction}
                          </div>
                          <div className="text-[10px] text-amber-800 italic pt-1">
                            Why it matters: {m.whyItMatters}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 7: Final Review Checklist */}
                {activeGuide.checklist.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-slate-900 flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                        7
                      </span>
                      <span>Self-Check Readiness Audit</span>
                    </h3>
                    <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2 text-xs">
                      {activeGuide.checklist.map((item, idx) => (
                        <label key={idx} className="flex items-center space-x-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={item.completed}
                            className="rounded border-stone-300 text-blue-600 focus:ring-0"
                          />
                          <span className="text-slate-800">{item.item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="academic-card p-12 text-center text-slate-500">
                No study guides generated yet. Click "Generate New Guide" above.
              </div>
            )}
          </div>
        </div>

        {/* Modal: Configure & Generate New Study Guide */}
        {showGenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="academic-card max-w-lg w-full p-6 shadow-elevated">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-blue-700" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Configure Grounded Study Guide
                  </h3>
                </div>
                <button
                  onClick={() => setShowGenModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleGenerate} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Study Guide Focus / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={genTitle}
                    onChange={(e) => setGenTitle(e.target.value)}
                    placeholder="e.g. Unit 3 Cellular Respiration & ATP Synthase Review"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Course
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 bg-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Assessment Date
                    </label>
                    <input
                      type="text"
                      value={genAssessmentDate}
                      onChange={(e) => setGenAssessmentDate(e.target.value)}
                      placeholder="e.g. Friday, Oct 30"
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Desired Depth
                    </label>
                    <select
                      value={genFormat}
                      onChange={(e) => setGenFormat(e.target.value)}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 bg-white"
                    >
                      <option value="deep_dive">Comprehensive Deep Dive</option>
                      <option value="quick_review">Quick Exam Cram Sheet</option>
                      <option value="formula_sheet">Formula & Rule Sheet</option>
                      <option value="practice_focused">Worked Examples & Problems</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Difficulty Level
                    </label>
                    <select
                      value={genDifficulty}
                      onChange={(e) => setGenDifficulty(e.target.value)}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 bg-white"
                    >
                      <option value="exam_prep">AP / Exam Prep (Rigorous)</option>
                      <option value="standard">Standard High School</option>
                      <option value="advanced">Advanced Honors</option>
                      <option value="introductory">Introductory Foundation</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-[11px] text-blue-900 leading-relaxed">
                  <strong>Verification Guarantee:</strong> The generator cross-references your teacher’s slides and class handouts before compiling. It marks explicitly cited sections vs supplemental explanations.
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowGenModal(false)}
                    className="rounded-lg border border-stone-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                  >
                    {isGenerating ? 'Compiling Guide...' : 'Generate Study Guide'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
