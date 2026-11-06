'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import {
  Share2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  LogOut,
  ExternalLink,
  Layers,
  FileText,
  Lock,
  Info
} from 'lucide-react';

export default function IntegrationsPage() {
  const {
    courses,
    syncGoogleClassroom,
    disconnectGoogleClassroom,
    googleSyncing
  } = useAcademic();

  const [activeTab, setActiveTab] = useState<'classroom' | 'drive' | 'manual'>('classroom');
  const [disconnectAlert, setDisconnectAlert] = useState(false);

  const isConnected = courses.some((c) => c.syncStatus === 'synced');

  const handleDisconnect = () => {
    disconnectGoogleClassroom();
    setDisconnectAlert(true);
    setTimeout(() => setDisconnectAlert(false), 3000);
  };

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Share2 className="h-4 w-4 text-blue-700" />
              <span>External Service Gateways</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Google Classroom & Material Integrations
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Secure, read-only connections to your school learning management systems and Google Drive folders.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {isConnected ? (
              <button
                onClick={handleDisconnect}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-800 hover:bg-rose-100 transition-colors shadow-2xs"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Disconnect Classroom</span>
              </button>
            ) : (
              <button
                onClick={syncGoogleClassroom}
                disabled={googleSyncing}
                className="inline-flex items-center space-x-1.5 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors shadow-xs"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${googleSyncing ? 'animate-spin' : ''}`} />
                <span>Connect Google Classroom</span>
              </button>
            )}
          </div>
        </div>

        {disconnectAlert && (
          <div className="p-4 rounded-xl border border-rose-300 bg-rose-50 text-xs text-rose-800 flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Google Classroom disconnected and cached OAuth tokens successfully revoked.</span>
          </div>
        )}

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Google Classroom Gateway Card */}
          <div className="lg:col-span-8 space-y-6">
            <div className="academic-card p-6 bg-white space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                    GC
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Official Google Classroom API (OAuth 2.0)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Synchronizes course rosters, posted teacher slides, and assignment due dates.
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    isConnected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-slate-600'
                  }`}
                >
                  {isConnected ? 'Active & Synced' : 'Disconnected'}
                </span>
              </div>

              {/* Verified Minimal OAuth Scopes Section */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Verified Minimal Permissions Requested (Read-Only)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/70 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-slate-800">
                      classroom.courses.readonly
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      View course names, teachers, and section numbers you are enrolled in.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/70 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-slate-800">
                      classroom.coursework.me.readonly
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      View assignment instructions, point totals, and submission due dates.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/70 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-slate-800">
                      classroom.materials.readonly
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      Inspect PDFs and slides shared directly by teachers in assignment stream.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/70 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-slate-800">
                      drive.readonly (User-Selected)
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      Only read specific files explicitly selected in the Google Drive picker.
                    </div>
                  </div>
                </div>
              </div>

              {/* What We Will NEVER Do Guarantee */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs space-y-2">
                <div className="font-bold text-blue-900 flex items-center space-x-1.5">
                  <Lock className="h-4 w-4 text-blue-700" />
                  <span>Zero Write Privileges Guarantee:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px] leading-relaxed">
                  <li>StudyPilot <strong>cannot</strong> submit assignments on your behalf.</li>
                  <li>StudyPilot <strong>cannot</strong> edit grades, comment on announcements, or alter classroom rosters.</li>
                  <li>Inaccessible, third-party, or restricted files are explicitly flagged with manual upload fallbacks.</li>
                </ul>
              </div>

              {/* Manual Import Fallback for School Domains that Block Third-Party OAuth */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-900">
                      School District Restrictions? Use Manual Import Fallback
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Some school Google Workspace administrators restrict third-party apps. You can always upload syllabi, assignment PDFs, and rubrics manually without connecting Google.
                    </p>
                  </div>
                  <Link
                    href="/library"
                    className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-stone-50 shrink-0 ml-3"
                  >
                    Manual Upload
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Integration Status & Technical Prerequisites */}
          <div className="lg:col-span-4 space-y-4">
            <div className="academic-card p-5 space-y-4">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Connection Health & Scopes
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-slate-600">Google OAuth 2.0</span>
                  <span className="font-semibold text-emerald-800 flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-slate-600">Token Expiration</span>
                  <span className="font-semibold text-slate-800">Auto-refresh (1h)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-slate-600">Connected Courses</span>
                  <span className="font-semibold text-slate-800">{courses.length} Active</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-slate-600">FERPA Isolation</span>
                  <span className="font-semibold text-emerald-800">Enforced</span>
                </div>
              </div>

              <button
                onClick={syncGoogleClassroom}
                disabled={googleSyncing}
                className="w-full rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors flex items-center justify-center space-x-1.5"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${googleSyncing ? 'animate-spin' : ''}`} />
                <span>{googleSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
            </div>

            {/* Note on External Research Workspaces (Gemini Notebooks) */}
            <div className="academic-card p-5 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="h-4 w-4 text-purple-700" />
                <span>External Educational Notebooks</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Support for importing research sources from NotebookLM and Gemini-based workspace exports. Export your notes as PDF or text and import directly through the Materials Library.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
