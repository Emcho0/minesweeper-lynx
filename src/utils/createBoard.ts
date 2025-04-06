import { type Cell, createCell } from "./createCell.js";

export function createBoard(
  width: number,
  height: number,
  bombs: number,
): Cell[][] {
  // Kreirati igracu plocu sa zadatim sirinom i visinom
  const matrix: Cell[][] = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => createCell(row, col)),
  );
  insertBombs(matrix, bombs);
  increaseNums(matrix);
  return matrix;
}

function increaseNums(matrix: Cell[][]): void {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].isBomb) {
        const neighbors = getNeighbors(row, col, matrix);
        for (const [r, c] of neighbors) {
          matrix[r][c].value += 1;
        }
      }
    }
  }
}

export function getNeighbors(
  row: number,
  col: number,
  matrix: Cell[][],
): [number, number][] {
  const height = matrix.length;
  const width = matrix[0].length;
  const neighbors: [number, number][] = [];

  // Use a nested loop to handle all eight directions.
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // Skip the cell itself.
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
        neighbors.push([newRow, newCol]);
      }
    }
  }

  return neighbors;
}

function insertBombs(matrix: Cell[][], bombs: number): void {
  const height = matrix.length;
  const width = matrix[0].length;
  const totalCells = height * width;

  if (bombs > totalCells) {
    throw new Error("Bomb count exceeds board size");
  }

  // Create an array with all possible cell indices.
  const positions = Array.from({ length: totalCells }, (_, i) => i);

  // Shuffle the array using Fisher-Yates algorithm.
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  // Place bombs at the first "bombs" shuffled positions.
  for (let i = 0; i < bombs; i++) {
    const pos = positions[i];
    const row = Math.floor(pos / width);
    const col = pos % width;
    matrix[row][col].isBomb = true;
  }
}
