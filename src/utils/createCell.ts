// definisanje tipa Celije
export interface Cell {
  row: number;
  col: number;
  isBomb: boolean;
  isFlipped: boolean;
  value: number;
}
// funkcija koja vraca kolonu i red celije i osobine celije
export function createCell(row: number, col: number): Cell {
  return {
    row,
    col,
    isBomb: false,
    isFlipped: false,
    value: 0,
  };
}
