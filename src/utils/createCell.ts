export interface Cell {
  row: number;
  col: number;
  isBomb: boolean;
  isFlipped: boolean;
  value: number;
}

export function createCell(row: number, col: number): Cell {
  return {
    row,
    col,
    isBomb: false,
    isFlipped: false,
    value: 0,
  };
}
