'use client';

import React from 'react';
import Link from 'next/link';
import { useAcademic } from '@/lib/store/academicContext';
import {
  GraduationCap,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function AppNavbar() {
  const {
    isDemoMode,
    toggleDemoMode,
    courses,
    selectedCourseId,
    setSelectedCourseId,
    selectedCourse,
    syncGoogleClassroom,
    googleSyncing,
    subscription
  } = useAcademic();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200/80 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Left: Brand & Course Switcher */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-white shadow-sm">
            <GraduationCap className="h-5 w-5 text-amber-400" />
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-bold tracking-tight text-slate-900">
              StudyPilot
            </span>
            <span className="ml-2 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
              ACADEMIC
            </span>
          </div>
        </Link>

        {/* Course Quick Selector */}
        <div className="relative">
          <div className="flex items-center space-x-2 rounded-lg border border-stone-200 bg-stone-50/80 px-2.5 py-1.5 text-xs text-slate-700 shadow-xs">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: selectedCourse?.color || '#059669' }}
            />
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="bg-transparent font-medium text-slate-800 outline-none cursor-pointer pr-4"
              aria-label="Active Course"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.period})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right: Demo Mode Toggle, Google Classroom Sync, Pro Badge, Profile */}
      <div className="flex items-center space-x-3">
        {/* Google Classroom Sync Pill */}
        <button
          onClick={syncGoogleClassroom}
          disabled={googleSyncing}
          className="hidden md:flex items-center space-x-1.5 rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-stone-50 hover:text-slate-900 transition-colors shadow-xs"
          title="Google Classroom Read-Only Sync"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 text-slate-500 ${googleSyncing ? 'animate-spin text-blue-600' : ''}`}
          />
          <span>{googleSyncing ? 'Syncing...' : 'Classroom Synced'}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </button>

        {/* Demo Mode Badge */}
        {isDemoMode && (
          <div className="flex items-center space-x-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="hidden sm:inline">Demo Sandbox Active</span>
            <span className="sm:hidden">Demo</span>
          </div>
        )}

        {/* Plan Entitlement */}
        <Link
          href="/settings"
          className="hidden sm:flex items-center space-x-1 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-stone-200 transition-colors"
        >
          <span className="capitalize">{subscription.plan} Tier</span>
        </Link>

        {/* User Mini Profile */}
        <div className="flex items-center space-x-2 pl-1 border-l border-stone-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-amber-300 shadow-xs">
            AL
          </div>
          <div className="hidden lg:block text-left text-xs">
            <div className="font-semibold text-slate-900">Alex Liu</div>
            <div className="text-[10px] text-slate-500">Lincoln High • 10th Grade</div>
          </div>
        </div>
      </div>
    </header>
  );
}
