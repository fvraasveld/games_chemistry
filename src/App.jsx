import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import Earth3D from './components/Earth3D';
import { LavaParticles, WaterEffect, ThunderEffect } from './components/ParticleEffects';
import Creature3D, { FlyingCreature } from './components/Creature3D';
import { QUIZ_QUESTIONS } from './data/questions';
import './styles.css';

export default function App() {
  const [era, setEra] = useState('hadean');
  const [age, setAge] = useState(4600);
  const [elements, setElements] = useState({ H: 20, O: 10, C: 5, N: 5, Ca: 0, P: 0 });
  const [creatures, setCreatures] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameLog, setGameLog] = useState(['🌍 Earth forms from cosmic dust...']);

  const eras = ['hadean', 'archean', 'proterozoic', 'cambrian', 'carboniferous', 'mesozoic', 'cenozoic'];

  const addLog = (msg) => setGameLog(prev => [msg, ...prev].slice(0, 5));

  const startQuiz = () => {
    const questions = QUIZ_QUESTIONS[era];
    if (questions && questions.length > 0) {
      setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
      setShowQuiz(true);
    }
  };

  const answerQuestion = (answerIndex) => {
    if (!currentQuestion) return;
    
    const correct = answerIndex === currentQuestion.correct;
    
    if (correct) {
      setScore(score + 100);
      addLog(`✅ Correct! ${currentQuestion.explanation}`);
      
      // Award rewards
      if (currentQuestion.reward.element) {
        setElements(prev => ({
          ...prev,
          [currentQuestion.reward.element]: 
            (prev[currentQuestion.reward.element] || 0) + currentQuestion.reward.amount
        }));
        addLog(`+${currentQuestion.reward.amount} ${currentQuestion.reward.element}!`);
      }
      
      if (currentQuestion.reward.creature) {
        const newCreature = {
          type: currentQuestion.reward.creature,
          position: [
            (Math.random() - 0.5) * 6,
            Math.random() * 3,
            (Math.random() - 0.5) * 6
          ]
        };
        setCreatures(prev => [...prev, newCreature]);
        addLog(`🦖 ${currentQuestion.reward.creature} discovered!`);
      }
    } else {
      addLog(`❌ Wrong! ${currentQuestion.explanation}`);
    }
    
    setShowQuiz(false);
    setCurrentQuestion(null);
  };

  const advanceEra = () => {
    const currentIndex = eras.indexOf(era);
    if (currentIndex < eras.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setEra(eras[currentIndex + 1]);
        setAge(age - 500);
        addLog(`🎉 ENTERED ${eras[currentIndex + 1].toUpperCase()} ERA!`);
        setTransitioning(false);
      }, 1000);
    }
  };

  return (
    <div className="game-container">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6600" />
          
          {/* Environment */}
          <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
          <Environment preset="night" />
          
          {/* Earth */}
          <Earth3D era={era} transitioning={transitioning} />
          
          {/* Era-specific effects */}
          {(era === 'hadean' || era === 'archean') && <LavaParticles count={1000} />}
          {(era === 'proterozoic' || era === 'cambrian') && <WaterEffect enabled />}
          
          {/* Creatures */}
          {creatures.map((creature, i) => (
            <Creature3D
              key={i}
              type={creature.type}
              position={creature.position}
            />
          ))}
          
          {/* Flying creatures */}
          {era === 'carboniferous' && (
            <>
              <FlyingCreature type="meganeura" />
              <FlyingCreature type="meganeura" />
            </>
          )}
          {era === 'mesozoic' && (
            <>
              <FlyingCreature type="pteranodon" />
              <FlyingCreature type="pteranodon" />
            </>
          )}
          
          <OrbitControls makeDefault maxDistance={15} minDistance={5} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="ui-overlay">
        {/* Header */}
        <div className="header">
          <h1>🌍 ChemWorld: Evolution</h1>
          <div className="era-display">
            <h2>{era.toUpperCase()}</h2>
            <p>{age} Million Years Ago</p>
            <p className="score">Score: {score}</p>
          </div>
        </div>

        {/* Elements Display */}
        <div className="elements-panel">
          <h3>⚛️ Elements</h3>
          <div className="elements-grid">
            {Object.entries(elements).map(([elem, count]) => (
              <div key={elem} className="element-box">
                <span className="elem-symbol">{elem}</span>
                <span className="elem-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Creatures Panel */}
        <div className="creatures-panel">
          <h3>🦕 Creatures ({creatures.length})</h3>
          <div className="creatures-list">
            {creatures.slice(-5).map((c, i) => (
              <div key={i} className="creature-badge">
                {c.type}
              </div>
            ))}
          </div>
        </div>

        {/* Game Log */}
        <div className="game-log">
          {gameLog.map((log, i) => (
            <div key={i} className="log-entry">{log}</div>
          ))}
        </div>

        {/* Controls */}
        <div className="controls">
          <button className="btn-quiz" onClick={startQuiz}>
            🧪 Answer Quiz → Get Elements!
          </button>
          <button className="btn-advance" onClick={advanceEra}>
            ⏭️ Next Era
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && currentQuestion && (
        <div className="quiz-modal">
          <div className="quiz-content">
            <h2>🧪 Chemistry Challenge</h2>
            <p className="question">{currentQuestion.question}</p>
            <div className="answers">
              {currentQuestion.answers.map((answer, i) => (
                <button
                  key={i}
                  className="answer-btn"
                  onClick={() => answerQuestion(i)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
