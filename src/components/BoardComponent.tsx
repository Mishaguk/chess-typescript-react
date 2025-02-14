import React, { useEffect, useState } from "react";
import { Board } from "../modules/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../modules/Cell";
import { Player } from "../modules/Player";
import { Colors } from "../modules/Colors";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  setIsCheckmate: (value: boolean) => void;
}

const BoardComponent = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  setIsCheckmate,
}: BoardProps) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const rows = Array.from({ length: 8 }, (_, i) => 8 - i);
  const cols = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  useEffect(() => {
    highlightCells();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell]);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell) &&
      cell.avaliable
    ) {
      selectedCell.moveFigure(cell);

      setSelectedCell(null);
      swapPlayer();
      const color =
        currentPlayer?.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
      board.isCheck(Colors.WHITE);
      board.isCheck(Colors.BLACK);
      if (board.check) {
        setIsCheckmate(board.isCheckmate(color));
      }
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell);

    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Current player: {currentPlayer?.color}</h3>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div className="row-index">
          {rows.map((num) => (
            <h2 key={num} style={{ padding: "5px" }}>
              {num}
            </h2>
          ))}
        </div>
        <div className="board">
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent
                  cell={cell}
                  selected={
                    cell.x === selectedCell?.x && cell.y === selectedCell?.y
                  }
                  click={click}
                  checked={cell.checked}
                  key={cell.id}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="col-index">
        {cols.map((num) => (
          <h2 key={num} style={{ padding: "5px" }}>
            {num}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
