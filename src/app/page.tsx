'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  MessageSquareCode,
  CheckSquare,
  Calendar,
  Lock,
  Layers,
  FileCheck,
  ExternalLink,
  ChevronRight,
  Star
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 selection:bg-blue-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#FAF8F5]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs">
              <GraduationCap className="h-5 w-5 text-amber-400" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900">
              StudyPilot
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Core Workspace
            </a>
            <a href="#privacy" className="hover:text-slate-900 transition-colors">
              Student Privacy
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">
              Pricing
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 rounded-lg bg-blue-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition-colors"
            >
              <span>Launch Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-stone-300 bg-stone-100/80 px-3.5 py-1 text-xs font-medium text-slate-700 mb-6 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Built specifically for Middle & High School Academics</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            Everything happening in your classes, organized into{' '}
            <span className="text-blue-700 underline decoration-stone-300 underline-offset-8">
              one intelligent study workspace.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Connect your Google Classroom, upload teacher handouts and handwritten notes, and get personalized
            tutoring grounded strictly in your real coursework and exam expectations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Explore Full Interactive Demo</span>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </Link>

            <Link
              href="/tutor"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition-colors"
            >
              <MessageSquareCode className="h-4 w-4 text-blue-600" />
              <span>Try Socratic Tutor</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-slate-500">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Read-only Google Classroom Sync</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Lock className="h-4 w-4 text-slate-600" />
              <span>COPPA & FERPA conscious</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Workspace Showcase Card */}
        <div className="mt-14 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-stone-300/80 bg-white p-3 sm:p-5 shadow-elevated">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-mono text-slate-400">
                  studypilot.app/workspace/ap-bio
                </span>
              </div>
              <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Grounded in Dr. Thorne’s Slides & Notes
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <FileCheck className="h-4 w-4 text-emerald-600" />
                  <span>Verified Course Sources</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs shadow-2xs">
                    <div className="font-semibold text-slate-800">Cellular Respiration Slide 16</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Teacher PDF • Ingested 28 slides</div>
                    <div className="mt-1 inline-block text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      Proton Motive Force Citations
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs shadow-2xs">
                    <div className="font-semibold text-slate-800">Whiteboard Photo (OCR)</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">RuBisCO 3-PGA Stoichiometry</div>
                    <div className="mt-1 inline-block text-[10px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                      96% OCR Confidence
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  <MessageSquareCode className="h-4 w-4 text-blue-700" />
                  <span>Socratic AI Tutoring</span>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-white border border-blue-200 text-xs shadow-2xs space-y-2">
                  <div className="font-medium text-slate-700 italic">
                    "Why does uncoupler DNP cause hyperthermia without producing ATP?"
                  </div>
                  <div className="text-slate-800 font-normal leading-relaxed text-[11px] bg-stone-50 p-2 rounded border border-stone-200">
                    <span className="font-semibold text-blue-800">Tutor:</span> Think about Peter Mitchell's dam analogy on Slide 19. If protons bypass ATP Synthase, where does that electron energy go?
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-emerald-700 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Encourages active recall, not just final answers</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <CheckSquare className="h-4 w-4 text-amber-600" />
                  <span>Diagnostic & Rubric Grading</span>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-white border border-stone-200 text-xs shadow-2xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Unit 3 Diagnostic</span>
                    <span className="font-bold text-emerald-700">75% Mastery</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-3/4 rounded-full" />
                  </div>
                  <div className="text-[11px] text-slate-600 pt-1">
                    <span className="font-semibold text-rose-700">Learning Gap Detected:</span> Chloroplast vs Mitochondrial pH gradient orientation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Breakdown */}
      <section id="features" className="py-20 bg-white border-t border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Not a generic chatbot. A grounded academic workspace.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Generic AI models hallucinate page numbers and regurgitate internet summaries.
              StudyPilot anchors directly in your teacher’s specific assignments, handouts, and exam rubrics.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="academic-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Google Classroom Integration
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Connect your account with read-only permissions. StudyPilot organizes upcoming assignments,
                teacher-posted slides, and lab documents into structured courses.
              </p>
            </div>

            <div className="academic-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-800 mb-4">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Multimodal OCR Ingestion
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Upload PDFs, Word docs, screenshots of homework problems, or photos of classroom whiteboards.
                Multimodal AI extracts formulas, diagrams, and definitions with page citations.
              </p>
            </div>

            <div className="academic-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800 mb-4">
                <MessageSquareCode className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Socratic AI Tutor
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Choose from 6 learning modes: Teach Me, Give Me a Hint, Walk Through an Example, Test Understanding,
                Explain My Mistake, or Review. The tutor guides you through the reasoning steps.
              </p>
            </div>

            <div className="academic-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-800 mb-4">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Practice Quizzes & Rubrics
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Generate tailored multiple-choice, short-answer, and application questions. Detailed rubric grading
                evaluates substantive correctness, flags misconceptions, and tracks topic mastery.
              </p>
            </div>

            <div className="academic-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-800 mb-4">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Personalized Study Planner
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Combines approaching exam deadlines, recent quiz mistakes, and available study hours into
                manageable 30-to-45 minute spaced-retrieval sessions.
              </p>
            </div>

            <div className="academic-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-800 mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Source Citation Transparency
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Every study guide explicitly distinguishes between information present in your teacher’s notes versus
                AI-supplemented explanations. Never wonder if an explanation came from your class or the web.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy and Student Safety Section */}
      <section id="privacy" className="py-20 bg-[#FAF7F2]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-stone-300 bg-white p-8 sm:p-12 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-600" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Student Safety & Privacy by Design
              </h2>
            </div>
            <p className="text-slate-600 text-base leading-relaxed">
              We design specifically for middle and high school students with strict safeguards:
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Minimal OAuth Scopes:</strong> We only request read-only access to view assignments and attached materials. We can never submit work or modify grades.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Ad Profiling:</strong> Your academic records and uploaded materials are never sold, rented, or shared with advertising brokers.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tenant Isolation:</strong> Your notes, quizzes, and chat sessions are stored in an encrypted tenant silo accessible only to your account.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Full Data Deletion:</strong> Delete any uploaded document or wipe your entire academic account at any time with a single click in Settings.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <section id="pricing" className="py-20 bg-white border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-slate-600">
              Start free with full core functionality, or unlock unlimited AI generation with Pro.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="academic-card p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Tier</span>
                <div className="mt-2 flex items-baseline space-x-1">
                  <span className="text-4xl font-serif font-bold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500">/ forever</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Ideal for trying StudyPilot on your most challenging course.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Up to 3 active courses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>5 AI study guides per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>10 practice quizzes per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>50 MB document & photo OCR storage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Interactive Socratic Tutor</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="mt-8 block text-center rounded-lg border border-stone-300 bg-white py-2.5 text-sm font-semibold text-slate-800 hover:bg-stone-50 transition-colors shadow-2xs"
              >
                Launch Free Workspace
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="academic-card p-8 flex flex-col justify-between border-2 border-blue-600 relative shadow-card">
              <div className="absolute -top-3 right-6 bg-blue-700 text-white px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">StudyPilot Pro</span>
                <div className="mt-2 flex items-baseline space-x-1">
                  <span className="text-4xl font-serif font-bold text-slate-900">$12</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  For students managing a full high-school courseload with AP/IB exams.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                    <span className="font-semibold text-slate-900">Unlimited active courses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                    <span>50 comprehensive study guides / month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                    <span>100 practice diagnostic quizzes / month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                    <span>500 MB OCR notes, slides, and PDF storage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                    <span>Continuous automated Google Classroom sync</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                    <span>Targeted weak-topic spaced repetition planner</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/settings"
                className="mt-8 block text-center rounded-lg bg-blue-700 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors shadow-sm"
              >
                Upgrade to Pro (Test Mode)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-[#FAF7F2] py-12 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-slate-700" />
            <span className="font-serif font-bold text-slate-800">StudyPilot</span>
            <span>• An Intelligent Academic Workspace</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/dashboard" className="hover:text-slate-900 underline">
              Demo Workspace
            </Link>
            <Link href="/settings" className="hover:text-slate-900 underline">
              Privacy Policy
            </Link>
            <Link href="/integrations" className="hover:text-slate-900 underline">
              Google Classroom OAuth
            </Link>
          </div>
          <div>© 2026 StudyPilot. Built for students who care about real learning.</div>
        </div>
      </footer>
    </div>
  );
}
