'use client';

import React from 'react';
import AppNavbar from './AppNavbar';
import Sidebar from './Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderArchive,
  MessageSquareCode,
  CheckSquare,
  CalendarDays
} from 'lucide-react';

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const mobileNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Library', href: '/library', icon: FolderArchive },
    { name: 'Tutor', href: '/tutor', icon: MessageSquareCode },
    { name: 'Quizzes', href: '/quizzes', icon: CheckSquare },
    { name: 'Planner', href: '/planner', icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <AppNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-stone-200 bg-white/95 px-2 backdrop-blur">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-blue-700' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
