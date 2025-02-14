import { Cell } from "../modules/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
  checked: boolean;
}
const CellComponent = ({ cell, selected, click, checked }: CellProps) => {
  return (
    <div>
      <div
        className={[
          "cell",
          cell.color,
          selected ? "selected" : "",
          checked ? "attacked" : "",
        ].join(" ")}
        onClick={() => click(cell)}
        style={{ background: cell.avaliable && cell.figure ? "green" : "" }}
      >
        {cell.avaliable && !cell.figure && <div className="avaliable"></div>}
        {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
      </div>
    </div>
  );
};

export default CellComponent;
