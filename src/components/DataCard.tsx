import Progress from "./subcomponents/Progress";
import { v4 as uuidv4 } from "uuid";

interface DataCardProps {
  Section: string;
  Term: string;
  Course: string;
  Instructor: string;
  grades: { [key: string]: number };
}
const DataCard = ({
  Section,
  Term,
  Course,
  Instructor,
  grades,
}: DataCardProps) => {
  let sum: number = 0;
  let gradeStats = null;

  sum = Object.values(grades).reduce((a, b) => {
    return a + b;
  });

  if (sum !== 0) {
    gradeStats = Object.keys(grades).map((key: string) => {
      return (
        <Progress
          key={uuidv4()}
          desc={key}
          value={grades[key] / sum}
          count={grades[key]}
        />
      );
    });
  }

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        <h2 className="card-title ">{Course}</h2>
        <p>{Term}</p>
        <p>{Section}</p>
        <p>{Instructor}</p>
      </div>
      <div className="collapse-content">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-body">
              <h1>{sum} Students</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {gradeStats}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
