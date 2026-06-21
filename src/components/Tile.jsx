function Tile({ index, isActive, isSelected, isCorrect,isMissed, isWrong, onClick, theme, disabled }) {
  function getColor() {
    if (isCorrect) return theme.tileCorrect
    if (isWrong) return theme.tileWrong
    if (isMissed) return theme.tileMissed
    if (isActive) return theme.tileActive
    if (isSelected) return theme.accent
    return theme.tile
  }

  return (
    <div
      onClick={() => !disabled && onClick(index)}
      style={{
        backgroundColor: getColor(),
        border: `1px solid ${theme.accent}22`,
        borderRadius: '4px',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'background-color 0.2s ease, transform 0.1s ease',
        transform: isSelected && !disabled ? 'scale(0.95)' : 'scale(1)',
        aspectRatio: '1',
        boxShadow: isActive ? `0 0 12px ${theme.tileActive}88` : 'none',
      }}
    />
  )
}

export default Tile