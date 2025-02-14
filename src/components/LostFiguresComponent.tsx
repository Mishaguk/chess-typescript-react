import { Figure } from "../modules/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export const LostFiguresComponent = ({ title, figures }: LostFiguresProps) => {
  return (
    <div className="lost">
      <h2>{title}</h2>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name}{" "}
          {figure.logo && <img width="20px" height="20px" src={figure.logo} />}
        </div>
      ))}
    </div>
  );
};
