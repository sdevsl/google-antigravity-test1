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
  UserSubscription
} from '../types/academic';

export const DEMO_COURSES: Course[] = [
  {
    id: 'course-ap-bio',
    name: 'AP Biology',
    code: 'BIO-201',
    subject: 'biology',
    teacherName: 'Dr. Aris Thorne',
    period: 'Period 2',
    room: 'Sci-304',
    color: '#059669', // Emerald
    accentColor: '#D1FAE5',
    description: 'College-level biology focusing on molecular biology, energetics, heredity, and evolutionary mechanisms.',
    googleClassroomId: 'gc-bio-9921',
    syncStatus: 'synced',
    lastSyncedAt: 'Today at 8:45 AM',
    unitCount: 4,
    assignmentCount: 3,
    materialCount: 14,
    masteryPercentage: 74,
  },
  {
    id: 'course-algebra-1',
    name: 'Honors Algebra & Quadratics',
    code: 'MATH-102',
    subject: 'math',
    teacherName: 'Marcus Vance',
    period: 'Period 4',
    room: 'Math-112',
    color: '#2563EB', // Blue
    accentColor: '#DBEAFE',
    description: 'Foundations of algebra, polynomial operations, quadratic equations, and coordinate graphing.',
    googleClassroomId: 'gc-math-4412',
    syncStatus: 'synced',
    lastSyncedAt: 'Yesterday at 3:15 PM',
    unitCount: 3,
    assignmentCount: 2,
    materialCount: 9,
    masteryPercentage: 88,
  },
  {
    id: 'course-us-history',
    name: 'AP United States History',
    code: 'HIST-301',
    subject: 'history',
    teacherName: 'Eleanor Vance-Greene',
    period: 'Period 6',
    room: 'Hum-201',
    color: '#D97706', // Amber
    accentColor: '#FEF3C7',
    description: 'Survey of American history from colonial period through modern reconstruction with DBQ analysis.',
    googleClassroomId: 'gc-hist-1109',
    syncStatus: 'synced',
    lastSyncedAt: '2 days ago',
    unitCount: 5,
    assignmentCount: 4,
    materialCount: 18,
    masteryPercentage: 65,
  }
];

export const DEMO_UNITS: Unit[] = [
  {
    id: 'unit-bio-energetics',
    courseId: 'course-ap-bio',
    title: 'Unit 3: Cellular Energetics & Enzyme Kinetics',
    order: 3,
    description: 'Enzyme catalysis, cellular respiration pathways, chemiosmosis, and photosynthesis light/dark reactions.',
    topicIds: ['topic-glycolysis', 'topic-krebs-cycle', 'topic-etc-chemiosmosis', 'topic-light-reactions', 'topic-calvin-cycle']
  },
  {
    id: 'unit-math-quadratics',
    courseId: 'course-algebra-1',
    title: 'Unit 4: Quadratic Functions & Complex Factoring',
    order: 4,
    description: 'Factoring trinomials, completing the square, the quadratic formula, and vertex form transformations.',
    topicIds: ['topic-factoring-trinomials', 'topic-quadratic-formula', 'topic-discriminant-roots']
  },
  {
    id: 'unit-hist-republic',
    courseId: 'course-us-history',
    title: 'Period 3: The Constitutional Convention & Early Republic',
    order: 3,
    description: 'Articles of Confederation weaknesses, Federalists vs Anti-Federalists, and the Bill of Rights compromises.',
    topicIds: ['topic-federalist-10', 'topic-great-compromise', 'topic-hamilton-financial']
  }
];

