import { LEVELS } from './config.js'

export function generatePattern(level) {
  const { gridSize, tileCount } = LEVELS[level]
  const total = gridSize * gridSize
  const indices = []

  while (indices.length < tileCount) {
    const rand = Math.floor(Math.random() * total)
    if (!indices.includes(rand)) indices.push(rand)
  }

  return indices
}

export function evaluateGuess(pattern, selected) {
  const correct = selected.filter(i => pattern.includes(i))
  const wrong = selected.filter(i => !pattern.includes(i))
  const missed = pattern.filter(i => !selected.includes(i))

  return {
    correct: correct.length,
    wrong: wrong.length,
    missed: missed.length,
    total: pattern.length,
    score: Math.max(0, correct.length - wrong.length),
    perfect: wrong.length === 0 && missed.length === 0,
  }
}

export function getLevelConfig(level) {
  return LEVELS[level]
}

export function generateStars(count = 100) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
  }))
}