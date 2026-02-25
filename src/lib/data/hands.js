export const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

// Returns the canonical hand name for a cell in the 13x13 matrix.
// Upper triangle (row < col) = suited, lower triangle (row > col) = offsuit, diagonal = pair.
export function getHandName(row, col) {
  if (row === col) return ranks[row] + ranks[row];
  if (row < col)  return ranks[row] + ranks[col] + 's';
  return ranks[col] + ranks[row] + 'o';
}

export const positionsByCount = {
  4: ['UTG', 'BTN', 'SB'],
  5: ['UTG', 'CO', 'BTN', 'SB'],
  6: ['UTG', 'HJ', 'CO', 'BTN', 'SB'],
  7: ['UTG', 'UTG+1', 'HJ', 'CO', 'BTN', 'SB'],
};
