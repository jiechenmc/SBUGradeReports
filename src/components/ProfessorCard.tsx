import Progress from "./subcomponents/Progress";

interface ProfessorCardProps {
  instructor: string;
  total: number;
  grades: { [key: string]: number };
}

const ProfessorCard = ({ instructor, total, grades }: ProfessorCardProps) => {
  const entries = Object.entries(grades);
  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <div className="flex flex-col ml-auto mr-auto gap-3">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24 ml-auto mr-auto">
                <span className="text-3xl">{instructor.charAt(0)}</span>
              </div>
            </div>
            <h2 className="card-title ">{instructor}</h2>
          </div>
          <div className="divider">Report Card</div>
          <div>{total} Students</div>
          {entries.map((e) => {
            return <Progress desc={e[0]} value={e[1] / total} count={e[1]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfessorCard;