export const DEMO_TOPICS: Topic[] = [
  {
    id: 'topic-glycolysis',
    unitId: 'unit-bio-energetics',
    courseId: 'course-ap-bio',
    title: 'Glycolysis & Substrate-Level Phosphorylation',
    description: 'Anaerobic breakdown of glucose into 2 pyruvate molecules yielding net 2 ATP and 2 NADH.',
    masteryLevel: 85,
    confidenceScore: 'mastered',
    lastPracticedAt: 'Oct 23, 2026',
    sourceDocCount: 3,
    commonMisconceptions: ['Thinking glycolysis requires oxygen; it occurs identically in anaerobic conditions.'],
    keyFormulas: ['Glucose (C6H12O6) + 2 NAD+ + 2 ADP + 2 Pi → 2 Pyruvate + 2 NADH + 2 H+ + 2 ATP']
  },
  {
    id: 'topic-etc-chemiosmosis',
    unitId: 'unit-bio-energetics',
    courseId: 'course-ap-bio',
    title: 'Electron Transport Chain & ATP Synthase Proton Gradient',
    description: 'Oxidative phosphorylation across the inner mitochondrial cristae membrane driving ATP generation.',
    masteryLevel: 52,
    confidenceScore: 'needs_work',
    lastPracticedAt: 'Oct 24, 2026',
    sourceDocCount: 4,
    commonMisconceptions: [
      'Believing electrons pump protons directly rather than the energy from redox reactions powering proton translocators.',
      'Forgetting that oxygen is the final electron acceptor forming water.'
    ],
    keyFormulas: ['Theoretical yield: ~30-32 ATP per oxidized glucose molecule.']
  },
  {
    id: 'topic-calvin-cycle',
    unitId: 'unit-bio-energetics',
    courseId: 'course-ap-bio',
    title: 'The Calvin Cycle & RuBisCO Carbon Fixation',
    description: 'Light-independent carbon fixation in the stroma synthesizing G3P sugars using ATP and NADPH.',
    masteryLevel: 68,
    confidenceScore: 'improving',
    lastPracticedAt: 'Oct 22, 2026',
    sourceDocCount: 2,
    commonMisconceptions: ['Believing the Calvin Cycle only happens at night; it requires ATP and NADPH produced during daylight.'],
  },
  {
    id: 'topic-quadratic-formula',
    unitId: 'unit-math-quadratics',
    courseId: 'course-algebra-1',
    title: 'The Quadratic Formula & Discriminant Analysis',
    description: 'Algebraic method for calculating x-intercepts of any quadratic equation ax^2 + bx + c = 0.',
    masteryLevel: 94,
    confidenceScore: 'mastered',
    lastPracticedAt: 'Oct 24, 2026',
    sourceDocCount: 3,
    keyFormulas: ['x = (-b ± √(b² - 4ac)) / (2a)', 'Discriminant Δ = b² - 4ac (Δ > 0: 2 real roots, Δ = 0: 1 root, Δ < 0: 2 complex)']
  },
  {
    id: 'topic-federalist-10',
    unitId: 'unit-hist-republic',
    courseId: 'course-us-history',
    title: 'Federalist No. 10 & Factional Representation',
    description: 'James Madison argumentation that a large republic controls the violence and mischief of factions.',
    masteryLevel: 60,
    confidenceScore: 'needs_work',
    lastPracticedAt: 'Oct 21, 2026',
    sourceDocCount: 3,
    commonMisconceptions: ['Thinking Madison wanted to eliminate factions; he argued causes cannot be removed, only effects controlled.']
  }
];

export const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-bio-1',
    courseId: 'course-ap-bio',
    unitId: 'unit-bio-energetics',
    title: 'Lab Report: Mitochondrial Respiration Rate with DPIP Dye',
    instructions: 'Calculate respiration rate slopes from spectrophotometer absorbance data. Answer questions 1-8 regarding temperature denaturation.',
    dueDate: 'Tomorrow, Oct 26',
    dueTime: '11:59 PM',
    status: 'due_today',
    pointsTotal: 50,
    source: 'google_classroom',
    attachmentCount: 2,
    reviewedWithTutor: false
  },
  {
    id: 'asg-bio-2',
    courseId: 'course-ap-bio',
    unitId: 'unit-bio-energetics',
    title: 'Unit 3 FRQ Practice: Chemiosmosis & Uncoupling Proteins',
    instructions: 'Submit responses to the two Free Response Questions detailing how DNP disrupts ATP synthase proton gradient.',
    dueDate: 'Friday, Oct 30',
    dueTime: '8:00 AM',
    status: 'upcoming',
    pointsTotal: 30,
    source: 'google_classroom',
    attachmentCount: 1,
    reviewedWithTutor: true
  },
  {
    id: 'asg-math-1',
    courseId: 'course-algebra-1',
    unitId: 'unit-math-quadratics',
    title: 'Problem Set 7.4: Quadratic Projectile Motion Word Problems',
    instructions: 'Complete problems 14 through 28 on page 342. Show all work factoring and identifying maximum vertex height.',
    dueDate: 'Wednesday, Oct 28',
    dueTime: '3:00 PM',
    status: 'upcoming',
    pointsTotal: 25,
    source: 'google_classroom',
    attachmentCount: 1,
    reviewedWithTutor: false
  },
  {
    id: 'asg-hist-1',
    courseId: 'course-us-history',
    unitId: 'unit-hist-republic',
    title: 'DBQ Outline: Ratification Debates (Federalists vs Anti-Federalists)',
    instructions: 'Analyze Documents 1-6. Formulate a strong thesis with contextualization and at least two HIPP sourcing statements.',
    dueDate: 'Thursday, Oct 29',
    dueTime: '11:59 PM',
    status: 'upcoming',
    pointsTotal: 100,
    source: 'google_classroom',
    attachmentCount: 3,
    reviewedWithTutor: false
  }
];

