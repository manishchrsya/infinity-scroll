import { ChangeEvent, useCallback, useRef, useState } from "react";
import "./App.css";
import { InfinityScroll } from "./infinity-scroll";

function App() {
  const [querry, setQuerry] = useState("");
  const [data, setData] = useState([]);

  const controllerRef: any = useRef(null);

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuerry(event.target.value);
  }, []);

  const getData = useCallback((querry: string, pageNumber: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();

        const promise = await fetch(
          "https://openlibrary.org/search.json?" +
            new URLSearchParams({
              q: querry,
              page: `${pageNumber}`,
            }),
          { signal: controllerRef.current.signal }
        );
        const data = await promise.json();
        resolve(data);
        // console.log(data);
        setData((prev) => [...prev, ...data.docs] as any);
      } catch (error) {
        // reject();
      }
    });
  }, []);

  const renderItem = useCallback(
    ({ title }: { title: string }, key: any, ref: any) => {
      return (
        <div key={key} ref={ref}>
          {title}
        </div>
      );
    },
    []
  );

  return (
    <>
      <input type="text" onChange={handleInput} value={querry} />
      <InfinityScroll
        renderListItem={renderItem}
        getData={getData}
        listData={data}
        querry={querry}
      />
    </>
  );
}

export default App;
