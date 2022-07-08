import { FormEvent, useEffect, useRef, useState } from "react";
import Result from "./Result";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const [query, setQuery] = useState("");
  const [queryBy, setQueryBy] = useState("Instructor");
  const [examples, setExamples] = useState(["Fodor", "Tripathi", "Ganapathi"]);

  const onClick = () => {
    setQuery(inputRef.current.value);
  };

  const onChange = (e: FormEvent<HTMLSelectElement>) => {
    setQueryBy(e.currentTarget.value);
  };

  useEffect(() => {
    switch (queryBy) {
      case "Course Code":
        setExamples(["CSE114", "CSE214", "CSE215"]);
        break;
      case "Course Name":
        setExamples([
          "INTRO TO OBJECT-ORIENTED PROG",
          "DATA STRUCTURES",
          "FOUNDATIONS OF COMP SCIENCE",
        ]);
        break;
      case "Term":
        setExamples(["SPRING 2021", "FALL 2021", "SPRING 2022"]);
        break;
      case "Instructor":
        setExamples(["Fodor", "Tripathi", "Ganapathi"]);
        break;
    }
  }, [queryBy]);

  return (
    <div>
      <div className="text-center text-5xl m-5 font-bold">
        SBU Grade Reports
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-full max-w-xs "
            />
            <button className="btn" onClick={onClick}>
              Search
            </button>
          </div>
          <select
            className="select select-accent w-full max-w-xs"
            ref={selectRef}
            onChange={onChange}
            defaultValue={"Instructor"}
          >
            <option disabled>Query By ...</option>
            <option>Instructor</option>
            <option>Course Code</option>
            <option>Course Name</option>
            <option>Term</option>
          </select>
          <h2>Examples: (searches are case-insensitive and relative)</h2>
          <div className="flex flex-col gap-2">
            {examples.map((e) => {
              return (
                <div className="badge badge-accent badge-outline">{e}</div>
              );
            })}
          </div>
        </div>
      </div>

      {query !== "" ? <Result key={query} query={query} type={queryBy} /> : ""}
    </div>
  );
};

export default Home;
