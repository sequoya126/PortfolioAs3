import { LEVELS, THEMES } from '../game/config.js'

function ConfigPanel({ selectedLevel, selectedTheme, onLevelChange, onThemeChange, onStart, theme }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        color: theme.text,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7 }}>
          Difficulty
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.entries(LEVELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => onLevelChange(key)}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: `1px solid ${selectedLevel === key ? theme.accent : theme.accent + '44'}`,
                background: selectedLevel === key ? theme.accent + '22' : 'transparent',
                color: selectedLevel === key ? theme.accent : theme.text,
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7 }}>
          Theme
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.entries(THEMES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => onThemeChange(key)}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: `1px solid ${selectedTheme === key ? theme.accent : theme.accent + '44'}`,
                background: selectedTheme === key ? theme.accent + '22' : 'transparent',
                color: selectedTheme === key ? theme.accent : theme.text,
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        style={{
          marginTop: '8px',
          padding: '12px 40px',
          borderRadius: '4px',
          border: `1px solid ${theme.accent}`,
          background: theme.accent + '22',
          color: theme.accent,
          cursor: 'pointer',
          fontSize: '15px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'all 0.2s ease',
        }}
      >
        Enter the Void
      </button>
    </div>
  )
}

export default ConfigPanel