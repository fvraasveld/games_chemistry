export const QUIZ_QUESTIONS = {
  hadean: [
    {
      id: 'h1',
      question: 'What made up 85% of the early atmosphere?',
      answers: ['Hydrogen (H₂)', 'Oxygen (O₂)', 'Nitrogen (N₂)', 'Carbon Dioxide (CO₂)'],
      correct: 0,
      reward: { element: 'H', amount: 50 },
      explanation: 'Early Earth had mostly hydrogen and helium from the solar nebula!'
    },
    {
      id: 'h2',
      question: 'What temperature was the Hadean Earth?',
      answers: ['20°C', '500°C', '1200°C', '5000°C'],
      correct: 2,
      reward: { element: 'O', amount: 30 },
      explanation: 'Earth was a molten hellscape at ~1200°C!'
    }
  ],
  archean: [
    {
      id: 'a1',
      question: 'What did cyanobacteria produce that changed Earth forever?',
      answers: ['Methane', 'Oxygen', 'Nitrogen', 'Sulfur'],
      correct: 1,
      reward: { element: 'O', amount: 100 },
      explanation: 'The Great Oxygenation Event! Cyanobacteria made oxygen through photosynthesis.'
    },
    {
      id: 'a2',
      question: 'When did first life appear?',
      answers: ['4.6 Ga', '3.5 Ga', '2.5 Ga', '541 Ma'],
      correct: 1,
      reward: { element: 'C', amount: 50 },
      explanation: 'First evidence of life is ~3.5 billion years ago!'
    }
  ],
  cambrian: [
    {
      id: 'c1',
      question: 'What was the first animal with EYES?',
      answers: ['Anomalocaris', 'Trilobite', 'Hallucigenia', 'Dickinsonia'],
      correct: 1,
      reward: { element: 'Ca', amount: 50 },
      explanation: 'Trilobites had compound eyes - first in the animal kingdom!'
    },
    {
      id: 'c2',
      question: 'Build the formula for calcium carbonate (shells/coral):',
      buildMolecule: true,
      correctFormula: ['Ca', 'C', 'O', 'O', 'O'],
      reward: { element: 'Ca', amount: 100 },
      explanation: 'CaCO₃ - the building block of shells, coral, and limestone!'
    }
  ],
  carboniferous: [
    {
      id: 'carb1',
      question: 'What was oxygen level during the Carboniferous?',
      answers: ['21%', '25%', '35%', '50%'],
      correct: 2,
      reward: { element: 'O', amount: 150 },
      explanation: '35% oxygen! This allowed giant insects like Meganeura to exist!'
    },
    {
      id: 'carb2',
      question: 'How big was Meganeura\'s wingspan?',
      answers: ['10cm', '30cm', '75cm', '2 meters'],
      correct: 2,
      reward: { creature: 'meganeura' },
      explanation: '75cm wingspan - the largest insect ever! Size of a hawk!'
    }
  ],
  mesozoic: [
    {
      id: 'm1',
      question: 'What killed the dinosaurs 66 million years ago?',
      answers: ['Volcano', 'Ice Age', 'Asteroid', 'Disease'],
      correct: 2,
      reward: { element: 'P', amount: 100 },
      explanation: 'The Chicxulub asteroid - 10km wide, ended the dinosaurs!'
    },
    {
      id: 'm2',
      question: 'Build a simple protein (amino acid):',
      buildMolecule: true,
      correctFormula: ['C', 'C', 'N', 'O', 'O'],
      reward: { creature: 'trex' },
      explanation: 'Proteins are made of amino acids - the building blocks of life!'
    }
  ]
};

export const MOLECULE_TEMPLATES = {
  H2: { formula: ['H', 'H'], name: 'Hydrogen Gas' },
  O2: { formula: ['O', 'O'], name: 'Oxygen Gas' },
  H2O: { formula: ['H', 'H', 'O'], name: 'Water' },
  CO2: { formula: ['C', 'O', 'O'], name: 'Carbon Dioxide' },
  CH4: { formula: ['C', 'H', 'H', 'H', 'H'], name: 'Methane' },
  CaCO3: { formula: ['Ca', 'C', 'O', 'O', 'O'], name: 'Calcium Carbonate' },
  glucose: { formula: ['C', 'C', 'C', 'C', 'C', 'C', 'O', 'O', 'O', 'O', 'O', 'O'], name: 'Glucose (simple)' },
  protein: { formula: ['C', 'C', 'N', 'O', 'O'], name: 'Amino Acid' }
};