export const DEMO_MATERIALS: Material[] = [
  {
    id: 'mat-bio-slides',
    courseId: 'course-ap-bio',
    unitId: 'unit-bio-energetics',
    topicIds: ['topic-etc-chemiosmosis', 'topic-glycolysis'],
    title: 'Class Presentation: Cellular Respiration & Chemiosmosis.pdf',
    fileType: 'pdf',
    sourceType: 'classroom_attachment',
    uploadedAt: 'Oct 20, 2026',
    fileSizeBytes: 4200000,
    pageCount: 28,
    status: 'ready',
    isTeacherProvided: true,
    driveUrl: 'https://classroom.google.com/c/demo-bio/materials/1',
    extractedTopics: ['Oxidative Phosphorylation', 'Complex I-IV', 'Proton Motive Force', 'ATP Yield'],
    summary: 'Teacher slide deck detailing inner mitochondrial membrane structure, electron transport complexes I through IV, and ATP synthase mechanical rotation.',
    extractedText: `Slide 14: The Electron Transport Chain (ETC). Located in the cristae of inner mitochondrial membrane. NADH enters at Complex I (NADH dehydrogenase), while FADH2 transfers electrons at Complex II (succinate dehydrogenase).
    Slide 16: Pumping of Protons. As high-energy electrons transfer down the electronegativity gradient to Oxygen (the terminal electron acceptor), free energy pumps H+ ions from the mitochondrial matrix into the intermembrane space.
    Slide 19: Chemiosmosis & ATP Synthase. Protons flow down their electrochemical gradient back into the matrix through ATP Synthase (F0-F1 complex), inducing rotational conformational change that condenses ADP + Pi into ATP. Peter Mitchell's Chemiosmotic Hypothesis (Nobel 1978).`
  },
  {
    id: 'mat-bio-notes',
    courseId: 'course-ap-bio',
    unitId: 'unit-bio-energetics',
    topicIds: ['topic-etc-chemiosmosis', 'topic-calvin-cycle'],
    title: 'Student Class Notes: Energy Coupling & Photosystems.docx',
    fileType: 'docx',
    sourceType: 'student_upload',
    uploadedAt: 'Oct 22, 2026',
    fileSizeBytes: 840000,
    pageCount: 4,
    status: 'ready',
    isTeacherProvided: false,
    extractedTopics: ['Photosystem II & I', 'Photolysis', 'Cyclic Electron Flow', 'Calvin Cycle'],
    summary: 'Typed student notes summarizing lecture highlights, questions to ask the teacher, and diagrams of Z-scheme photophosphorylation.',
    extractedText: `Important Note from Dr. Thorne: "Always remember that in chloroplasts, protons are pumped into the THYLAKOID LUMEN, creating an acidic interior (pH ~5). In mitochondria, protons are pumped into the INTERMEMBRANE SPACE."
    Key question for test: What happens if an uncoupler like DNP is present? The proton gradient dissipates as heat, so oxygen consumption continues but ATP production halts!`
  },
  {
    id: 'mat-bio-photo',
    courseId: 'course-ap-bio',
    unitId: 'unit-bio-energetics',
    topicIds: ['topic-calvin-cycle'],
    title: 'Whiteboard Screenshot: Calvin Cycle Stages & Carbon Accounting.image',
    fileType: 'image',
    sourceType: 'student_upload',
    uploadedAt: 'Oct 23, 2026',
    fileSizeBytes: 2100000,
    status: 'ready',
    ocrConfidence: 96,
    isTeacherProvided: false,
    extractedTopics: ['Carbon Fixation', 'Reduction Stage', 'Regeneration of RuBP'],
    summary: 'Photo of classroom whiteboard processed with OCR: step-by-step 3-CO2 to 1-G3P stoichiometry diagram.',
    extractedText: `[OCR Whiteboard Transcription]
    Phase 1: Carbon Fixation. 3 RuBP (5-carbon) + 3 CO2 catalyzed by RuBisCO -> 6 molecules of 3-PGA.
    Phase 2: Reduction. 6 ATP + 6 NADPH used -> 6 G3P. One G3P exits the cycle to build glucose/sucrose.
    Phase 3: Regeneration. Remaining 5 G3P (15 carbons total) rearranged using 3 ATP -> 3 RuBP regenerated.`
  },
  {
    id: 'mat-math-worksheet',
    courseId: 'course-algebra-1',
    unitId: 'unit-math-quadratics',
    topicIds: ['topic-quadratic-formula'],
    title: 'Teacher Worksheet: Quadratic Formula Derivation & Real-World Modeling.pdf',
    fileType: 'pdf',
    sourceType: 'classroom_attachment',
    uploadedAt: 'Oct 19, 2026',
    fileSizeBytes: 1800000,
    pageCount: 6,
    status: 'ready',
    isTeacherProvided: true,
    extractedTopics: ['Completing the Square', 'Quadratic Formula', 'Discriminant Cases'],
    summary: 'Rigorous derivation of the quadratic formula from ax^2 + bx + c = 0 by completing the square, plus projectile trajectories.',
    extractedText: `Standard Form: ax² + bx + c = 0 (where a ≠ 0).
    Step 1: Divide entire equation by a: x² + (b/a)x + c/a = 0.
    Step 2: Subtract c/a: x² + (b/a)x = -c/a.
    Step 3: Complete square: add (b/2a)² to both sides: (x + b/2a)² = (b² - 4ac)/(4a²).
    Step 4: Take square root and isolate x: x = (-b ± √(b² - 4ac)) / (2a).`
  }
];

