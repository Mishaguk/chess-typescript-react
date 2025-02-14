import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";
import { Cell } from "../Cell";
export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const dy = this.color === Colors.BLACK ? -1 : 1;
    const dx = Math.abs(this.cell.x - target.x);
    const yDiff = this.cell.y - target.y;
    if (dx === 0 && target.isEmpty()) {
      if (
        this.isFirstStep &&
        yDiff == dy * 2 &&
        this.cell.board.getCell(target.x, target.y + dy).isEmpty()
      )
        return true;

      if (yDiff === dy) return true;
    }

    if (dx === 1 && yDiff === dy && !target.isEmpty()) {
      return true;
    }
    return false;
  }
  moveFigure(): void {
    super.moveFigure();
    this.isFirstStep = false;
  }
}
