import { TutorMessage, TutorMode } from '../types/academic';

export const INITIAL_TUTOR_MESSAGES: TutorMessage[] = [
  {
    id: 'tutor-init-1',
    role: 'assistant',
    content: `Hello! I'm your **StudyPilot Tutor**. I have full context from Dr. Thorne's AP Biology materials, including your **Cellular Respiration slides**, **Student Lab notes**, and **Unit 3 Problem Sets**.\n\nI see you recently scored **75%** on the Oxidative Phosphorylation diagnostic, with your main learning gap around **proton gradient orientation in chloroplasts vs mitochondria**.\n\nHow would you like to tackle this today? Select a mode below or ask any question!`,
    timestamp: '2:30 PM',
    mode: 'teach',
    citations: [
      { id: 'mat-bio-slides', title: 'Cellular Respiration Slide 16', confidence: 0.98 },
      { id: 'mat-bio-notes', title: 'Class Notes p. 2 (Teacher Quote)', confidence: 0.95 }
    ],
    suggestedPrompts: [
      'Why is the thylakoid lumen more acidic than the mitochondrial intermembrane space?',
      'Walk me through what happens when DNP uncouples the proton gradient.',
      'Test my understanding of Complex I vs Complex II electron entry.',
      'Give me a hint for Question 2 on our DPIP Lab Report.'
    ]
  }
];

export interface SimulatedTutorResponse {
  content: string;
  citations?: { id: string; title: string; confidence: number }[];
  suggestedPrompts: string[];
  mode: TutorMode;
  isSocraticQuestion?: boolean;
}