export const DEMO_STUDY_GUIDE: StudyGuide = {
  id: 'guide-bio-energetics',
  courseId: 'course-ap-bio',
  title: 'Comprehensive Mastery Guide: Cellular Respiration & Chemiosmosis',
  unitTitle: 'Unit 3: Cellular Energetics',
  createdAt: 'Oct 24, 2026',
  difficulty: 'exam_prep',
  format: 'deep_dive',
  assessmentDate: 'Friday, Oct 30',
  verifiedAgainstMaterials: true,
  learningObjectives: [
    'Explain how organisms capture and store free energy for use in cellular processes.',
    'Trace electron flow and proton gradient formation across mitochondrial inner membranes.',
    'Differentiate between substrate-level phosphorylation and oxidative phosphorylation.',
    'Predict the cellular consequences of metabolic inhibitors (e.g., Cyanide, Rotenone, DNP).'
  ],
  vocabulary: [
    {
      term: 'Chemiosmosis',
      definition: 'The process in which energy stored in a hydrogen ion gradient across a membrane is used to drive cellular work such as the synthesis of ATP.',
      source: 'Class Presentation Slide 19'
    },
    {
      term: 'Proton Motive Force (PMF)',
      definition: 'The potential energy arising from the dual chemical gradient (pH difference) and electrical gradient (charge difference) across the inner mitochondrial membrane.',
      source: 'Student Class Notes p. 2'
    },
    {
      term: 'Substrate-Level Phosphorylation',
      definition: 'Direct enzymatic transfer of a phosphate group from a phosphorylated metabolic intermediate to ADP, occurring in glycolysis and the citric acid cycle.',
      source: 'Class Presentation Slide 8'
    },
    {
      term: 'Terminal Electron Acceptor',
      definition: 'Molecular oxygen (O2), which accepts low-energy electrons and free protons at Complex IV (cytochrome c oxidase) to produce water.',
      source: 'Class Presentation Slide 16'
    }
  ],
  sections: [
    {
      title: '1. Overview of Mitochondrial Compartmentalization',
      content: 'Mitochondria feature a double membrane essential for coupling. The outer membrane contains large porins, whereas the inner membrane is strictly impermeable to ions, maintaining the steep proton gradient necessary for chemiosmosis. The folded cristae exponentially expand available surface area for electron transport complexes.',
      isAiExpanded: false,
      citations: [{ id: 'mat-bio-slides', title: 'Cellular Respiration Slide 14', confidence: 0.98 }]
    },
    {
      title: '2. The Electron Transport Chain & Complex Energetics',
      content: 'High-energy electrons stripped from glucose intermediates are delivered via electron carriers: NADH transfers electrons to Complex I, while FADH2 transfers to Complex II. As electrons move through Coenzyme Q, Complex III, Cytochrome c, and Complex IV, free energy drops sequentially. Complexes I, III, and IV pump protons into the intermembrane space.',
      isAiExpanded: false,
      citations: [
        { id: 'mat-bio-slides', title: 'Cellular Respiration Slide 16', confidence: 0.95 },
        { id: 'mat-bio-notes', title: 'Student Class Notes p. 1', confidence: 0.92 }
      ]
    },
    {
      title: '3. ATP Synthase Mechanism & Chemiosmosis',
      content: 'ATP Synthase acts as a molecular rotor. Protons enter an inlet channel within the stator, bind to rotor subunits causing rotation, and exit via the matrix channel. This rotational mechanical work transmits torque to the catalytic head (F1), forcing conformational changes that forge ATP from ADP and inorganic phosphate.',
      isAiExpanded: true,
      citations: [{ id: 'mat-bio-slides', title: 'Cellular Respiration Slide 19', confidence: 0.96 }]
    }
  ],
  formulasAndRules: [
    {
      name: 'Net Aerobic Respiration Equation',
      formula: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ~30 to 32 ATP',
      explanation: 'Balanced biochemical equation for complete oxidation of one mole of glucose.',
      whenToUse: 'Use when calculating stoichiometry or explaining energy balance in AP Bio free-response questions.'
    },
    {
      name: 'Electron Carrier ATP Yield Equivalent',
      formula: '1 NADH ≈ 2.5 ATP  |  1 FADH₂ ≈ 1.5 ATP',
      explanation: 'NADH enters at Complex I (3 proton pumps), whereas FADH2 enters at Complex II (bypassing the first pump).',
      whenToUse: 'Use when auditing total ATP yields generated per glucose molecule across metabolic stages.'
    }
  ],
  workedExamples: [
    {
      problem: 'A researcher administers 2,4-Dinitrophenol (DNP), a chemical uncoupler that creates lipid-soluble pores in the inner mitochondrial membrane, to active cell culture. Predict the effect on (a) oxygen consumption rate, and (b) ATP production rate.',
      steps: [
        {
          stepNumber: 1,
          description: 'Identify the structural and biochemical target of the inhibitor from course materials.',
          ruleOrFormula: 'DNP dissipates the H+ electrochemical gradient without inhibiting ETC complexes.'
        },
        {
          stepNumber: 2,
          description: 'Determine electron transport and oxygen consumption behavior.',
          ruleOrFormula: 'The ETC continues unobstructed, striving to replenish the gradient. Therefore, oxygen consumption either continues normally or accelerates.'
        },
        {
          stepNumber: 3,
          description: 'Determine ATP Synthase phosphorylation behavior.',
          ruleOrFormula: 'Without a proton motive force across the cristae, ATP Synthase ceases rotational catalysis; ATP production plummets, releasing energy purely as metabolic heat.'
        }
      ],
      solution: 'Oxygen consumption remains high or increases as the cell burns fuel, but ATP synthesis ceases, releasing energy exclusively as heat (hyperthermia).',
      commonPitfall: 'Students frequently mistakenly claim that DNP stops oxygen consumption. Remember: oxygen is consumed by Complex IV, which continues running even when the gradient is uncoupled!',
      sourceCitation: 'Class Notes p. 2: Energy Coupling & Inhibitor Scenarios'
    }
  ],
  misconceptions: [
    {
      misconception: 'Oxygen creates ATP by combining directly with carbon atoms.',
      correction: 'Oxygen acts purely as the final electron and proton acceptor at Complex IV, forming neutral water (H2O). The CO2 breathed out originates from decarboxylation in pyruvate oxidation and the Krebs cycle.',
      whyItMatters: 'Essential for passing AP Free Response questions on respiration pathways.'
    },
    {
      misconception: 'Protons in chloroplasts and mitochondria are pumped in the same directional orientation.',
      correction: 'In mitochondria, protons are pumped OUT of the matrix into the intermembrane space. In chloroplasts, protons are pumped IN from the stroma into the thylakoid lumen.',
      whyItMatters: 'Top source of missed points on the AP Bio national exam.'
    }
  ],
  checklist: [
    { item: 'Can sketch inner mitochondrial membrane showing Complexes I-IV, CoQ, Cyt c, and ATP Synthase.', completed: true },
    { item: 'Can calculate net ATP yield from 1 glucose molecule, noting substrate vs oxidative phosphorylation.', completed: true },
    { item: 'Can explain why FADH2 yields less ATP than NADH.', completed: false },
    { item: 'Can predict cellular outcome if cyanide inhibits Cytochrome c Oxidase (Complex IV).', completed: false }
  ]
};

