import Tile from './Tile'

function Grid({ gridSize, pattern, selected, revealed, phase, onTileClick, theme, disabled }) {
  const total = gridSize * gridSize

  function getTileState(index) {
    const isActive = pattern.includes(index) && phase === 'study'
    const isSelected = selected.includes(index)
    const isCorrect = revealed && pattern.includes(index) && selected.includes(index)
    const isMissed = revealed && pattern.includes(index) && !selected.includes(index)
    const isWrong = revealed && !pattern.includes(index) && selected.includes(index)

  return { isActive, isSelected, isCorrect, isMissed, isWrong }
}

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '6px',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      {Array.from({ length: total }, (_, i) => {
        const state = getTileState(i)
        return (
          <Tile
            key={i}
            index={i}
            theme={theme}
            disabled={disabled}
            onClick={onTileClick}
            {...state}
          />
        )
      })}
    </div>
  )
}

export default Grid