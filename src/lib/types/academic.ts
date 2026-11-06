// Core TypeScript Academic Data Models for StudyPilot

export type CourseSubject = 'biology' | 'math' | 'history' | 'literature' | 'physics' | 'chemistry' | 'computer_science';

export interface Course {
  id: string;
  name: string;
  code: string;
  subject: CourseSubject;
  teacherName: string;
  period: string;
  room?: string;
  color: string;
  accentColor: string;
  description: string;
  googleClassroomId?: string;
  syncStatus: 'synced' | 'local_only' | 'sync_pending' | 'disconnected';
  lastSyncedAt?: string;
  unitCount: number;
  assignmentCount: number;
  materialCount: number;
  masteryPercentage: number;
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  order: number;
  description: string;
  topicIds: string[];
}

export interface Topic {
  id: string;
  unitId: string;
  courseId: string;
  title: string;
  description: string;
  masteryLevel: number; // 0 to 100
  confidenceScore: 'needs_work' | 'improving' | 'mastered';
  lastPracticedAt?: string;
  sourceDocCount: number;
  commonMisconceptions?: string[];
  keyFormulas?: string[];
}

export interface Assignment {
  id: string;
  courseId: string;
  unitId?: string;
  title: string;
  instructions: string;
  dueDate: string;
  dueTime?: string;
  status: 'upcoming' | 'due_today' | 'completed' | 'overdue';
  pointsTotal?: number;
  source: 'google_classroom' | 'manual_entry';
  attachmentCount: number;
  reviewedWithTutor: boolean;
}

export interface MaterialSource {
  id: string;
  title: string;
  pageNumber?: number;
  snippet?: string;
  confidence: number;
}

export interface Material {
  id: string;
  courseId: string;
  unitId?: string;
  topicIds: string[];
  title: string;
  fileType: 'pdf' | 'docx' | 'image' | 'notes' | 'slide' | 'link';
  sourceType: 'classroom_attachment' | 'student_upload' | 'pasted_text' | 'drive_import';
  uploadedAt: string;
  fileSizeBytes?: number;
  pageCount?: number;
  status: 'ready' | 'processing' | 'error';
  extractedText: string;
  extractedTopics: string[];
  summary: string;
  ocrConfidence?: number;
  isTeacherProvided: boolean;
  driveUrl?: string;
}

export interface StudyGuideSection {
  title: string;
  content: string;
  isAiExpanded: boolean;
  citations: MaterialSource[];
}

export interface WorkedExample {
  problem: string;
  steps: { stepNumber: number; description: string; ruleOrFormula?: string }[];
  solution: string;
  commonPitfall?: string;
  sourceCitation: string;
}

export interface StudyGuide {
  id: string;
  courseId: string;
  title: string;
  unitTitle: string;
  createdAt: string;
  difficulty: 'introductory' | 'standard' | 'advanced' | 'exam_prep';
  format: 'quick_review' | 'deep_dive' | 'formula_sheet' | 'practice_focused';
  assessmentDate?: string;
  learningObjectives: string[];
  vocabulary: { term: string; definition: string; source: string }[];
  sections: StudyGuideSection[];
  formulasAndRules: { name: string; formula: string; explanation: string; whenToUse: string }[];
  workedExamples: WorkedExample[];
  misconceptions: { misconception: string; correction: string; whyItMatters: string }[];
  checklist: { item: string; completed: boolean }[];
  verifiedAgainstMaterials: boolean;
}

export type TutorMode =
  | 'teach'
  | 'hint'
  | 'example'
  | 'test'
  | 'mistake'
  | 'review';

export interface TutorMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  mode?: TutorMode;
  citations?: MaterialSource[];
  suggestedPrompts?: string[];
  isSocraticQuestion?: boolean;
}

export interface TutorSession {
  id: string;
  courseId: string;
  topicId?: string;
  title: string;
  mode: TutorMode;
  messages: TutorMessage[];
  updatedAt: string;
}

export type QuestionType =
  | 'multiple_choice'
  | 'short_answer'
  | 'fill_in_blank'
  | 'matching'
  | 'application_problem';

export interface QuizQuestion {
  id: string;
  topicId: string;
  topicTitle: string;
  type: QuestionType;
  prompt: string;
  options?: string[]; // For multiple_choice
  correctAnswer: string;
  acceptableKeywords?: string[]; // For short_answer
  hints: string[];
  rubricCriteria?: string[];
  detailedExplanation: string;
  sourceCitation: string;
}

export interface StudentAnswer {
  questionId: string;
  submittedAnswer: string;
  isCorrect: boolean;
  earnedScore: number;
  maxScore: number;
  feedback: string;
  rubricNotes?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  topicIds: string[];
  difficulty: 'standard' | 'challenging' | 'comprehensive';
  questionCount: number;
  questions: QuizQuestion[];
  estimatedMinutes: number;
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  courseId: string;
  startedAt: string;
  completedAt: string;
  scorePercentage: number;
  answers: StudentAnswer[];
  topicBreakdown: {
    topicId: string;
    topicTitle: string;
    score: number;
    total: number;
    recommendation: string;
  }[];
}

export interface StudyPlanSession {
  id: string;
  date: string; // YYYY-MM-DD
  dayLabel: string;
  timeSlot: string;
  durationMinutes: number;
  courseId: string;
  courseName: string;
  courseColor: string;
  topicId: string;
  topicTitle: string;
  goal: string;
  activityType: 'read_guide' | 'socratic_tutor' | 'practice_quiz' | 'flashcards';
  status: 'completed' | 'scheduled' | 'skipped';
  urgency: 'high' | 'medium' | 'low';
  assessmentDateUpcoming?: string;
}

export interface UserSubscription {
  plan: 'free' | 'pro';
  billingInterval: 'monthly' | 'yearly';
  status: 'active' | 'trialing' | 'canceled';
  currentPeriodEnd: string;
  studyGuidesGeneratedThisMonth: number;
  studyGuidesLimit: number;
  quizGenerationsThisMonth: number;
  quizGenerationsLimit: number;
  fileUploadsMB: number;
  fileUploadsLimitMB: number;
}
