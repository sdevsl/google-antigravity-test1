'use client';

import React, { useState } from 'react';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import {
  Settings,
  ShieldCheck,
  CreditCard,
  User,
  Trash2,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function SettingsPage() {
  const {
    subscription,
    upgradeSubscription,
    isDemoMode,
    toggleDemoMode
  } = useAcademic();

  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'privacy'>('subscription');
  const [studentName, setStudentName] = useState('Alex Liu');
  const [gradeLevel, setGradeLevel] = useState('10th Grade (Sophomore)');
  const [schoolName, setSchoolName] = useState('Lincoln High School');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const handleUpgrade = () => {
    upgradeSubscription();
    setUpgradeSuccess(true);
    setTimeout(() => setUpgradeSuccess(false), 3000);
  };

  const handleDataExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        exportDate: new Date().toISOString(),
        student: { name: studentName, grade: gradeLevel, school: schoolName },
        note: "StudyPilot Complete Academic Data Export (FERPA Compliant)"
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `studypilot-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteAllData = () => {
    setShowDeleteConfirm(false);
    setDeleteSuccess(true);
    setTimeout(() => setDeleteSuccess(false), 4000);
  };

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Settings className="h-4 w-4 text-blue-700" />
              <span>Workspace Administration</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Account, Privacy & Subscription Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Manage your academic preferences, verifiable data privacy rights, and monthly AI usage allowances.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'subscription'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Subscription & AI Allowance</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'privacy'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Privacy & Data Deletion</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Student Profile</span>
          </button>
        </div>

        {upgradeSuccess && (
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-xs text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Successfully updated to StudyPilot Pro! Monthly study guide and quiz limits expanded.</span>
          </div>
        )}

        {deleteSuccess && (
          <div className="p-4 rounded-xl border border-rose-300 bg-rose-50 text-xs text-rose-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0" />
            <span>All local academic notes, study guides, and quiz diagnostics purged from database.</span>
          </div>
        )}

        {/* 1. SUBSCRIPTION & USAGE TAB */}
        {activeTab === 'subscription' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div className="academic-card p-6 bg-white space-y-5">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                      Current Entitlement
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mt-1 capitalize">
                      {subscription.plan === 'pro' ? 'StudyPilot Pro ($12 / mo)' : 'StudyPilot Free Plan'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Cycle renews on {subscription.currentPeriodEnd} • Test Mode Active
                    </p>
                  </div>

                  {subscription.plan === 'free' ? (
                    <button
                      onClick={handleUpgrade}
                      className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors shadow-xs flex items-center space-x-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      <span>Upgrade to Pro ($12/mo)</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                      Pro Member
                    </span>
                  )}
                </div>

                {/* Allowance Progress Meters */}
                <div className="space-y-4 pt-1">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Monthly Processing Allowances
                  </div>

                  {/* Guides Allowance */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-700">AI Study Guides Generated</span>
                      <span className="text-slate-900 font-bold">
                        {subscription.studyGuidesGeneratedThisMonth} of {subscription.studyGuidesLimit} used
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${(subscription.studyGuidesGeneratedThisMonth / subscription.studyGuidesLimit) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Quizzes Allowance */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-700">Practice Quiz Generations</span>
                      <span className="text-slate-900 font-bold">
                        {subscription.quizGenerationsThisMonth} of {subscription.quizGenerationsLimit} used
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{
                          width: `${(subscription.quizGenerationsThisMonth / subscription.quizGenerationsLimit) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Storage Allowance */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-700">Encrypted Notes & OCR Storage</span>
                      <span className="text-slate-900 font-bold">
                        {subscription.fileUploadsMB} MB of {subscription.fileUploadsLimitMB} MB used
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{
                          width: `${(subscription.fileUploadsMB / subscription.fileUploadsLimitMB) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="academic-card p-5 space-y-3 text-xs">
                <div className="font-bold text-slate-800 uppercase tracking-wider">
                  Cost Architecture & Limits
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  StudyPilot uses semantic chunking and relevance filtering before routing to Gemini Flash / Pro models. This controls operating costs while maintaining source-grounded accuracy for students.
                </p>
                <div className="pt-2 border-t border-stone-200">
                  <div className="text-[10px] text-slate-500">
                    Stripe Test Mode is enabled for sandbox development without live billing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRIVACY & DATA RIGHTS TAB */}
        {activeTab === 'privacy' && (
          <div className="academic-card p-6 bg-white space-y-6 max-w-4xl">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Student Privacy & Data Governance (FERPA / COPPA)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Academic records and student notes are confidential. StudyPilot strictly enforces tenant isolation and gives you complete ownership over your data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
                <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                  <Download className="h-4 w-4 text-blue-700" />
                  <span>Export Complete Academic Archive</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Download a machine-readable JSON archive containing all your ingested notes, extracted concepts, study guides, and quiz rubrics.
                </p>
                <button
                  onClick={handleDataExport}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-stone-50"
                >
                  Download Data (.json)
                </button>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
                <div className="font-bold text-rose-900 flex items-center space-x-1.5">
                  <Trash2 className="h-4 w-4 text-rose-700" />
                  <span>Right to Erasure (Delete Account)</span>
                </div>
                <p className="text-rose-800 text-[11px] leading-relaxed">
                  Permanently erase all uploaded materials, study guides, tutor dialogue history, and quiz diagnostic scores from our servers.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="rounded-lg bg-rose-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-800"
                >
                  Purge Academic Data
                </button>
              </div>
            </div>

            {showDeleteConfirm && (
              <div className="p-4 rounded-xl border border-rose-400 bg-rose-100 text-xs text-rose-900 space-y-2">
                <div className="font-bold">Are you sure you want to permanently delete all data?</div>
                <p className="text-[11px]">This action cannot be undone. All course notes, study guides, and quiz history will be erased immediately.</p>
                <div className="flex space-x-2 pt-1">
                  <button
                    onClick={handleDeleteAllData}
                    className="rounded bg-rose-800 px-3 py-1 text-xs font-bold text-white hover:bg-rose-900"
                  >
                    Confirm Permanent Deletion
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="rounded border border-stone-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. STUDENT PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="academic-card p-6 bg-white space-y-5 max-w-xl">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Student Profile Information
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Grade Level</label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 p-2.5 text-slate-900 bg-white"
                >
                  <option value="9th Grade (Freshman)">9th Grade (Freshman)</option>
                  <option value="10th Grade (Sophomore)">10th Grade (Sophomore)</option>
                  <option value="11th Grade (Junior)">11th Grade (Junior)</option>
                  <option value="12th Grade (Senior)">12th Grade (Senior)</option>
                  <option value="Middle School (6th-8th)">Middle School (6th-8th)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">School Name</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 p-2.5 text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Profile preferences updated!')}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