export function generateSocraticResponse(userQuery: string, currentMode: TutorMode): SimulatedTutorResponse {
  const queryLower = userQuery.toLowerCase();

  if (queryLower.includes('dnp') || queryLower.includes('uncoupl')) {
    return {
      mode: 'example',
      content: `Let's break down **DNP (2,4-Dinitrophenol)** using the diagram on **Slide 19 of Dr. Thorne's deck**.\n\nImagine the inner mitochondrial membrane is a hydroelectric dam. Under normal conditions, water (protons) can ONLY escape through the turbine (**ATP Synthase**), generating electricity (ATP).\n\n**DNP acts like drilling hundreds of small leaks directly through the concrete wall of the dam.**\n\n1. Protons leak through DNP channels freely from the intermembrane space back into the matrix.\n2. The proton gradient disappears without turning the ATP Synthase rotor.\n3. The Electron Transport Chain (Complexes I-IV) actually runs **faster**, frantically trying to restore the gradient.\n\n**Socratic Check for You:** Because the ETC is running at maximum speed while ATP synthesis is blocked, what happens to the energy stored in the electrons? Where does that energy go?`,
      citations: [
        { id: 'mat-bio-slides', title: 'Cellular Respiration Slide 19', confidence: 0.96 },
        { id: 'mat-bio-notes', title: 'Class Notes p. 2: Energy Coupling & Inhibitor Scenarios', confidence: 0.94 }
      ],
      isSocraticQuestion: true,
      suggestedPrompts: [
        'It gets released as metabolic heat (hyperthermia)',
        'It is trapped in Cytochrome c',
        'It converts into glucose through reverse glycolysis'
      ]
    };
  }

  if (queryLower.includes('heat') || queryLower.includes('hyperthermia')) {
    return {
      mode: 'review',
      content: `**Spot on! Exactly right.** The energy that normally would form the high-energy phosphoanhydride bonds of ATP is instead dissipated entirely as **unregulated metabolic heat**.\n\nIn fact, this is why DNP was dangerously used as a lethal weight-loss drug in the 1930s—patients literally burned fuel without making ATP, suffering fatal fever (hyperthermia).\n\nIn nature, hibernating bears and human infants use a regulated version of this called **Thermogenin (UCP-1)** in brown adipose tissue to keep warm!\n\n*(Verified directly against Dr. Thorne's lecture notes, Unit 3 p. 4)*.`,
      citations: [
        { id: 'mat-bio-notes', title: 'Class Notes p. 4: Brown Adipose & Thermogenin', confidence: 0.99 }
      ],
      suggestedPrompts: [
        'How does Cyanide compare to DNP?',
        'Test me on Photosystem II vs Photosystem I next.',
        'Show me the key formula for ATP yield calculations.'
      ]
    };
  }

  if (queryLower.includes('hint') || currentMode === 'hint') {
    return {
      mode: 'hint',
      content: `Here is a hint grounded in **Lab Handout DPIP Respiration**:\n\nRemember what DPIP measures in your spectrophotometer: as electrons are transferred, oxidized blue DPIP accepts electrons and reduces into **clear, colorless DPIPH2**.\n\nIf a tube is boiled (denaturing enzymes), what happens to the absorbance slope over time? Think about what heat does to the tertiary structure of dehydrogenase enzymes.`,
      citations: [
        { id: 'mat-bio-notes', title: 'Lab Handout: Spectrophotometer DPIP Assay', confidence: 0.95 }
      ],
      suggestedPrompts: [
        'The slope remains flat because denatured enzymes cannot transfer electrons.',
        'The absorbance drops twice as fast.',
        'Give me another hint about temperature limits.'
      ]
    };
  }

  if (queryLower.includes('ph') || queryLower.includes('lumen') || queryLower.includes('chloroplast') || queryLower.includes('acid')) {
    return {
      mode: 'teach',
      content: `Here is the key distinction that caused the missed question on your practice diagnostic:\n\n**1. In Mitochondria:**\n- Protons are pumped **OUT** of the matrix **INTO** the intermembrane space.\n- The intermembrane space is slightly acidic (~pH 7.0), but the matrix is alkaline (~pH 7.8).\n\n**2. In Chloroplasts (Light Reactions):**\n- Protons are pumped from the stroma **INTO the tiny enclosed thylakoid lumen**.\n- Because the lumen has a tiny volume and high proton concentration, its pH drops dramatically to **~pH 4.5 - 5.0** (very acidic!).\n\nDr. Thorne's golden rule: **"The thylakoid lumen is an acidic proton reservoir under daylight; the stroma is alkaline."**`,
      citations: [
        { id: 'mat-bio-notes', title: 'Class Notes p. 2 (Teacher Quote on Thylakoid Lumen)', confidence: 0.99 },
        { id: 'mat-bio-slides', title: 'Cellular Respiration Slide 16', confidence: 0.91 }
      ],
      suggestedPrompts: [
        'Now test my understanding on this comparison!',
        'What pumps protons into the thylakoid lumen?',
        'Review the Calvin Cycle next.'
      ]
    };
  }

  if (queryLower.includes('test') || currentMode === 'test') {
    return {
      mode: 'test',
      content: `**Understanding Check (AP Biology Level):**\n\nCyanide binds with high affinity to the heme iron in **Cytochrome c Oxidase (Complex IV)**, completely blocking electron transfer to Oxygen.\n\nWhich of the following will occur first in a cyanide-poisoned cell?\n\n**A)** ATP synthesis increases due to accumulation of NADH.\n**B)** Cytochrome c and Complex III remain in a permanently reduced state as electrons back up.\n**C)** The proton gradient across the inner membrane steepens.\n**D)** Oxygen consumption accelerates.`,
      citations: [
        { id: 'mat-bio-slides', title: 'Cellular Respiration Slide 16 & 18', confidence: 0.97 }
      ],
      isSocraticQuestion: true,
      suggestedPrompts: [
        'B) Cytochrome c and Complex III remain permanently reduced as electrons back up.',
        'A) ATP synthesis increases.',
        'C) The proton gradient steepens.',
        'D) Oxygen consumption accelerates.'
      ]
    };
  }

  // Default intelligent response grounded in course materials
  return {
    mode: currentMode,
    content: `Based on your course materials for **Unit 3 (Cellular Energetics)**, here is what you need to master for your upcoming exam:\n\n1. **Electron Carrier Entry Points:** NADH enters at Complex I (yielding ~2.5 ATP), whereas FADH2 enters at Complex II (yielding ~1.5 ATP).\n2. **The Terminal Electron Acceptor:** Oxygen (O2) binds 4 electrons and 4 protons at Complex IV to produce 2 molecules of water.\n3. **Chemiosmotic Coupling:** The proton gradient created by electron transport drives the physical rotation of the ATP Synthase rotor.\n\nWould you like me to walk through a practice calculation, test your recall with a quiz question, or give you a hint on your upcoming lab report?`,
    citations: [
      { id: 'mat-bio-slides', title: 'Cellular Respiration Slides 14-19', confidence: 0.95 }
    ],
    suggestedPrompts: [
      'Why does FADH2 yield fewer ATP than NADH?',
      'Walk me through the Calvin Cycle RuBisCO reaction.',
      'Show me how to factor quadratic projectile equations in Algebra.'
    ]
  };
}