export const DEMO_QUIZ: Quiz = {
  id: 'quiz-bio-3',
  courseId: 'course-ap-bio',
  title: 'AP Biology Diagnostic: Cellular Energetics & Oxidative Phosphorylation',
  description: 'Rigorous assessment evaluating your understanding of mitochondrial respiration, proton gradients, and metabolic inhibitors based directly on Dr. Thorne’s slide deck and class notes.',
  topicIds: ['topic-etc-chemiosmosis', 'topic-glycolysis'],
  difficulty: 'challenging',
  questionCount: 4,
  estimatedMinutes: 8,
  createdAt: 'Oct 25, 2026',
  questions: [
    {
      id: 'q1',
      topicId: 'topic-etc-chemiosmosis',
      topicTitle: 'Electron Transport Chain & ATP Synthase',
      type: 'multiple_choice',
      prompt: 'During aerobic cellular respiration, which of the following directly provides the immediate driving energy source for ATP synthesis by ATP Synthase?',
      options: [
        'The transfer of phosphate groups directly from substrate intermediates in the matrix',
        'The flow of protons down their electrochemical gradient from the intermembrane space into the matrix',
        'The oxidation of glucose directly by molecular oxygen',
        'The covalent bonding of electrons to Cytochrome c'
      ],
      correctAnswer: 'The flow of protons down their electrochemical gradient from the intermembrane space into the matrix',
      hints: [
        'Remember Peter Mitchell’s chemiosmotic hypothesis: what mechanical rotor turns the enzyme?',
        'Think about where protons accumulated during the electron transport chain pumping.'
      ],
      rubricCriteria: [
        'Identifies the proton motive force (electrochemical gradient) as the driving energy mechanism',
        'Distinguishes chemiosmotic oxidative phosphorylation from substrate-level phosphorylation'
      ],
      detailedExplanation: 'ATP Synthase operates via chemiosmosis: protons stored in high concentration in the intermembrane space rush through the rotor channels into the matrix, providing the mechanical torque to phosphorylate ADP into ATP.',
      sourceCitation: 'Class Presentation: Cellular Respiration Slide 19 (Chemiosmosis & ATP Synthase)'
    },
    {
      id: 'q2',
      topicId: 'topic-etc-chemiosmosis',
      topicTitle: 'Metabolic Inhibitors & Coupling',
      type: 'short_answer',
      prompt: 'Rotenone is a pesticide that specifically blocks the transfer of electrons from Complex I to Ubiquinone (CoQ). Explain why cells treated with rotenone can still consume oxygen and generate some ATP if provided with succinate.',
      correctAnswer: 'Succinate donates electrons to Complex II (succinate dehydrogenase), bypassing Complex I and allowing electron flow and proton pumping at Complexes III and IV.',
      acceptableKeywords: ['Complex II', 'succinate dehydrogenase', 'bypass', 'FADH2', 'Complex III'],
      hints: [
        'Where in the electron transport chain does succinate donate its electrons?',
        'Does succinate feed into Complex I or a different downstream complex?'
      ],
      rubricCriteria: [
        'States that succinate oxidizes to fumarate via Complex II (succinate dehydrogenase)',
        'Notes that Complex II feeds electrons to CoQ, bypassing the blocked Complex I',
        'Explains that downstream complexes (III and IV) can still pump protons to power ATP synthase'
      ],
      detailedExplanation: 'Succinate is the substrate for Complex II (succinate dehydrogenase) in the citric acid cycle. It reduces FAD to FADH2, which delivers electrons directly to Ubiquinone (CoQ). Because Complex II operates independently of Complex I, the remaining chain complexes (III and IV) continue pumping protons and reducing oxygen.',
      sourceCitation: 'Class Presentation Slide 14 & Lab Handout Section 3'
    },
    {
      id: 'q3',
      topicId: 'topic-etc-chemiosmosis',
      topicTitle: 'Chloroplast vs Mitochondrial Proton Gradients',
      type: 'multiple_choice',
      prompt: 'In plant cells actively performing photosynthesis and respiration, which of the following compartments would exhibit the LOWEST (most acidic) pH under daylight conditions?',
      options: [
        'The mitochondrial matrix',
        'The chloroplast stroma',
        'The thylakoid lumen',
        'The cytoplasm'
      ],
      correctAnswer: 'The thylakoid lumen',
      hints: [
        'Lower pH means a higher concentration of hydrogen ions (H+).',
        'Recall Dr. Thorne’s tip regarding the direction protons are pumped during the light-dependent reactions.'
      ],
      rubricCriteria: [
        'Correctly connects low pH with high proton accumulation',
        'Recognizes that photosystem electron transport pumps protons inside the thylakoid lumen'
      ],
      detailedExplanation: 'In chloroplasts during the light reactions, protons are pumped from the stroma into the thylakoid lumen, reaching an acidic pH of ~4.5 to 5.0. In mitochondria, protons are pumped into the intermembrane space (pH ~7.0), keeping the matrix alkaline (~7.8).',
      sourceCitation: 'Student Class Notes p. 2 (Teacher Quote on Thylakoid Lumen pH)'
    },
    {
      id: 'q4',
      topicId: 'topic-glycolysis',
      topicTitle: 'Substrate vs Oxidative Phosphorylation',
      type: 'fill_in_blank',
      prompt: 'The direct enzymatic transfer of a phosphate group from a phosphorylated metabolic intermediate to ADP is known as ______ phosphorylation.',
      correctAnswer: 'substrate-level',
      acceptableKeywords: ['substrate level', 'substrate-level', 'substrate'],
      hints: [
        'Contrasts with oxidative phosphorylation which requires an electron transport chain and oxygen.'
      ],
      rubricCriteria: [
        'Identifies substrate-level phosphorylation'
      ],
      detailedExplanation: 'Substrate-level phosphorylation occurs in glycolysis (steps catalyzed by phosphoglycerate kinase and pyruvate kinase) and in the citric acid cycle (succinyl-CoA synthetase), without requiring a membrane gradient.',
      sourceCitation: 'Class Presentation Slide 8'
    }
  ]
};

