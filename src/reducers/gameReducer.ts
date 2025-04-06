import { getNeighbors } from "../utils/createBoard.js";
import type { Cell } from "../utils/createCell.js";

export interface GameState {
  board: Cell[][];
  isGameOver: boolean;
  // add other properties as needed
}

export type GameAction = { type: "HANDLE_CELL"; row: number; col: number };
// add additional action types as needed

export function gameReducer(state: GameState, action: GameAction): GameState {
  const { type, row, col } = action;

  switch (type) {
    case "HANDLE_CELL": {
      const cell = state.board[row][col];
      if (cell.isBomb) {
        return {
          ...state,
          board: flipAll(state.board),
          isGameOver: true,
        };
      } else if (cell.value === 0) {
        // expand the area by revealing adjacent cells.
        return {
          ...state,
          board: expand(row, col, state.board),
        };
      } else {
        return {
          ...state,
          board: flipCell(row, col, state.board),
        };
      }
    }
    default: {
      console.error("Unhandled action type:", type);
      return state;
    }
  }
}

// Helper: creates a deep copy of the board (each row is copied).
function cloneBoard(board: Cell[][]): Cell[][] {
  return board.map((row) => row.slice());
}

// Flips a single cell.
function flipCell(row: number, col: number, board: Cell[][]): Cell[][] {
  const newBoard = cloneBoard(board);
  const cell = newBoard[row][col];
  newBoard[row][col] = { ...cell, isFlipped: true };
  return newBoard;
}

// Expands the revealed area for cells with no adjacent bombs.
function expand(startRow: number, startCol: number, board: Cell[][]): Cell[][] {
  const newBoard = cloneBoard(board);
  const stack: [number, number][] = [[startRow, startCol]];

  while (stack.length > 0) {
    const [row, col] = stack.pop()!;
    const neighbors = getNeighbors(row, col, newBoard);

    for (const [nRow, nCol] of neighbors) {
      const neighborCell = newBoard[nRow][nCol];
      if (neighborCell.isFlipped) continue;
      if (!neighborCell.isBomb) {
        newBoard[nRow][nCol] = { ...neighborCell, isFlipped: true };
        if (neighborCell.value === 0) {
          stack.push([nRow, nCol]);
        }
      }
    }
  }
  return newBoard;
}

// Flips all cells (used when the game is over).
function flipAll(board: Cell[][]): Cell[][] {
  const newBoard = cloneBoard(board);
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      const cell = newBoard[row][col];
      newBoard[row][col] = { ...cell, isFlipped: true };
    }
  }
  return newBoard;
}

// Optional: counts the number of cells that are flipped.
function numOfOpenCells(board: Cell[][]): number {
  let total = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].isFlipped) {
        total++;
      }
    }
  }
  return total;
}
