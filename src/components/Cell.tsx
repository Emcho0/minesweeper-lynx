import "./styles/cell.css";
export interface CellProps {
  row: number;
  col: number;
  isBomb: boolean;
  isFlipped: boolean;
  value: number;
  handlePress: (row: number, col: number) => void;
}

export default function Cell({
  row,
  col,
  isBomb,
  isFlipped,
  value,
  handlePress,
}: CellProps) {
  return (
    <view
      bindtap={() => handlePress(row, col)}
      className={`cell ${isFlipped ? "cell--flipped" : ""}`}
    >
      <text className="cell__text">
        {isFlipped && (isBomb ? "💣" : value > 0 ? value : "")}
      </text>
    </view>
  );
}
