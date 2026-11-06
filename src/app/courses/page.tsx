'use client';

import React, { useState } from 'react';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import {
  BookOpen,
  FolderTree,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronDown,
  FileText,
  MessageSquareCode,
  CheckSquare,
  HelpCircle,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function CoursesPage() {
  const {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    selectedCourse,
    units,
    topics,
    materials,
    assignments,
    syncGoogleClassroom,
    googleSyncing
  } = useAcademic();

  const [expandedUnitId, setExpandedUnitId] = useState<string>('unit-bio-energetics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-etc-chemiosmosis');

  const courseUnits = units.filter((u) => u.courseId === selectedCourseId);
  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Header with Course Switcher & Sync */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Academic Curriculum Hierarchy
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-stone-300" />
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {courses.length} Courses Connected
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Courses, Units & Topic Knowledge Base
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Every unit and concept organized with teacher materials, class notes, and demonstrated student mastery.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={syncGoogleClassroom}
              disabled={googleSyncing}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50 transition-colors shadow-2xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${googleSyncing ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
              <span>{googleSyncing ? 'Syncing...' : 'Sync Classroom'}</span>
            </button>
            <Link
              href="/study-guides"
              className="inline-flex items-center space-x-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors shadow-2xs"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Generate Study Guide</span>
            </Link>
          </div>
        </div>

        {/* Course Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {courses.map((course) => {
            const isSelected = course.id === selectedCourseId;
            return (
              <button
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  const firstUnit = units.find((u) => u.courseId === course.id);
                  if (firstUnit) setExpandedUnitId(firstUnit.id);
                }}
                className={`flex items-center space-x-2.5 rounded-xl px-4 py-2.5 text-xs font-medium transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-slate-700 hover:bg-stone-50'
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: course.color }}
                />
                <span className="font-semibold">{course.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-800 text-stone-300' : 'bg-stone-100 text-slate-600'}`}>
                  {course.period}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Left Unit & Topic Tree; Right Topic Knowledge Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Units & Topic Accordions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="academic-card p-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <FolderTree className="h-4 w-4 text-blue-700" />
                  <span>Curriculum Units</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {courseUnits.length} Units Available
                </span>
              </div>

              <div className="mt-3 space-y-3">
                {courseUnits.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No units ingested yet. Add a syllabus or sync Google Classroom.
                  </div>
                ) : (
                  courseUnits.map((unit) => {
                    const isExpanded = expandedUnitId === unit.id;
                    const unitTopics = topics.filter((t) => t.unitId === unit.id);

                    return (
                      <div
                        key={unit.id}
                        className="rounded-xl border border-stone-200 bg-white overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedUnitId(isExpanded ? '' : unit.id)}
                          className="w-full flex items-center justify-between p-3.5 text-left bg-stone-50/60 hover:bg-stone-50 transition-colors"
                        >
                          <div>
                            <div className="font-serif text-sm font-bold text-slate-900">
                              {unit.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {unit.description}
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-slate-500 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-2 space-y-1 bg-white border-t border-stone-100">
                            {unitTopics.map((topic) => {
                              const isSelected = selectedTopicId === topic.id;
                              return (
                                <button
                                  key={topic.id}
                                  onClick={() => setSelectedTopicId(topic.id)}
                                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                                    isSelected
                                      ? 'bg-blue-50 border border-blue-200 text-blue-900 font-semibold'
                                      : 'hover:bg-stone-50 text-slate-700'
                                  }`}
                                >
                                  <div className="space-y-0.5 pr-2">
                                    <div className="truncate">{topic.title}</div>
                                    <div className="text-[10px] text-slate-500">
                                      {topic.sourceDocCount} Verified Source Docs
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span
                                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                        topic.confidenceScore === 'mastered'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : topic.confidenceScore === 'improving'
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-amber-100 text-amber-800'
                                      }`}
                                    >
                                      {topic.masteryLevel}%
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Ingested Materials Snapshot for this Course */}
            <div className="academic-card p-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider">
                  Associated Course Documents
                </span>
                <Link href="/library" className="text-blue-700 font-semibold hover:underline">
                  View All ({materials.filter((m) => m.courseId === selectedCourseId).length})
                </Link>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                {materials
                  .filter((m) => m.courseId === selectedCourseId)
                  .map((mat) => (
                    <div
                      key={mat.id}
                      className="p-2.5 rounded-lg border border-stone-200 bg-stone-50/50 flex items-center justify-between"
                    >
                      <div className="truncate pr-2">
                        <div className="font-semibold text-slate-800 truncate">{mat.title}</div>
                        <div className="text-[10px] text-slate-500">
                          {mat.fileType.toUpperCase()} • {mat.uploadedAt}
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded shrink-0">
                        Processed
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Topic Knowledge & Grounding Inspector */}
          <div className="lg:col-span-7 space-y-4">
            {currentTopic ? (
              <div className="academic-card p-6 space-y-5">
                {/* Topic Header */}
                <div className="border-b border-stone-200 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      Selected Topic Knowledge Base
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        currentTopic.confidenceScore === 'mastered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : currentTopic.confidenceScore === 'improving'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {currentTopic.confidenceScore === 'mastered'
                        ? 'Mastered'
                        : currentTopic.confidenceScore === 'improving'
                        ? 'Improving'
                        : 'Needs Practice'}{' '}
                      ({currentTopic.masteryLevel}%)
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    {currentTopic.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {currentTopic.description}
                  </p>
                </div>

                {/* Key Formulas or Equations (if available) */}
                {currentTopic.keyFormulas && currentTopic.keyFormulas.length > 0 && (
                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Key Governing Formula / Equation
                    </div>
                    {currentTopic.keyFormulas.map((f, idx) => (
                      <div
                        key={idx}
                        className="font-mono text-xs text-blue-900 bg-white p-2.5 rounded border border-stone-200 overflow-x-auto"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                )}

                {/* Common Misconceptions Extracted from Class Notes */}
                {currentTopic.commonMisconceptions && currentTopic.commonMisconceptions.length > 0 && (
                  <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-4 text-xs space-y-2">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-900 uppercase tracking-wider">
                      <HelpCircle className="h-4 w-4 text-amber-700" />
                      <span>Teacher-Flagged Misconceptions & Exam Traps</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-amber-800 leading-relaxed">
                      {currentTopic.commonMisconceptions.map((mis, idx) => (
                        <li key={idx}>{mis}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ingested Source Citations & Excerpts */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Grounded Course Sources & Text Excerpts
                  </div>
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-800">
                        Cellular Respiration & Chemiosmosis.pdf (Slide 16)
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                        98% Match
                      </span>
                    </div>
                    <p className="text-slate-600 bg-stone-50 p-2.5 rounded border border-stone-100 font-serif italic text-xs leading-relaxed">
                      "As high-energy electrons transfer down the electronegativity gradient to Oxygen (the terminal electron acceptor), free energy pumps H+ ions from the mitochondrial matrix into the intermembrane space."
                    </p>
                  </div>
                </div>

                {/* Actionable Next Steps Bar */}
                <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-2.5">
                  <Link
                    href="/tutor"
                    className="inline-flex items-center space-x-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs"
                  >
                    <MessageSquareCode className="h-4 w-4 text-amber-400" />
                    <span>Practice with Socratic Tutor</span>
                  </Link>

                  <Link
                    href="/quizzes"
                    className="inline-flex items-center space-x-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-stone-50 transition-colors shadow-2xs"
                  >
                    <CheckSquare className="h-4 w-4 text-blue-600" />
                    <span>Quiz Me on This Topic</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="academic-card p-12 text-center text-slate-500 text-sm">
                Select a topic from the left to inspect grounded materials and mastery status.
              </div>
            )}
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
