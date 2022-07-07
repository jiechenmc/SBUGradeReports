import { useState, useEffect } from "react";
import useFetch from "./Hooks/useFetch";

function App() {
  const data: any = useFetch(
    "https://prof-comments.herokuapp.com/api/instructor/?name=Tripathi"
  );

  const resp = data?.map((d: any) => <li>{d}</li>);
  return <div className="App">{resp}</div>;
}

export default App;
