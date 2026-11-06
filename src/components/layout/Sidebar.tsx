'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderArchive,
  FileText,
  MessageSquareCode,
  CheckSquare,
  CalendarDays,
  Share2,
  Settings,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useAcademic } from '@/lib/store/academicContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { selectedCourse, subscription } = useAcademic();

  const navItems = [
    {
      name: 'Overview Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Courses & Units',
      href: '/courses',
      icon: BookOpen,
      badge: '3 Courses'
    },
    {
      name: 'Materials Library',
      href: '/library',
      icon: FolderArchive,
      badge: 'OCR Active'
    },
    {
      name: 'Study Guide Studio',
      href: '/study-guides',
      icon: FileText,
      badge: null
    },
    {
      name: 'Interactive AI Tutor',
      href: '/tutor',
      icon: MessageSquareCode,
      badge: 'Socratic'
    },
    {
      name: 'Practice Quizzes',
      href: '/quizzes',
      icon: CheckSquare,
      badge: 'Rubric'
    },
    {
      name: 'Study Planner',
      href: '/planner',
      icon: CalendarDays,
      badge: null
    },
    {
      name: 'Integrations & Google',
      href: '/integrations',
      icon: Share2,
      badge: 'Connected'
    },
    {
      name: 'Settings & Privacy',
      href: '/settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col justify-between border-r border-stone-200/90 bg-[#FAF7F2] p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Active Course Snapshot Box */}
        {selectedCourse && (
          <div className="rounded-xl border border-stone-200/90 bg-white p-3 shadow-xs">
            <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-500">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: selectedCourse.color }}
              />
              <span className="uppercase tracking-wider">Active Workspace</span>
            </div>
            <div className="mt-1 font-serif text-sm font-bold text-slate-900 truncate">
              {selectedCourse.name}
            </div>
            <div className="mt-0.5 text-xs text-slate-500 truncate">
              {selectedCourse.teacherName} • {selectedCourse.period}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-stone-100 pt-1.5">
              <span>Topic Mastery</span>
              <span className="font-semibold text-slate-900">{selectedCourse.masteryPercentage}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${selectedCourse.masteryPercentage}%`,
                  backgroundColor: selectedCourse.color
                }}
              />
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-stone-200/60 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-900'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                      isActive
                        ? 'bg-slate-800 text-amber-300'
                        : 'bg-stone-200/80 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Trust & Entitlements */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <div className="rounded-lg bg-white/70 p-2.5 border border-stone-200/70 text-xs text-slate-600">
          <div className="flex items-center justify-between font-semibold text-slate-800 text-[11px]">
            <span>Monthly AI Allowance</span>
            <span className="text-blue-700">
              {subscription.studyGuidesGeneratedThisMonth} / {subscription.studyGuidesLimit} Guides
            </span>
          </div>
          <div className="mt-1.5 h-1 w-full rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{
                width: `${(subscription.studyGuidesGeneratedThisMonth / subscription.studyGuidesLimit) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>FERPA / COPPA Safe</span>
          </div>
          <Link href="/" className="hover:text-slate-900 text-[10px] underline">
            Home Site
          </Link>
        </div>
      </div>
    </aside>
  );
}