export const DEMO_QUIZ_ATTEMPT: QuizAttempt = {
  id: 'attempt-demo-1',
  quizId: 'quiz-bio-3',
  courseId: 'course-ap-bio',
  startedAt: 'Today at 2:10 PM',
  completedAt: 'Today at 2:18 PM',
  scorePercentage: 75,
  answers: [
    {
      questionId: 'q1',
      submittedAnswer: 'The flow of protons down their electrochemical gradient from the intermembrane space into the matrix',
      isCorrect: true,
      earnedScore: 25,
      maxScore: 25,
      feedback: 'Excellent! You correctly identified the chemiosmotic proton motive force as the direct kinetic driver for ATP synthase rotation.'
    },
    {
      questionId: 'q2',
      submittedAnswer: 'Because succinate enters Complex II and bypasses the blocked Complex I, so Complexes III and IV can still pump protons.',
      isCorrect: true,
      earnedScore: 25,
      maxScore: 25,
      feedback: 'Outstanding reasoning! You specifically highlighted Complex II bypass, demonstrating deep structural understanding of the mitochondrial cristae chain.'
    },
    {
      questionId: 'q3',
      submittedAnswer: 'The chloroplast stroma',
      isCorrect: false,
      earnedScore: 0,
      maxScore: 25,
      feedback: 'Common misconception: the stroma is where protons are pumped AWAY from, making it alkaline (~pH 8). The acidic compartment (lowest pH) is the interior THYLAKOID LUMEN.'
    },
    {
      questionId: 'q4',
      submittedAnswer: 'substrate-level',
      isCorrect: true,
      earnedScore: 25,
      maxScore: 25,
      feedback: 'Exact match. Substrate-level phosphorylation accounts for all 4 gross ATP produced during glycolysis.'
    }
  ],
  topicBreakdown: [
    {
      topicId: 'topic-etc-chemiosmosis',
      topicTitle: 'Electron Transport Chain & ATP Synthase',
      score: 50,
      total: 75,
      recommendation: 'Review the comparative orientation of chloroplast vs mitochondrial proton pumps in Dr. Thorne’s slide 16.'
    },
    {
      topicId: 'topic-glycolysis',
      topicTitle: 'Glycolysis & Substrate-Level Phosphorylation',
      score: 25,
      total: 25,
      recommendation: 'Mastered! You have a solid grasp of anaerobic energy yields.'
    }
  ]
};

