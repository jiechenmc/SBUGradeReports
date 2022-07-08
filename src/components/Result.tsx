import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import DataCard from "./DataCard";
import ProfessorCard from "./ProfessorCard";
import { v4 as uuidv4 } from "uuid";

interface ApiData {
  Section: string;
  Term: string;
  "Course Title": string;
  Instructors: string;
  Comments: string;
  Grades: string;
}

const Result = () => {
  const [instructor, setInstructuor] = useState("Tripathi");

  const fetchComments = async () => {
    const res = await fetch(
      `https://prof-comments.herokuapp.com/api/instructor/?name=${instructor}`
    );
    return res.json();
  };

  const { data, status } = useQuery("comments", fetchComments);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  const unprocessedGrades = data.map((e: ApiData) => e?.Grades);
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

  console.log(globalGrades);
  return (
    <div className="flex flex-col">
      <ProfessorCard
        instructor={instructor}
        total={total}
        grades={globalGrades}
      />

      {/* {data.map((e: ApiData) => (
        <DataCard
          key={uuidv4()}
          Section={e?.Section}
          Term={e?.Term}
          Course={e["Course Title"]}
          Grades={e?.Grades}
        />
      ))} */}
    </div>
  );
};

export default Result;
