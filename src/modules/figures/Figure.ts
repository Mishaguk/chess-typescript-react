import { Colors } from "../Colors";
import logo from "../../assets/black-king.png";
import { Cell } from "../Cell";

export enum FigureNames {
  "FIGURE" = "Figure",
  "KING" = "King",
  "QUEEN" = "Queen",
  "KNIGHT" = "Knight",
  "ROOK" = "Rook",
  "BISHOP" = "Bishop",
  "PAWN" = "Pawn",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  constructor(color: Colors, cell: Cell) {
    this.cell = cell;
    this.color = color;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell | null): boolean {
    if (target?.figure?.color === this.color) {
      return false;
    }

    return true;
  }

  moveFigure() {}
}
