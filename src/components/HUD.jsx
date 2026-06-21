function HUD({ round, totalRounds, score, timer, phase, theme }) {
  function getPhaseLabel() {
    /* Phase names - insturction for user */
    if (phase === 'study') return 'Memorize the pattern'
    if (phase === 'recall') return 'Select the tiles'
    if (phase === 'reveal') return 'Revealing...'
    if (phase === 'gameover') return 'Game Over'
    if (phase === 'complete') return 'Victory'
    return ''
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px',
        color: theme.text,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '32px',
          fontSize: '14px',
          opacity: 0.8,
        }}
      >
        <span>Round {round} / {totalRounds}</span>
        <span>Score {score}</span>
      </div>

      <div
        style={{
          fontSize: '13px',
          color: theme.accent,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {getPhaseLabel()}
      </div>

      {phase === 'study' && (
        <div
          style={{
            fontSize: '28px',
            fontWeight: '500',
            color: theme.tileActive,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {(timer / 1000).toFixed(1)}s
        </div>
      )}
    </div>
  )
}

export default HUD