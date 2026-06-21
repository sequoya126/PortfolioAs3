import { useState, useEffect, useRef } from 'react'
import Grid from './components/Grid'
import HUD from './components/HUD'
import ConfigPanel from './components/ConfigPanel'
import { THEMES, DEFAULT_LEVEL, DEFAULT_THEME } from './game/config.js'
import { generatePattern, evaluateGuess, getLevelConfig, generateStars } from './game/logic.js'

function App() {
  const [screen, setScreen] = useState('splash')
  const [level, setLevel] = useState(DEFAULT_LEVEL)
  const [themeName, setThemeName] = useState(DEFAULT_THEME)
  const [phase, setPhase] = useState('study')
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)
  const [pattern, setPattern] = useState([])
  const [selected, setSelected] = useState([])
  const [revealed, setRevealed] = useState(false)
  const [timer, setTimer] = useState(0)
  const [stars] = useState(() => generateStars(120))
  const timerRef = useRef(null)

  const theme = THEMES[themeName]
  const config = getLevelConfig(level)

  function clearTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  function startRound(currentRound, currentLevel) {
    const cfg = getLevelConfig(currentLevel)
    const newPattern = generatePattern(currentLevel)
    setPattern(newPattern)
    setSelected([])
    setRevealed(false)
    setPhase('study')
    setTimer(cfg.showDuration)

    clearTimer()
    const interval = 100
    let remaining = cfg.showDuration

    timerRef.current = setInterval(() => {
      remaining -= interval
      setTimer(remaining)

      if (remaining <= 0) {
        clearTimer()
        setPhase('recall')
      }
    }, interval)
  }

  function startGame() {
    setRound(1)
    setScore(0)
    setScreen('game')
    startRound(1, level)
  }

  function handleTileClick(index) {
    if (phase !== 'recall') return
    setSelected(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  function submitGuess() {
    if (phase !== 'recall') return
    const result = evaluateGuess(pattern, selected)
    setScore(prev => prev + result.score)
    setRevealed(true)
    setPhase('reveal')

    setTimeout(() => {
      if (round >= config.rounds) {
        setPhase('gameover')
        setScreen('gameover')
      } else {
        setRound(prev => prev + 1)
        startRound(round + 1, level)
      }
    }, 2000)
  }

  function resetGame() {
    clearTimer()
    setScreen('splash')
    setRound(1)
    setScore(0)
    setPattern([])
    setSelected([])
    setRevealed(false)
    setPhase('study')
  }

  useEffect(() => {
    return () => clearTimer()
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: theme.text,
            opacity: star.opacity,
            pointerEvents: 'none',
          }}
        />
      ))}

      {screen === 'splash' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', color: theme.accent, letterSpacing: '0.2em', fontWeight: '500', marginBottom: '8px' }}>
              VOID GRID
            </h1>
            <p style={{ color: theme.text, opacity: 0.5, fontSize: '13px', letterSpacing: '0.15em' }}>
              A SPATIAL MEMORY CHALLENGE
            </p>
          </div>
          <ConfigPanel
            selectedLevel={level}
            selectedTheme={themeName}
            onLevelChange={setLevel}
            onThemeChange={setThemeName}
            onStart={startGame}
            theme={theme}
          />
        </div>
      )}

      {screen === 'game' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '560px', zIndex: 1 }}>
          <HUD
            round={round}
            totalRounds={config.rounds}
            score={score}
            timer={timer}
            phase={phase}
            theme={theme}
          />
          <Grid
            gridSize={config.gridSize}
            pattern={phase === 'study' || phase === 'reveal' ? pattern : []}
            selected={selected}
            revealed={revealed}
            phase ={phase}
            onTileClick={handleTileClick}
            theme={theme}
            disabled={phase !== 'recall'}
          />
          {phase === 'recall' && (
            <button
              onClick={submitGuess}
              style={{
                marginTop: '24px',
                padding: '10px 32px',
                borderRadius: '4px',
                border: `1px solid ${theme.accent}`,
                background: theme.accent + '22',
                color: theme.accent,
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Submit
            </button>
          )}
        </div>
      )}

      {screen === 'gameover' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', zIndex: 1 }}>
          <h2 style={{ color: theme.accent, fontSize: '32px', letterSpacing: '0.2em' }}>GAME OVER</h2>
          <p style={{ color: theme.text, fontSize: '18px' }}>Final Score: {score}</p>
          <button
            onClick={resetGame}
            style={{
              padding: '10px 32px',
              borderRadius: '4px',
              border: `1px solid ${theme.accent}`,
              background: theme.accent + '22',
              color: theme.accent,
              cursor: 'pointer',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Return to Menu
          </button>
        </div>
      )}
    </div>
  )
}

export default App