# StudyPilot — Intelligent AI Academic Workspace

> "Everything happening in your classes, organized into one intelligent study workspace."

StudyPilot is a full-stack, production-oriented academic workspace designed specifically for middle-school and high-school students. Rather than acting as a generic chatbot, StudyPilot grounds itself strictly in a student's actual courses, assignments, teacher slide decks, lab handouts, and notes.

---

## 🚀 Live Demo Server

The production application is running locally:
👉 **[http://localhost:3000](http://localhost:3000)**

### Quick Navigation Routes:
- **Landing Page**: [`/`](http://localhost:3000)
- **Academic Dashboard**: [`/dashboard`](http://localhost:3000/dashboard)
- **Course & Knowledge Hierarchy**: [`/courses`](http://localhost:3000/courses)
- **Materials Library (OCR & Ingestion)**: [`/library`](http://localhost:3000/library)
- **AI Study Guide Studio**: [`/study-guides`](http://localhost:3000/study-guides)
- **Interactive Socratic AI Tutor**: [`/tutor`](http://localhost:3000/tutor)
- **Practice Quizzes & Rubrics**: [`/quizzes`](http://localhost:3000/quizzes)
- **Spaced Retrieval Study Planner**: [`/planner`](http://localhost:3000/planner)
- **Google Classroom & Integrations Hub**: [`/integrations`](http://localhost:3000/integrations)
- **Settings, Privacy & Entitlements**: [`/settings`](http://localhost:3000/settings)

---

## 🏛️ System Architecture

```text
StudyPilot/
├── src/
│   ├── app/                        # Next.js App Router (10 Core Screen Views)
│   │   ├── page.tsx                # SaaS Landing Page with Feature Walkthrough
│   │   ├── dashboard/              # Daily Overview, Assignments, & Mastery Dashboard
│   │   ├── courses/                # Course, Unit & Topic Hierarchy Inspector
│   │   ├── library/                # Document Parsing, Notes & Multimodal OCR Ingest
│   │   ├── study-guides/           # Source-Grounded Study Guide Studio & Reader
│   │   ├── tutor/                  # 6-Mode Socratic Interactive AI Tutor
│   │   ├── quizzes/                # Practice Quiz Room, Rubric Evaluation & Results
│   │   ├── planner/                # Spaced Repetition Study Planner & Constraints
│   │   ├── integrations/           # Google Classroom Minimal OAuth 2.0 Gateway
│   │   └── settings/               # FERPA/COPPA Privacy, Data Purge & Pro Tier
│   ├── components/                 # Reusable UI Components
│   │   └── layout/                 # AppNavbar, Sidebar, WorkspaceShell
│   └── lib/
│       ├── types/                  # Typed Data Models (Course, Material, Quiz, Rubric)
│       ├── demo-data/              # Rich Realistic High School Academic Datasets
│       └── store/                  # AcademicProvider React Context & State Persistence
└── tailwind.config.js              # Warm neutral palette, academic slate, deep navy
```

---

## 🔒 Privacy, Safety & COPPA/FERPA Compliance

1. **Minimal OAuth Scopes (Read-Only):**
   - `classroom.courses.readonly`
   - `classroom.coursework.me.readonly`
   - `classroom.materials.readonly`
   - **Zero Write Permissions:** StudyPilot can never submit assignments, edit grades, or alter classroom rosters.
2. **Tenant Isolation:**
   - Academic records and student notes are partitioned strictly per user account.
   - Zero advertising profiling or selling of student academic data.
3. **Right to Erasure & Data Export:**
   - One-click machine-readable JSON data export.
   - Permanent one-click academic data deletion button in Settings.
4. **Manual Import Fallback:**
   - For school domains that prohibit third-party Google OAuth apps, students can upload syllabi and PDFs directly via the Materials Library.

---

## 🎓 Socratic AI Tutoring (6 Modes)

StudyPilot prioritizes active recall over passive AI answers:
1. **Teach Me**: Conceptual explanations broken down into digestible steps.
2. **Give Me a Hint**: Nudges and clues without revealing the final answer.
3. **Worked Example**: Guided step-by-step walk through similar problem types.
4. **Test My Understanding**: Asks targeted diagnostic check questions.
5. **Explain My Mistake**: Unpacks why a misconception occurred.
6. **Review This Topic**: Comprehensive summary highlighting common test traps.
