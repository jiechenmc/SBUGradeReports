import Progress from "./subcomponents/Progress";
import { v4 as uuidv4 } from "uuid";

interface ProfessorCardProps {
  instructor: string;
  total: number;
  grades: { [key: string]: number };
}

const ProfessorCard = ({ instructor, total, grades }: ProfessorCardProps) => {
  const entries = Object.entries(grades);
  return (
    <div className="flex justify-center m-5">
      <div className="card w-96 bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <div className="flex flex-col gap-3">
            <div>
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24 ml-auto mr-auto">
                  <span className="text-3xl text-center">
                    {instructor.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h2 className="card-title justify-center whitespace-pre-line">
            {instructor}
          </h2>
          <div className="divider">Report Card</div>
          <div>{total} Students</div>
          <div className="flex flex-col">
            {entries.map((e) => {
              return (
                <Progress
                  key={uuidv4()}
                  desc={e[0]}
                  value={e[1] / total}
                  count={e[1]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorCard;
