import "./styles/board.css";

import { useReducer } from "@lynx-js/react";
import { gameReducer } from "../reducers/gameReducer.js";
import { createBoard } from "../utils/createBoard.js";
import Cell from "./Cell.jsx";

const BOARD_SIZE = 10;
const BOMBS_NUM = 10;

export default function Board() {
  const [gameState, dispatch] = useReducer(gameReducer, {
    board: createBoard(BOARD_SIZE, BOARD_SIZE, BOMBS_NUM),
    isGameOver: false,
    numOfOpenCells: 0,
  });

  function handlePress(row: number, col: number) {
    dispatch({ type: "HANDLE_CELL", row, col });
  }

  return (
    <view className="board-container">
      <text className="board-title">
        {gameState.isGameOver ? "Game Over" : "Minesweeper"}
      </text>
      {gameState.board.map((row, rowIdx) => (
        <view key={rowIdx} className="board-row">
          {row.map((cell, cellIdx) => (
            <Cell key={cellIdx} handlePress={handlePress} {...cell} />
          ))}
        </view>
      ))}
    </view>
  );
}
