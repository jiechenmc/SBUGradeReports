import Progress from "./subcomponents/Progress";
import { v4 as uuidv4 } from "uuid";

interface DataCardProps {
  Section: string;
  Term: string;
  Course: string;
  Grades: string;
}
const DataCard = ({ Section, Term, Course, Grades }: DataCardProps) => {
  let sum: number = 0;
  let gradeStats = null;
  let grades: { [key: string]: number } = {};

  if (Grades !== "[]") {
    const splits = Grades.split(",");

    for (let i = 0; i < splits.length; ++i) {
      let match = splits[i].match(/\w[\+\-]?/);
      if (i % 2 == 0) {
        grades[match![0]] = 0;
      } else {
        const prev: string = splits[i - 1].match(/\w[\+\-]?/)![0];
        grades[prev] = parseInt(match![0]);
      }
    }

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
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{Course}</h2>
        <p>{Term}</p>
        <p>{Section}</p>
        <div className="card-body">
          <h1>{sum} Students</h1>
          <div className="grid grid-cols-3">{gradeStats}</div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
