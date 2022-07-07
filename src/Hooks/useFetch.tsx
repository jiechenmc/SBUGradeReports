import React, { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      fetch(url).then((resp) => resp.json().then((d) => setData(d)));
    })();
  }, []);

  return data;
};

export default useFetch;