export const DEMO_STUDY_SESSIONS: StudyPlanSession[] = [
  {
    id: 'session-1',
    date: '2026-10-26',
    dayLabel: 'Monday',
    timeSlot: '4:30 PM - 5:15 PM',
    durationMinutes: 45,
    courseId: 'course-ap-bio',
    courseName: 'AP Biology',
    courseColor: '#059669',
    topicId: 'topic-etc-chemiosmosis',
    topicTitle: 'Chemiosmosis & Inhibitors Review',
    goal: 'Target the misconception on thylakoid vs mitochondrial pH before Friday test.',
    activityType: 'socratic_tutor',
    status: 'scheduled',
    urgency: 'high',
    assessmentDateUpcoming: 'Unit 3 Exam (Oct 30)'
  },
  {
    id: 'session-2',
    date: '2026-10-26',
    dayLabel: 'Monday',
    timeSlot: '7:00 PM - 7:35 PM',
    durationMinutes: 35,
    courseId: 'course-algebra-1',
    courseName: 'Honors Algebra',
    courseColor: '#2563EB',
    topicId: 'topic-quadratic-formula',
    topicTitle: 'Projectile Trajectory Factoring',
    goal: 'Complete Assignment 7.4 problem set questions 14-20.',
    activityType: 'practice_quiz',
    status: 'scheduled',
    urgency: 'medium'
  },
  {
    id: 'session-3',
    date: '2026-10-27',
    dayLabel: 'Tuesday',
    timeSlot: '5:00 PM - 5:45 PM',
    durationMinutes: 45,
    courseId: 'course-us-history',
    courseName: 'AP US History',
    courseColor: '#D97706',
    topicId: 'topic-federalist-10',
    topicTitle: 'Federalist No. 10 Argument Map',
    goal: 'Extract primary source quotes comparing Madison vs Brutus 1 for DBQ.',
    activityType: 'read_guide',
    status: 'scheduled',
    urgency: 'high',
    assessmentDateUpcoming: 'DBQ Outline Due (Oct 29)'
  },
  {
    id: 'session-4',
    date: '2026-10-28',
    dayLabel: 'Wednesday',
    timeSlot: '4:00 PM - 4:40 PM',
    durationMinutes: 40,
    courseId: 'course-ap-bio',
    courseName: 'AP Biology',
    courseColor: '#059669',
    topicId: 'topic-calvin-cycle',
    topicTitle: 'Calvin Cycle Carbon Accounting',
    goal: 'Verify RuBisCO stoichiometry and 3-PGA reduction calculations.',
    activityType: 'practice_quiz',
    status: 'scheduled',
    urgency: 'high'
  }
];

export const DEMO_SUBSCRIPTION: UserSubscription = {
  plan: 'free',
  billingInterval: 'monthly',
  status: 'active',
  currentPeriodEnd: 'Nov 25, 2026',
  studyGuidesGeneratedThisMonth: 2,
  studyGuidesLimit: 5,
  quizGenerationsThisMonth: 4,
  quizGenerationsLimit: 10,
  fileUploadsMB: 18.5,
  fileUploadsLimitMB: 50.0
};
