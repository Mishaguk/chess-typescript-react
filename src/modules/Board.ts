import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import cloneDeep from "lodash/cloneDeep";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  check: boolean = false;
  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // black
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // white
        }
      }
      this.cells.push(row);
    }
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }
  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }
  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    new Rook(Colors.WHITE, this.getCell(0, 7));
  }
  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
  }
  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }
  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.check = this.check;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];

        target.avaliable =
          !!selectedCell?.figure?.canMove(target) &&
          this.simulateMove(selectedCell, target) &&
          target.figure?.name !== FigureNames.KING;
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private findKing(color: Colors | undefined): Cell | null {
    for (let i = 0; i < 8; i++) {
      const row = this.cells[i];
      for (let j = 0; j < 8; j++) {
        const figure = row[j].figure;
        if (figure?.color === color && figure?.name === FigureNames.KING) {
          return row[j];
        }
      }
    }
    return null;
  }

  isCheck(color: Colors | undefined): void {
    const kingCell = this.findKing(color);
    if (!kingCell) return;
    for (let i = 0; i < 8; i++) {
      const row = this.cells[i];
      for (let j = 0; j < 8; j++) {
        if (row[j].figure?.canMove(kingCell)) {
          kingCell.checked = true;
          this.check = true;
          return;
        }
      }
    }
    this.check = false;
    kingCell.checked = false;
  }

  isCheckmate(color: Colors | undefined): boolean {
    if (!color) return false;
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell.figure?.color !== color) continue;
        if (this.isPossibleMoves(cell)) {
          return false;
        }
      }
    }

    return true;
  }

  isPossibleMoves(selectedCell: Cell | null): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        if (this.simulateMove(selectedCell, row[j])) {
          return true;
        }
      }
    }
    return false;
  }

  simulateMove(selectedCell: Cell | null, target: Cell): boolean {
    if (selectedCell?.isEmpty()) return false;
    const simulatedBoard = cloneDeep(this);

    if (selectedCell?.figure?.canMove(target)) {
      simulatedBoard
        .getCell(selectedCell.x, selectedCell.y)
        ?.moveFigure(simulatedBoard.getCell(target.x, target.y));
    }

    simulatedBoard.isCheck(selectedCell?.figure?.color);
    return !simulatedBoard.check;
  }

  addLostFigure(figure: Figure) {
    if (figure.color === Colors.WHITE) {
      this.lostWhiteFigures.push(figure);
    } else {
      this.lostBlackFigures.push(figure);
    }
  }

  public addFigures() {
    this.addBishops();
    this.addPawns();
    this.addKings();
    this.addKnights();
    this.addRooks();
    this.addQueens();
  }
}
