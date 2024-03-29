import { lazy, Suspense, useRef, useState, FormEvent } from "react";
import { useQuery } from "react-query";
import ProfessorCard from "./ProfessorCard";
import { v4 as uuidv4 } from "uuid";

const DataCard = lazy(() => import("./DataCard"));

interface ApiData {
  Section: string;
  Term: string;
  "Course Title": string;
  Instructors: string;
  Comments: string;
  Grades: string;
}

interface ResultProps {
  type: string;
  query: string;
}
const Result = ({ type, query }: ResultProps) => {
  const [filter, setFilter] = useState("");

  const selectRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const onChange = (e: FormEvent<HTMLSelectElement>) => {
    setFilter(e.currentTarget.value);
  };

  const fetchComments = async () => {
    let res;
    switch (type) {
      case "Course Code":
        res = await fetch(
          `https://prof-comments.herokuapp.com/api/section/?section=${query}`
        );
        return res.json();
      case "Course Name":
        res = await fetch(
          `https://prof-comments.herokuapp.com/api/course/?course=${query}`
        );
        return res.json();
      case "Term":
        res = await fetch(
          `https://prof-comments.herokuapp.com/api/term/?term=${query}`
        );
        return res.json();
      case "Instructor":
        res = await fetch(
          `https://prof-comments.herokuapp.com/api/instructor/?name=${query}`
        );
        return res.json();
    }
  };

  const { data, status } = useQuery(["comments"], fetchComments, {
    refetchInterval: false,
    refetchOnMount: true,
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center mt-5">
        <div className="alert alert-warning w-fit">
          <p>Loading...</p>
          <p>
            Server is sleeping if this takes longer than <strong>20</strong>
            seconds
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center mt-5">
        <div className="alert alert-error w-fit">
          <p>An error has occured!</p>
        </div>
      </div>
    );
  }

  if (!("detail" in data)) {
    let filteredData = data.filter((comment: ApiData) => {
      if (comment?.Instructors !== null) {
        return (
          comment?.Instructors.includes(filter) ||
          comment?.Section.includes(filter)
        );
      }
      return false;
    });

    const unprocessedGrades = filteredData.map((e: ApiData) => e?.Grades);
    let processedGrades: { [key: string]: number }[] = [];

    unprocessedGrades.forEach((Grades: string) => {
      if (Grades !== "[]") {
        const splits = Grades.split(",");
        let grades: { [key: string]: number } = {};

        for (let i = 0; i < splits.length; ++i) {
          let match = splits[i].match(/\w+[\+\-]?/);
          if (i % 2 == 0) {
            grades[match![0]] = 0;
          } else {
            const prev: string = splits[i - 1].match(/\w+[\+\-]?/)![0];
            grades[prev] = parseInt(match![0]);
          }

          if (i == splits.length - 1) {
            processedGrades.push(grades);
            grades = {};
          }
        }
      } else {
        processedGrades.push({
          A: 0,
          "A-": 0,
          B: 0,
          "B+": 0,
          "B-": 0,
          C: 0,
          "C+": 0,
          "C-": 0,
          D: 0,
          "D+": 0,
          F: 0,
          I: 0,
          NC: 0,
          P: 0,
          W: 0,
        });
      }
    });

    let globalGrades: { [key: string]: number } = {
      A: 0,
      "A-": 0,
      B: 0,
      "B+": 0,
      "B-": 0,
      C: 0,
      "C+": 0,
      "C-": 0,
      D: 0,
      "D+": 0,
      F: 0,
      I: 0,
      NC: 0,
      P: 0,
      W: 0,
    };

    const keys = Object.keys(globalGrades);
    processedGrades.forEach((entry) => {
      for (const key of keys) {
        globalGrades[key] += entry[key];
      }
    });

    const total: number = Object.values(globalGrades).reduce((a, b) => {
      return a + b;
    });

    let counter = 0;

    let available: string[];
    let options;

    switch (type) {
      case "Course Code":
      case "Course Name":
        available = Array.from(
          new Set(
            data.map((e: ApiData) => {
              return e?.Instructors;
            })
          )
        );
        options = available.map((e: string) => {
          return <option>{e}</option>;
        });
        break;
      case "Instructor":
        available = Array.from(
          new Set(
            data.map((e: ApiData) => {
              return e?.Section.slice(0, 6);
            })
          )
        );
        options = available.map((e: string) => {
          return <option>{e}</option>;
        });
        break;
    }

    return (
      <div className="flex flex-col">
        <ProfessorCard
          instructor={query + "\n" + filter}
          total={total}
          grades={globalGrades}
        />
        {type !== "Term" ? (
          <div className="flex justify-center my-4">
            <select
              className="select select-accent w-full max-w-xs"
              ref={selectRef}
              onChange={onChange}
              defaultValue={"Filter by ..."}
            >
              <option disabled>Filter by ...</option>
              {options}
            </select>
          </div>
        ) : (
          ""
        )}

        {processedGrades.length <= 1000 ? (
          <Suspense>
            {filteredData.map((e: ApiData) => (
              <DataCard
                key={uuidv4()}
                Section={e?.Section}
                Term={e?.Term}
                Course={e["Course Title"]}
                Instructor={e?.Instructors}
                grades={processedGrades[counter++]}
              />
            ))}
          </Suspense>
        ) : (
          <div className="flex justify-center">
            <div className="alert alert-warning shadow-lg absolute max-w-sm">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  Data is too large and will be truncated to prevent a freeze!
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center w-full mt-5">
        <div className="alert alert-error shadow-lg absolute max-w-sm">
          <div className="flex flex-col">
            <p>Invalid Request</p>
            <p>Message: {data["detail"][0]["msg"]}</p>
            <p className="font-bold">Please Check Your Input!</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Result;
