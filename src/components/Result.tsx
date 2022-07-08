import { useState } from "react";
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
  const [instructor, setInstructuor] = useState("Praveen Tripathi");

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

  return (
    <div className="flex flex-col">
      <ProfessorCard instructor={instructor} />

      {data.map((e: ApiData) => (
        <DataCard
          key={uuidv4()}
          Section={e?.Section}
          Term={e?.Term}
          Course={e["Course Title"]}
          Grades={e?.Grades}
        />
      ))}
    </div>
  );
};

export default Result;
