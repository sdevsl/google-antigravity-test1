'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  Unit,
  Topic,
  Assignment,
  Material,
  StudyGuide,
  Quiz,
  QuizAttempt,
  StudyPlanSession,
  UserSubscription,
  TutorMessage,
  TutorMode
} from '../types/academic';
import {
  DEMO_COURSES,
  DEMO_UNITS,
  DEMO_TOPICS,
  DEMO_ASSIGNMENTS,
  DEMO_MATERIALS,
  DEMO_STUDY_GUIDE,
  DEMO_QUIZ,
  DEMO_QUIZ_ATTEMPT,
  DEMO_STUDY_SESSIONS,
  DEMO_SUBSCRIPTION
} from '../demo-data/mockData';
import { INITIAL_TUTOR_MESSAGES, generateSocraticResponse } from '../demo-data/tutorDialogue';

interface AcademicContextType {
  isDemoMode: boolean;
  toggleDemoMode: (val?: boolean) => void;
  courses: Course[];
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  selectedCourse: Course | undefined;
  units: Unit[];
  topics: Topic[];
  assignments: Assignment[];
  materials: Material[];
  studyGuides: StudyGuide[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  studySessions: StudyPlanSession[];
  subscription: UserSubscription;
  tutorMessages: TutorMessage[];
  tutorMode: TutorMode;
  setTutorMode: (mode: TutorMode) => void;
  sendTutorMessage: (messageText: string) => void;
  clearTutorHistory: () => void;
  addMaterial: (material: Omit<Material, 'id' | 'uploadedAt' | 'status'>) => void;
  deleteMaterial: (id: string) => void;
  generateStudyGuide: (params: { courseId: string; title: string; difficulty: string; format: string; assessmentDate?: string }) => StudyGuide;
  submitQuizAttempt: (quizId: string, answers: { questionId: string; answer: string }[]) => QuizAttempt;
  toggleSessionComplete: (sessionId: string) => void;
  syncGoogleClassroom: () => Promise<void>;
  disconnectGoogleClassroom: () => void;
  googleSyncing: boolean;
  upgradeSubscription: () => void;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export function AcademicProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>(DEMO_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-ap-bio');
  const [units, setUnits] = useState<Unit[]>(DEMO_UNITS);
  const [topics, setTopics] = useState<Topic[]>(DEMO_TOPICS);
  const [assignments, setAssignments] = useState<Assignment[]>(DEMO_ASSIGNMENTS);
  const [materials, setMaterials] = useState<Material[]>(DEMO_MATERIALS);
  const [studyGuides, setStudyGuides] = useState<StudyGuide[]>([DEMO_STUDY_GUIDE]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([DEMO_QUIZ]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([DEMO_QUIZ_ATTEMPT]);
  const [studySessions, setStudySessions] = useState<StudyPlanSession[]>(DEMO_STUDY_SESSIONS);
  const [subscription, setSubscription] = useState<UserSubscription>(DEMO_SUBSCRIPTION);
  const [tutorMessages, setTutorMessages] = useState<TutorMessage[]>(INITIAL_TUTOR_MESSAGES);
  const [tutorMode, setTutorMode] = useState<TutorMode>('teach');
  const [googleSyncing, setGoogleSyncing] = useState<boolean>(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const toggleDemoMode = (val?: boolean) => {
    setIsDemoMode((prev) => (val !== undefined ? val : !prev));
  };

  const addMaterial = (newMatData: Omit<Material, 'id' | 'uploadedAt' | 'status'>) => {
    const newMaterial: Material = {
      ...newMatData,
      id: `mat-user-${Date.now()}`,
      uploadedAt: 'Just now',
      status: 'ready'
    };
    setMaterials((prev) => [newMaterial, ...prev]);
    // increment course material count
    setCourses((prev) =>
      prev.map((c) => (c.id === newMatData.courseId ? { ...c, materialCount: c.materialCount + 1 } : c))
    );
  };

  const deleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const sendTutorMessage = (messageText: string) => {
    const userMsg: TutorMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTutorMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const response = generateSocraticResponse(messageText, tutorMode);
      const assistantMsg: TutorMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: response.mode,
        citations: response.citations,
        suggestedPrompts: response.suggestedPrompts,
        isSocraticQuestion: response.isSocraticQuestion
      };
      setTutorMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  const clearTutorHistory = () => {
    setTutorMessages(INITIAL_TUTOR_MESSAGES);
  };

  const generateStudyGuide = (params: {
    courseId: string;
    title: string;
    difficulty: string;
    format: string;
    assessmentDate?: string;
  }): StudyGuide => {
    const targetCourse = courses.find((c) => c.id === params.courseId) || selectedCourse;
    const newGuide: StudyGuide = {
      id: `guide-${Date.now()}`,
      courseId: params.courseId,
      title: params.title || `Mastery Guide: ${targetCourse?.name}`,
      unitTitle: 'Active Course Materials & High-Priority Objectives',
      createdAt: 'Just now',
      difficulty: params.difficulty as any,
      format: params.format as any,
      assessmentDate: params.assessmentDate || 'Upcoming Assessment',
      verifiedAgainstMaterials: true,
      learningObjectives: [
        `Understand core mechanisms and problem types in ${targetCourse?.name}.`,
        'Apply formal terminology and steps specified in teacher slides and lecture materials.',
        'Synthesize relationships between observed data and underlying scientific or mathematical principles.'
      ],
      vocabulary: [
        {
          term: 'Target Concept A',
          definition: 'Primary foundational mechanism extracted from the uploaded syllabus.',
          source: 'Teacher Handout Page 1'
        },
        {
          term: 'Governing Rule B',
          definition: 'Systematic constraint determining how problems in this domain are resolved.',
          source: 'Classroom Attached Notes'
        }
      ],
      sections: [
        {
          title: '1. Foundational Theory & Lecture Grounding',
          content: `This section synthesizes the verified teacher materials from ${targetCourse?.name}. It breaks the topic into sequential components, avoiding ungrounded assumptions.`,
          isAiExpanded: false,
          citations: [{ id: 'mat-bio-slides', title: `${targetCourse?.name} Ingested Unit File`, confidence: 0.96 }]
        },
        {
          title: '2. Deep Dive & Analytical Inferences',
          content: 'Here, the AI expands on the teacher definitions by linking them to standardized test expectations and high-frequency problem structures.',
          isAiExpanded: true,
          citations: [{ id: 'mat-bio-notes', title: 'Student Lab Notebook Reference', confidence: 0.92 }]
        }
      ],
      formulasAndRules: [
        {
          name: 'Primary Formulation',
          formula: 'Output = Function(Inputs, Constraints)',
          explanation: 'Governs transformation of variables across the syllabus.',
          whenToUse: 'Use when calculating exact quantities in homework problem sets.'
        }
      ],
      workedExamples: [
        {
          problem: 'Given an initial state with specified variables, determine the final outcome using teacher rubric rules.',
          steps: [
            { stepNumber: 1, description: 'Identify given parameters from the problem prompt.' },
            { stepNumber: 2, description: 'Apply the verified course rule to isolate the target variable.' },
            { stepNumber: 3, description: 'Check units and state final answer with reasoned justification.' }
          ],
          solution: 'The calculated equilibrium state matches the predicted outcome.',
          sourceCitation: 'Derived from Teacher Worksheet Section 2'
        }
      ],
      misconceptions: [
        {
          misconception: 'Assuming the general pattern applies without verifying boundary conditions.',
          correction: 'Always check teacher-specific exceptions noted in the lecture slides.',
          whyItMatters: 'Top differentiator between B-grade and A-grade exam responses.'
        }
      ],
      checklist: [
        { item: 'Review key vocabulary and define without looking.', completed: false },
        { item: 'Solve worked example independently.', completed: false },
        { item: 'Take targeted practice quiz on this unit.', completed: false }
      ]
    };

    setStudyGuides((prev) => [newGuide, ...prev]);
    setSubscription((prev) => ({
      ...prev,
      studyGuidesGeneratedThisMonth: prev.studyGuidesGeneratedThisMonth + 1
    }));
    return newGuide;
  };

  const submitQuizAttempt = (
    quizId: string,
    answers: { questionId: string; answer: string }[]
  ): QuizAttempt => {
    const targetQuiz = quizzes.find((q) => q.id === quizId) || quizzes[0];
    let correctCount = 0;

    const evaluatedAnswers = answers.map((userAns) => {
      const q = targetQuiz.questions.find((question) => question.id === userAns.questionId);
      if (!q) {
        return {
          questionId: userAns.questionId,
          submittedAnswer: userAns.answer,
          isCorrect: false,
          earnedScore: 0,
          maxScore: 25,
          feedback: 'Question reference not found.'
        };
      }

      let isCorrect = false;
      const cleanUser = userAns.answer.trim().toLowerCase();
      const cleanCorrect = q.correctAnswer.trim().toLowerCase();

      if (q.type === 'multiple_choice') {
        isCorrect = cleanUser === cleanCorrect;
      } else if (q.acceptableKeywords && q.acceptableKeywords.length > 0) {
        isCorrect = q.acceptableKeywords.some((kw) => cleanUser.includes(kw.toLowerCase()));
      } else {
        isCorrect = cleanUser.length > 5 && (cleanUser.includes(cleanCorrect) || cleanCorrect.includes(cleanUser));
      }

      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        submittedAnswer: userAns.answer,
        isCorrect,
        earnedScore: isCorrect ? 25 : 0,
        maxScore: 25,
        feedback: isCorrect
          ? `Great job! Your answer matches the teacher rubric.`
          : `Not quite. ${q.detailedExplanation}`
      };
    });

    const scorePercentage = Math.round((correctCount / targetQuiz.questions.length) * 100);

    const newAttempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId,
      courseId: targetQuiz.courseId,
      startedAt: 'Just now',
      completedAt: 'Just now',
      scorePercentage,
      answers: evaluatedAnswers,
      topicBreakdown: [
        {
          topicId: 'topic-evaluated',
          topicTitle: targetQuiz.title,
          score: scorePercentage,
          total: 100,
          recommendation:
            scorePercentage >= 80
              ? 'Excellent mastery! Ready for the test.'
              : 'Review key misconceptions in your study guide before retaking.'
        }
      ]
    };

    setQuizAttempts((prev) => [newAttempt, ...prev]);
    return newAttempt;
  };

  const toggleSessionComplete = (sessionId: string) => {
    setStudySessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: s.status === 'completed' ? 'scheduled' : 'completed' } : s))
    );
  };

  const syncGoogleClassroom = async () => {
    setGoogleSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCourses((prev) =>
      prev.map((c) => ({
        ...c,
        syncStatus: 'synced',
        lastSyncedAt: 'Just now'
      }))
    );
    setGoogleSyncing(false);
  };

  const disconnectGoogleClassroom = () => {
    setCourses((prev) =>
      prev.map((c) => ({
        ...c,
        syncStatus: 'disconnected',
        lastSyncedAt: undefined
      }))
    );
  };

  const upgradeSubscription = () => {
    setSubscription((prev) => ({
      ...prev,
      plan: 'pro',
      studyGuidesLimit: 50,
      quizGenerationsLimit: 100,
      fileUploadsLimitMB: 500
    }));
  };

  return (
    <AcademicContext.Provider
      value={{
        isDemoMode,
        toggleDemoMode,
        courses,
        selectedCourseId,
        setSelectedCourseId,
        selectedCourse,
        units,
        topics,
        assignments,
        materials,
        studyGuides,
        quizzes,
        quizAttempts,
        studySessions,
        subscription,
        tutorMessages,
        tutorMode,
        setTutorMode,
        sendTutorMessage,
        clearTutorHistory,
        addMaterial,
        deleteMaterial,
        generateStudyGuide,
        submitQuizAttempt,
        toggleSessionComplete,
        syncGoogleClassroom,
        disconnectGoogleClassroom,
        googleSyncing,
        upgradeSubscription
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
}
