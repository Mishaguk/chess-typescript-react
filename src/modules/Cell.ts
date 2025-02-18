import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";
export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  avaliable: boolean;
  checked: boolean = false;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.avaliable = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (this.figure?.color !== target.figure?.color) {
      return true;
    }
    return false;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.checked = false;
      this.figure.moveFigure();
      if (target.figure) {
        this.board.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }

  isEmptyVertical(target: Cell): boolean {
    if (target.x !== this.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyHorizontal(target: Cell): boolean {
    if (target.y !== this.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(this.x - target.x);
    const absY = Math.abs(this.y - target.y);

    if (absX !== absY) {
      return false;
    }
    const dx = this.x < target.x ? 1 : -1;
    const dy = this.y < target.y ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + i * dx, this.y + i * dy).isEmpty()) {
        return false;
      }
    }
    return true;
  }
}
