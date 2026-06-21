export const LEVELS = {
  easy: {
    label: 'Novice',
    gridSize: 4,
    tileCount: 3,
    showDuration: 3000,
    rounds: 5,
  },
  medium: {
    label: 'Warrior',
    gridSize: 6,
    tileCount: 6,
    showDuration: 2000,
    rounds: 7,
  },
  hard: {
    label: 'Void Walker',
    gridSize: 8,
    tileCount: 10,
    showDuration: 1500,
    rounds: 10,
  },
}

export const THEMES = {
  void: {
    label: 'Deep Void',
    background: '#0a0a0f',
    tile: '#1a1a2e',
    tileActive: '#7b2fff',
    tileMissed: '#ffbb55',
    tileCorrect: '#00ff88',
    tileWrong: '#ff3355',
    accent: '#7b2fff',
    text: '#e0e0ff',
  },
  dungeon: {
    label: 'Dungeon',
    background: '#0f0a00',
    tile: '#1a1200',
    tileActive: '#ff9500',
    tileMissed: '#ffbb55',
    tileCorrect: '#00ff88',
    tileWrong: '#ff3355',
    accent: '#ff9500',
    text: '#ffe8c0',
  },
}

export const DEFAULT_LEVEL = 'easy'
export const DEFAULT_THEME = 'void'